export interface Property {
  id: string;        // We will map _id to id in the fetch
  _id: string;       // Original MongoDB ID
  title: string;
  description: string;
  price: number;
  status: string;
  images: string[];  // Change from image_url (string) to images (array)
  address: {
    street: string;
    city: string;
    state: string;
    pincode: number | string;
  };
  availableFrom: string;
  // Add these if you want to use the icons in the card, 
  // or make them optional with '?'
  bedrooms?: number;
  bathrooms?: number;
}