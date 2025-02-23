import { mockProducts } from "@/lib/models";
import { productsAtom, speechStateAtom } from "@/lib/state";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function useRecording() {
    const [speechState, setSpeechState] = useAtom(speechStateAtom);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [transcription, setTranscription] = useState<string | null>(null);
    const [products, setProducts] = useAtom(productsAtom);
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
            const response = await fetch("http://localhost:8000/transcribe/", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Audio uploaded successfully");

                setProducts(mockProducts);
                if(!location.pathname.includes('browse')) {
                    navigate('/browse');
                }
                
            } else {
                console.error("Failed to transcribe audio");
            }
        } catch (error) {
            console.error("Error uploading audio:", error);
        }
        setSpeechState('none');
    };
}