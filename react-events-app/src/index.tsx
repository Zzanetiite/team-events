import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * Suppress autocomplete warning because the new API PlaceAutocompleteElement
 * is not yet released; it is still in Beta testing and unusable.
 * https://developers.google.com/maps/documentation/javascript/examples/place-autocomplete-map
 */
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0] &&
    args[0].includes('As of March 1st, 2025, google.maps.places.Autocomplete')
  ) {
    return;
  }
  originalWarn(...args); // Log other warnings
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
