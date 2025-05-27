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

  useEffect(() => {
    const inputEl = inputRef.current;
    if (!inputEl || !placesLibrary || loading) return;

    // Initialize a copy to get the first event in autocomplete
    if (!autocompleteRef.current) {
      const autocomplete = new placesLibrary.Autocomplete(inputEl, {
        fields: options,
      });
      autocompleteRef.current = autocomplete;

      placeChangedListenerRef.current = autocomplete.addListener(
        'place_changed',
        () => {
          const place = autocomplete.getPlace();
          if (place && place.geometry?.location && place.formatted_address) {
            onPlaceSelected(place);
            setSearchValue(place.formatted_address);
          }
        }
      );
    }

    const handleKeyDown = async (e: KeyboardEvent) => {
      const input = inputEl;
      const autocomplete = autocompleteRef.current;
      if (!autocomplete) return;

      if (e.key === 'Enter') {
        const pacSelected = document.querySelector('.pac-item-selected');

        if (!pacSelected) {
          // Simulate selecting first suggestion
          const downArrowEvent = new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            code: 'ArrowDown',
            keyCode: 40,
            which: 40,
            bubbles: true,
            cancelable: true,
          });
          input.dispatchEvent(downArrowEvent);

          // Allow Google to react to the key
          setTimeout(() => {
            const place = autocomplete.getPlace();
            if (place && place.geometry?.location && place.formatted_address) {
              onPlaceSelected(place);
              setSearchValue(place.formatted_address);
            }
          }, 300); // 300ms delay to allow autocomplete to respond
        }
        // Otherwise user selected from dropdown
      }
    };

    inputEl.addEventListener('keydown', handleKeyDown);
    return () => {
      inputEl.removeEventListener('keydown', handleKeyDown);
      placeChangedListenerRef.current?.remove();
    };
  }, [placesLibrary, options, loading, onPlaceSelected]);

  return { inputRef, searchValue, setSearchValue, placesLibrary };
}
