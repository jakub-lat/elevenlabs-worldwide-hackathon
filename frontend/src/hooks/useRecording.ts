import { API_URL } from "@/lib/const";
import { getProducts } from "@/lib/products";
import { conversationHistoryAtom, currentProductAtom, productsAtom, searchAtom, speechStateAtom, wishlistAtom, wishlistOpenAtom } from "@/lib/state";
import playTts, { playTtsCancellable } from "@/lib/tts";
import { useAtom } from "jotai";
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

export default function useRecording() {
    const [speechState, setSpeechState] = useAtom(speechStateAtom);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [products, setProducts] = useAtom(productsAtom);
    const [conversationHistory, setConversationHistory] = useAtom(conversationHistoryAtom);
    const [wishlistOpen, setWishlistOpen] = useAtom(wishlistOpenAtom);
    const [wishlist, setWishlist] = useAtom(wishlistAtom);
    const [currentProduct, setCurrentProduct] = useAtom(currentProductAtom);
    const [search, setSearch] = useAtom(searchAtom);
    const location = useLocation();
    const navigate = useNavigate();

    /** Handles uploading audio and processing the response */
    const uploadAudio = useCallback(async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        setSpeechState('loading');

        try {
            const responses = ['Alright...', 'Sure.', 'Okay.', 'Got it.', 'Sure thing!', 'Hmmm...', 'Mhm.'];
            const cancel = playTtsCancellable(responses[Math.floor(Math.random() * responses.length)]);

            const transcribeResponse = await fetch(`${API_URL}/transcribe/`, { method: "POST", body: formData });

            if (!transcribeResponse.ok) {
                console.error("Failed to transcribe audio");
                return;
            }

            const transcriptionText = await transcribeResponse.json();

            const nextMessageRes = await fetch(`${API_URL}/get_next_message/`, {
                method: "POST",
                body: JSON.stringify({ conversation_history: conversationHistory, user_message: transcriptionText }),
                headers: { "Content-Type": "application/json" }
            });

            const { function_name, arguments: args, response, conversation_history, topic, filters } = await nextMessageRes.json();
            setConversationHistory(conversation_history);

            if (topic && !search.query) {
                setSearch({ query: topic, filters: filters || [] });
            }

            cancel();

            if (function_name === 'show_products' || function_name === 'show_more_products') {
                if (!args.product_ids) return;
                let fetchedProducts = await getProducts();
                setProducts(fetchedProducts.filter((x: any) => args.product_ids.includes(x.id)));
                setWishlistOpen(false);
                if (!location.pathname.includes('browse')) navigate('/browse');
            } else if (function_name === 'open_favorites') {
                setWishlistOpen(true);
                setCurrentProduct(null);
            } else if (function_name === 'add_favourites') {
                let fetchedProducts = await getProducts();
                setWishlist(prev => [...prev, ...fetchedProducts.filter((x: any) => args.product_ids.includes(x.id))]);
                setWishlistOpen(true);
                setCurrentProduct(null);
            } else if (function_name === 'remove_favourites') {
                setWishlist(prev => prev.filter((x: any) => !args.product_ids.includes(x.id)));
                setWishlistOpen(true);
                setCurrentProduct(null);
            } else if (function_name === 'view_product_details') {
                let fetchedProducts = await getProducts();
                setCurrentProduct(fetchedProducts.find((x: any) => x.id === args.product_id) || null);
                setWishlistOpen(false);
            } else if (function_name === 'exit_product_details' || function_name === 'close_favorites') {
                setCurrentProduct(null);
                setWishlistOpen(false);
            }

            playTts(response);
        } catch (error) {
            console.error("Error uploading audio:", error);
        } finally {
            setSpeechState('none');
        }
    }, [conversationHistory, location.pathname, navigate, search.query, setConversationHistory, setCurrentProduct, setProducts, setSearch, setSpeechState, setWishlist, setWishlistOpen]);

    /** Handles starting and stopping recording */
    const handleKeyDown = useCallback(async (event: KeyboardEvent) => {
        if (event.code === "Space" && !mediaRecorder && speechState !== 'loading') {
            event.preventDefault();
            setSpeechState('speaking');

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);
                const chunks: Blob[] = [];

                recorder.ondataavailable = (e: BlobEvent) => chunks.push(e.data);
                recorder.onstop = () => {
                    const audioBlob = new Blob(chunks, { type: "audio/wav" });
                    uploadAudio(new File([audioBlob], "recording.wav", { type: "audio/wav" }));
                };

                recorder.start();
            } catch (error) {
                console.error("Microphone access denied:", error);
            }
        }
    }, [mediaRecorder, speechState, setSpeechState, uploadAudio]);

    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        if (event.code === "Space" && mediaRecorder) {
            setSpeechState('loading');
            event.preventDefault();
            mediaRecorder.stop();
            setMediaRecorder(null);
        }
    }, [mediaRecorder, setSpeechState]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    useEffect(() => {
        getProducts();
    }, []);

}
