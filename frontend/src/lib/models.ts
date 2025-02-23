export interface Product {
    id: string;
    brand: string;
    name: string;
    price: number;
    description?: string;
    image_link?: string;
    product_link?: string;
}

export interface VoiceResponse {
    text: string;
    examples: string[];
}

export interface SearchContext {
    query: string;
    filters: string[];
}

export const mockProducts: Product[] = [
    // mockup products
    { id: "1", brand: "The North Face", name: "Tent", price: 299.99, image_link: "https://assets.aceternity.com/demos/lana-del-rey.jpeg" },
    { id: "2", brand: "Columbia", name: "Jacket", price: 99.99, image_link: "https://assets.aceternity.com/demos/lana-del-rey.jpeg" },
];

export const mockFilters = ["warm", "black/blue", "size L"];
