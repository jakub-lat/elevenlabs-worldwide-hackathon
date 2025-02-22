import { useEffect, useState } from "react";
import Badges from "@/components/Badges";
import SpeechIcon from "@/components/SpeechIcon";

export default function Start() {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [transcription, setTranscription] = useState<string | null>(null);

    useEffect(() => {
        let recorder: MediaRecorder | null = null;
        let chunks: Blob[] = [];

        const handleKeyDown = async (event: KeyboardEvent) => {
            if (event.code === "Space" && !recorder) {
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

        try {
            const response = await fetch("http://localhost:8000/transcribe/", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Audio uploaded successfully");
            } else {
                console.error("Failed to transcribe audio");
            }
        } catch (error) {
            console.error("Error uploading audio:", error);
        }
    };

    return (
        <div>
            <div className="flex flex-col justify-center items-center min-h-[100vh] w-full">
                <h1 className="text-center text-2xl font-bold mb-6">What do you want to buy today?</h1>
                <SpeechIcon />
            </div>
            <div className="absolute left-0 right-0 bottom-0 pb-24 w-full">
                <div className="mt-10 flex flex-col items-center">
                    <span className="text-sm">Inspirations:</span>
                    <Badges badges={["Winter jackets", "Tents", "Hiking boots", "Camping gear"]} />
                </div>
            </div>
        </div>
    );
}
