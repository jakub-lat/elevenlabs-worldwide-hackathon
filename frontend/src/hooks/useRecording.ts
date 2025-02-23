import { mockProducts } from "@/lib/models";
import { conversationHistoryAtom, currentProductAtom, productsAtom, speechStateAtom, wishlistAtom, wishlistOpenAtom } from "@/lib/state";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const API_URL = "http://localhost:8000";

export default function useRecording() {
    const [speechState, setSpeechState] = useAtom(speechStateAtom);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [transcription, setTranscription] = useState<string | null>(null);
    const [products, setProducts] = useAtom(productsAtom);
    const [conversationHistory, setConversationHistory] = useAtom(conversationHistoryAtom);
    const [wishlistOpen, setWishlistOpen] = useAtom(wishlistOpenAtom);
    const [wishlist, setWishlist] = useAtom(wishlistAtom);
    const [currentProduct, setCurrentProduct] = useAtom(currentProductAtom);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let recorder: MediaRecorder | null = null;
        let chunks: Blob[] = [];

        const handleKeyDown = async (event: KeyboardEvent) => {
            if (event.code === "Space" && !recorder && speechState !== 'loading') {
                event.preventDefault();
                setSpeechState('speaking');

                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    recorder = new MediaRecorder(stream);
                    setMediaRecorder(recorder);
                    chunks = [];

                    recorder.ondataavailable = (e: BlobEvent) => chunks.push(e.data);
                    recorder.onstop = () => {
                        const audioBlob = new Blob(chunks, { type: "audio/wav" });
                        const audioFile = new File([audioBlob], "recording.wav", { type: "audio/wav" });
                        uploadAudio(audioFile);
                    };

                    recorder.start();
                    console.log("Recording started...");
                } catch (error) {
                    console.error("Microphone access denied:", error);
                }
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.code === "Space" && recorder) {
                setSpeechState('loading');
                event.preventDefault();
                recorder.stop();
                setMediaRecorder(null);
                recorder = null;
                console.log("Recording stopped.");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const uploadAudio = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        setSpeechState('loading');
        try {
            const transcribeResponse = await fetch(API_URL+"/transcribe/", {
                method: "POST",
                body: formData,
            });

            if(!transcribeResponse.ok) {
                console.error("Failed to transcribe audio");
                return;
            }

            const transcriptionText = await transcribeResponse.json();

            const nextMessageRes = await fetch(API_URL+"/get_next_message/", {
                method: "POST",
                body: JSON.stringify({ conversation_history: conversationHistory, user_message: transcriptionText }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const { function_name, arguments: args, response, conversation_history } = await nextMessageRes.json();
            setConversationHistory(conversationHistory);

            console.log(function_name, args, response);

            if (function_name === 'do_nothing') {
                const ttsRes = await fetch(API_URL+"/text-to-speech/", {
                    method: "POST",
                    body: JSON.stringify({ text: response }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const audioBlob = await ttsRes.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();
            } else if(function_name === 'show_products' || function_name === 'show_more_products') {
                const productsRes = await fetch(API_URL+"/products");
                let products = await productsRes.json();
                products = products.filter((x: any) => args.product_ids.includes(x.id));
                setProducts(products);

                if(!location.pathname.includes('browse')) {
                    navigate('/browse');
                }
            } else if(function_name === 'open_favorites') {
                setWishlistOpen(true);
            } else if(function_name === 'add_favourites') {
                const ids = args.product_ids;
                const productsRes = await fetch(API_URL+"/products");
                let products = await productsRes.json();
                products = products.filter((x: any) => ids.includes(x.id));
                setWishlist([...wishlist, ...products]);
            } else if(function_name === 'remove_favourites') {
                const ids = args.product_ids;
                setWishlist(wishlist.filter((x: any) => !ids.includes(x.id)));
            } else if(function_name === 'view_product_details') {
                const id = args.product_id;
                const productsRes = await fetch(API_URL+"/products");
                let products = await productsRes.json();
                const product = products.find((x: any) => x.id === id);
                setCurrentProduct(product);
            } else if(function_name === 'exit_product_details') {
                setCurrentProduct(null);
            } else if(function_name === 'close_favorites') {
                setWishlistOpen(false);
            }

            // setProducts(mockProducts);
            // if(!location.pathname.includes('browse')) {
            //     navigate('/browse');
            // }
                
        } catch (error) {
            console.error("Error uploading audio:", error);
        } finally {
            setSpeechState('none');
        }
    };
}