import { ExpandableCards } from "@/components/ExpandableCard";
import Layout from "@/components/Layout";
import { wishlistAtom } from "@/lib/state";
import playTts from "@/lib/tts";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Link } from "react-router";

export default function Summary() {
    const [wishlist] = useAtom(wishlistAtom);

    useEffect(() => {
        // playTts('Done! Check out your favorite products.');
    }, []);

    return <div className="py-24 px-24">
        <h1 className="text-3xl font-display font-bold">Shopping Summary</h1>
        <p className="my-3">Here are your favorite items.</p>
        <ExpandableCards products={wishlist} />
        <div className="flex gap-x-4">
            <Link to="/" className="bg-white border border-black text-black px-5 py-2 rounded-lg">Start over</Link>
            <Link to="/" className="bg-black text-gray-100 px-5 py-2 rounded-lg">Checkout</Link>
        </div>
    </div>
}