/** Function to get a UK postcode from the full address. */
export function extractPostcode(address: string): string | null {
  const postcodeRegex = /([A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2})/i;
  const match = address.match(postcodeRegex);
  return match ? match[0].toUpperCase() : 'See event';
}
