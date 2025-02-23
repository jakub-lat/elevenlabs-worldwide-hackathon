"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Product } from "@/lib/models";
import { useAtom } from "jotai";
import { currentProductAtom } from "@/lib/state";


export function ExpandableCards({ products }: { products: Product[] }) {
  const [active, setActive] = useAtom(currentProductAtom);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

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
              key={`button-${active.name}-${id}`}
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
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-4xl bg-white dark:bg-neutral-900 sm:rounded-lg overflow-hidden flex flex-col md:flex-row"
            >
              {/* Left: Image */}
              <motion.div
                layoutId={`image-${active.name}-${id}`}
                className="md:w-1/2"
              >
                <img
                  width={400}
                  height={400}
                  src={active.imageURL}
                  alt={active.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Right: Details */}
              <div className="md:w-1/2 p-6 flex flex-col gap-2">
                <motion.h4
                  layoutId={`brand-${active.brand}-${id}`}
                  className="text-sm text-gray-500"
                >
                  {active.brand}
                </motion.h4>
                <motion.h3
                  layoutId={`name-${active.name}-${id}`}
                  className="font-bold text-black dark:text-neutral-200 text-xl"
                >
                  {active.name}
                </motion.h3>
                <motion.p
                  layoutId={`price-${active.price}-${id}`}
                  className="text-gray-700"
                >
                  ${active.price.toFixed(2)}
                </motion.p>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 dark:text-neutral-400 text-base overflow-auto"
                >
                  {active.description}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      {/* Product List */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-4 py-8">
        {products.map((product) => (
          <motion.div
            layoutId={`card-${product.name}-${id}`}
            key={`card-${product.id}-${id}`}
            onClick={() => setActive(product)}
            className="bg-white border border-gray-300 dark:bg-neutral-900 rounded-md cursor-pointer transition-colors
            hover:bg-gray-100 dark:hover:bg-neutral-800 flex flex-col gap-3 w-[300px] shadow-xs"
          >
            {/* Image */}
            <motion.div layoutId={`image-${product.name}-${id}`}>
              <img
                width={200}
                height={200}
                src={product.imageURL}
                alt={product.name}
                className="w-full h-40 object-cover rounded-t-xl"
              />
            </motion.div>
            <div className="px-4 pt-2 pb-5 flex justify-between items-center">
              <div className="flex flex-col">
                {/* Brand */}
                <motion.h4
                  layoutId={`brand-${product.brand}-${id}`}
                  className="text-sm text-gray-600"
                >
                  {product.brand}
                </motion.h4>
                {/* Name */}
                <motion.h3
                  layoutId={`name-${product.name}-${id}`}
                  className="font-semibold text-neutral-800 dark:text-neutral-200"
                >
                  {product.name}
                </motion.h3>
              </div>
              {/* Price */}
              <motion.p
                layoutId={`price-${product.price}-${id}`}
                className="text-center"
              >
                ${product.price.toFixed(2)}
              </motion.p>
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