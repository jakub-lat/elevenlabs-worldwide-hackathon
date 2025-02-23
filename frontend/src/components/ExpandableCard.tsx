import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Product } from "@/lib/models";
import { useAtom } from "jotai";
import { currentProductAtom } from "@/lib/state";
import { FaStar } from "react-icons/fa";
import { LuExternalLink } from "react-icons/lu";


export function ExpandableCards({ products }: { products: Product[] }) {
  const [active, setActive] = useAtom(currentProductAtom);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as any, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 -mt-[100px] grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${active.id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >

              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${active.id}`}
              ref={ref}
              className="w-full max-w-4xl bg-white dark:bg-neutral-900 sm:rounded-lg overflow-hidden flex flex-col md:flex-row"
            >
              {/* Left: Image */}
              <motion.div
                layoutId={`image-${active.name}-${active.id}`}
                className="md:w-1/3 my-24 mx-8"
              >
                <img
                  width={400}
                  height={400}
                  src={active.image_link}
                  alt={active.name}
                  className="w-full h-full object-contain"
                />
              </motion.div>
              {/* Right: Details */}
              <div className="md:w-1/2 p-6 flex flex-col justify-center gap-0 my-6">
                <motion.h4
                  layoutId={`brand-${active.brand}-${active.id}`}
                  className="text-sm text-gray-500"
                >
                  {active.brand}
                </motion.h4>
                <motion.h3
                  layoutId={`name-${active.name}-${active.id}`}
                  className="font-bold text-black dark:text-neutral-200 text-xl mt-0"
                >
                  {active.name}
                </motion.h3>
                <motion.p
                  layoutId={`price-${active.price}-${active.id}`}
                  className="text-gray-700 mt-2"
                >
                  {active.price}
                </motion.p>
                <motion.div
                  layoutId={`reviews-${active.price}-${active.id}`}
                  className="text-gray-700 mt-8 mb-4"
                >
                  <div className="flex flex-row gap-x-1 items-center">
                    <FaStar size={14} />
                    <div className="text-sm text-gray-600">
                      <span className="text-gray-800">{(Math.floor(Math.random() * 31) * 0.1 + 2).toFixed(1)}/5</span>
                      &nbsp;&nbsp;&nbsp;({Math.floor(Math.random() * (12345 - 24 + 1)) + 24} opinions gathered across the web)
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 dark:text-neutral-400 text-base overflow-auto"
                >
                  {active.description}
                </motion.div>
                <motion.div layout className="mt-4 flex justify-end">
                  <a href={active.product_url} target={'_blank'} className="mt-5 bg-black text-gray-100 rounded-lg px-5 py-2 cursor-pointer flex gap-x-3 items-center">
                    VISIT
                    <LuExternalLink />
                  </a>
                </motion.div>
                
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      {/* Product List */}
      <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-8 pt-2 pb-24 group flex-1 place-items-center">
        {products.map((product) => (
          <motion.div
            layoutId={`card-${product.name}-${product.id}`}
            key={`card-${product.id}-${product.id}`}
            onClick={() => setActive(product)}
            className="bg-white dark:bg-neutral-900 rounded-md cursor-pointer transition-[filter]
            hover:brightness-90 dark:hover:bg-neutral-800 flex flex-col gap-4 max-w-[100%] py-4 h-80"
          >
            {/* Image */}
            <motion.div layoutId={`image-${product.name}-${product.id}`} className="mx-8">
              <img
                width={400}
                height={400}
                src={product.image_link}
                alt={product.name}
                className="w-full h-40 object-contain rounded-t-xl"
              />
            </motion.div>
            <div className="px-4 pt-2 pb-5 flex justify-between items-center">
              <div className="flex flex-col">
                {/* Brand */}
                <motion.h4
                  layoutId={`brand-${product.brand}-${product.id}`}
                  className="text-sm text-gray-600"
                >
                  {product.brand}
                </motion.h4>
                {/* Name */}
                <motion.h3
                  layoutId={`name-${product.name}-${product.id}`}
                  className="font-semibold text-neutral-800 dark:text-neutral-200 mt-0"
                >
                  {product.name}
                </motion.h3>
                {/* Price */}
                <motion.p
                  layoutId={`price-${product.price}-${product.id}`}
                  className="mt-2"
                >
                  {product.price}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};