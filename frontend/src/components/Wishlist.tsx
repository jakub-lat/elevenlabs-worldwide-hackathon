import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { wishlistAtom, wishlistOpenAtom } from "@/lib/state"
import { useAtom } from "jotai"
import { useEffect } from "react";
import { FaHeart } from "react-icons/fa"

export default function Wishlist() {
    const [wishlist, setWishlist] = useAtom(wishlistAtom);
    const [wishlistOpen, setWishlistOpen] = useAtom(wishlistOpenAtom);

    return (
        <Sheet open={wishlistOpen} onOpenChange={(x) => setWishlistOpen(x)}>
            <SheetTrigger asChild>
                <div className="flex items-center gap-x-2 cursor-pointer hover:opacity-80 transition-colors">
                    <FaHeart size={25} />
                    <span className="text-sm text-gray-800">
                        {wishlist.length}
                    </span>
                </div>
            </SheetTrigger>
            <SheetContent className="w-[600px]">
                <SheetHeader>
                    <SheetTitle>Your wishlist</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col w-full px-5 gap-5">
                    {wishlist.map(product => <div key={product.id} className="flex items-center gap-x-4">
                        <img src={product.imageURL} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex flex-1 flex-col">
                            <span className="text-sm">{product.brand}</span>
                            <span className="text-md font-semibold">{product.name}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-semibold">${product.price}</span>
                        </div>
                    </div>)}
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        Close
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}