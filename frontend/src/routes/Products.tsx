import { ExpandableCards } from "@/components/ExpandableCard";
import SpeechBar from "@/components/SpeechBar";
import Wishlist from "@/components/Wishlist";
import { mockProducts, Product } from "@/lib/models";
import { productsAtom, searchAtom } from "@/lib/state";
import { useAtom } from "jotai";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Products() {
    const [search, setSearch] = useAtom(searchAtom);
    const [products, setProducts] = useAtom(productsAtom);

    const fadeInUp = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
    
    return (
        <div className="pb-[10px]">
        <SpeechBar />
        <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeInUp}
        >
            <div className="py-24 px-24 min-h-[100vh] flex flex-col">
                <motion.div 
                    className="flex justify-between items-center w-full" 
                    initial="hidden" 
                    animate="visible" 
                    variants={fadeInUp}
                >
                    <div>
                        {products?.length ? <>
                            <h2 className="text-md text-gray-600">Looking for...</h2>
                            <h1 className="text-4xl font-bold font-display">{search.query}</h1>
                        </> : <div className="mt-24">
                            <h3 className="text-3xl mb-8 font-display font-bold">It's empty over here!</h3>
                            <Link to="/" className="bg-black text-gray-100 px-3 py-2 rounded-lg">Go back</Link>
                        </div>}
                        <div className="mt-5 flex gap-x-3 gap-y-2">
                            {search.filters.map(filter => (
                                <motion.div 
                                    key={filter} 
                                    className="bg-gray-200 border border-gray-300 px-3 py-1 rounded-lg text-xs"
                                    initial="hidden" 
                                    animate="visible" 
                                    variants={fadeInUp}
                                >
                                    {filter}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <motion.div 
                        className="flex flex-col items-center"
                        initial="hidden" 
                        animate="visible" 
                        variants={fadeInUp}
                    >
                        <Wishlist />
                    </motion.div>
                </motion.div>
                <ExpandableCards products={products} />
            </div>
        </motion.div>
        </div>
    );
}
