import React, { useEffect, useRef, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

export interface Prediction {
  description: string;
  place_id: string;
}

interface UseGooglePlacesAutocompleteReturn {
  inputRef: React.RefObject<HTMLInputElement | null>;
  searchValue: string;
  setSearchValue: (value: string) => void;
  suggestions: Prediction[];
  suppressAutocomplete: () => void;
  selectPlace: (placeId: string) => void;
  placesLibrary: google.maps.PlacesLibrary | null;
}

export function useGooglePlacesAutocomplete(
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void,
  options: string[],
  loading: boolean
): UseGooglePlacesAutocompleteReturn {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<Prediction[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const placesLibrary = useMapsLibrary('places');
  const SEARCH_FROM_LETTER = 4;
  const DEBOUNCE = 1500; // 1.5 sec

  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autocompleteServiceRef =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null
  );
  const suppressRef = useRef(false);

  // Initialize services
  useEffect(() => {
    if (!placesLibrary || loading) return;

    if (!autocompleteServiceRef.current) {
      autocompleteServiceRef.current = new placesLibrary.AutocompleteService();
    }

    if (!placesServiceRef.current && inputRef.current) {
      placesServiceRef.current = new placesLibrary.PlacesService(
        document.createElement('div')
      );
    }
  }, [placesLibrary, loading]);

  /*Prevent autocomplete from popping back up after user has made a selection. */
  const suppressAutocomplete = () => {
    suppressRef.current = true;
    if (typeof window !== 'undefined') {
      (window as any)._suppressAutocomplete = true;
    }
    setSuggestions([]);
  };

  const handleInputChange = (value: string) => {
    // Prevent the dropdown from popping back up after selection
    if (
      suppressRef.current ||
      (typeof window !== 'undefined' && (window as any)._suppressAutocomplete)
    ) {
      suppressRef.current = false;
      (window as any)._suppressAutocomplete = false;
      return;
    }

    if (searchValue === value) return; // Don't re-trigger on identical input

    setSearchValue(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (value.length < SEARCH_FROM_LETTER) {
      setSuggestions([]);
      return;
    }

    // Debounced autocomplete request
    debounceTimeoutRef.current = setTimeout(() => {
      if (!autocompleteServiceRef.current) return;

      if (!sessionTokenRef.current) {
        sessionTokenRef.current =
          new google.maps.places.AutocompleteSessionToken();
      }

      autocompleteServiceRef.current.getPlacePredictions(
        {
          input: value,
          sessionToken: sessionTokenRef.current,
        },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            const limited = predictions.slice(0, 5).map((pred) => ({
              description: pred.description,
              place_id: pred.place_id,
            }));
            setSuggestions(limited);
          } else {
            setSuggestions([]);
          }
        }
      );
    }, DEBOUNCE);
  };

  const selectPlace = (placeId: string) => {
    if (!placesServiceRef.current || !sessionTokenRef.current) return;

    placesServiceRef.current.getDetails(
      {
        placeId,
        fields: options,
        sessionToken: sessionTokenRef.current,
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          // Prevent triggering autocomplete after user selected a place
          suppressRef.current = true;

          onPlaceSelected(place);
          setSearchValue(place.formatted_address || '');

          setSuggestions([]); // Clear dropdown
          sessionTokenRef.current = null;
        } else {
          console.warn('[Autocomplete] Failed to fetch place details:', status);
        }
      }
    );
  };

  return {
    inputRef,
    searchValue,
    setSearchValue: handleInputChange,
    suggestions,
    suppressAutocomplete,
    selectPlace,
    placesLibrary,
  };
}
