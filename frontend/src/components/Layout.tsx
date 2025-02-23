import useRecording from "@/hooks/useRecording";
import { AnimatePresence, motion } from "framer-motion";
import { e } from "node_modules/react-router/dist/development/route-data-BmvbmBej.d.mts";
import { useEffect } from "react";
import { useLocation } from "react-router";

export default function Layout({ children }: { children: React.ReactNode }) {
    useRecording();
    const location = useLocation();

    function onKeyDown(e: any) {
        if(e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }
    }

    useEffect(() => {
        document.body.addEventListener('keydown', onKeyDown);
        return () => document.body.removeEventListener('keydown', onKeyDown);
    }, []);

    return children;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="absolute top-0 left-0 right-0"
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}