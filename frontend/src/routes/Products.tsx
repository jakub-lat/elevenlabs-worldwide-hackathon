import { ExpandableCards } from "@/components/ExpandableCard";
import SpeechBar from "@/components/SpeechBar";
import Wishlist from "@/components/Wishlist";
import { mockProducts, Product } from "@/lib/models";
import { searchAtom } from "@/lib/state";
import { useAtom } from "jotai";
import { FaHeart } from "react-icons/fa";

export default function Products() {
    const [search, setSearch] = useAtom(searchAtom);
    // gird with products
    return <div>
        <SpeechBar />
        <div className="py-24 px-24">
            <div className="flex justify-between items-center w-full">
                <div>
                    <h2 className="text-md text-gray-600">Looking for...</h2>
                    <h1 className="text-4xl font-bold font-display">{search.query}</h1>
                    <div className="mt-5 flex gap-x-3 gap-y-2">
                        {search.filters.map(filter => <div key={filter} 
                            className="bg-gray-200 border border-gray-300 px-3 py-1 rounded-lg text-xs">
                        {filter}</div>)}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <Wishlist />
                </div>
            </div>
            <ExpandableCards products={mockProducts}  />
        </div>
    </div>
}