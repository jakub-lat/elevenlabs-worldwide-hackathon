import useRecording from "@/hooks/useRecording";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router";

export default function Layout({ children }: { children: React.ReactNode }) {
    useRecording();
    const location = useLocation();

    return children;

    // return (
    //     <AnimatePresence>
    //         <motion.div
    //             className="absolute top-0 left-0 right-0"
    //             key={location.pathname}
    //             initial={{ opacity: 0 }}
    //             animate={{ opacity: 1 }}
    //             exit={{ opacity: 0 }}
    //             transition={{ duration: 0.5 }}
    //         >
    //             {children}
    //         </motion.div>
    //     </AnimatePresence>
    // );
}