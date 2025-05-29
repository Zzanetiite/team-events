import React, { useEffect, useRef, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface UseGooglePlacesAutocompleteReturn {
  inputRef: React.RefObject<HTMLInputElement | null>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  placesLibrary: google.maps.PlacesLibrary | null;
}

export function useGooglePlacesAutocomplete(
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void,
  options: string[],
  loading: boolean
): UseGooglePlacesAutocompleteReturn {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const placesLibrary = useMapsLibrary('places');
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const placeChangedListenerRef = useRef<google.maps.MapsEventListener | null>(
    null
  );

  // Use session tokens to reduce cost
  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  useEffect(() => {
    if (!inputRef.current || !placesLibrary || loading) return;

    sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();

    const autocomplete = new placesLibrary.Autocomplete(inputRef.current, {
      fields: options,
    });

    autocomplete.setOptions({
      sessionToken: sessionTokenRef.current,
    } as any);

    autocompleteRef.current = autocomplete;

    placeChangedListenerRef.current = autocomplete.addListener(
      'place_changed',
      () => {
        const place = autocomplete.getPlace();
        if (place && place.geometry?.location && place.formatted_address) {
          onPlaceSelected(place);
          setSearchValue(place.formatted_address);

          sessionTokenRef.current =
            new google.maps.places.AutocompleteSessionToken();
          (autocomplete as any).setOptions({
            sessionToken: sessionTokenRef.current,
          });
        }
      }
    );

    return () => {
      placeChangedListenerRef.current?.remove();
    };
  }, [placesLibrary, options, loading, onPlaceSelected]);

  return { inputRef, searchValue, setSearchValue, placesLibrary };
}
