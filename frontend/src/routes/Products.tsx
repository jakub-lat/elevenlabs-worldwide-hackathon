import { ExpandableCards } from "@/components/ExpandableCard";
import SpeechBar from "@/components/SpeechBar";
import { FaHeart } from "react-icons/fa";

interface Product {
    id: string;
    brand: string;
    name: string;
    price: number;
    description?: string;
    imageURL?: string;
}

function ProductCard({ product }: { product: Product }) {
    // tailwind product card with rounded corners and a light border
    return <div className="rounded-lg border border-gray-300 bg-gray-100 p-4">
        <div className="text-sm text-gray-500">{product.brand}</div>
        <div className="text-lg font-bold">{product.name}</div>
        <div className="text-lg font-bold mt-2">${product.price}</div>
        {product.description && <div className="text-sm mt-2">{product.description}</div>}
    </div>
}

const products: Product[] = [
    // mockup products
    { id: "1", brand: "The North Face", name: "Tent", price: 299.99, imageURL: "https://assets.aceternity.com/demos/lana-del-rey.jpeg" },
    { id: "2", brand: "Columbia", name: "Jacket", price: 99.99, imageURL: "https://assets.aceternity.com/demos/lana-del-rey.jpeg" },
];

const filters = ["warm", "black/blue", "size L"];

export default function Products() {
    // gird with products
    return <div>
        <SpeechBar />
        <div className="py-24 px-24">
            <div className="flex justify-between items-center w-full">
                <div>
                    <h2 className="text-md text-gray-600">Looking for...</h2>
                    <h1 className="text-4xl font-bold">Winter jackets</h1>
                    <div className="mt-5 flex gap-x-3 gap-y-2">
                        {filters.map(filter => <div key={filter} 
                            className="bg-gray-200 border border-gray-300 px-3 py-1 rounded-lg text-xs">
                        {filter}</div>)}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-x-2">
                        <FaHeart size={25} />
                        <span className="text-sm text-gray-800">
                            10
                        </span>
                    </div>
                </div>
            </div>
            <ExpandableCards products={products}  />
        </div>
    </div>
}