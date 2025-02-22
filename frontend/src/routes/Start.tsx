import { useEffect, useState } from "react";
import Badges from "@/components/Badges";
import SpeechIcon from "@/components/SpeechIcon";

export default function Start() {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    useEffect(() => {
        let recorder: MediaRecorder | null = null;

        const handleKeyDown = async (event: KeyboardEvent) => {
            if (event.code === "Space" && !recorder) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    recorder = new MediaRecorder(stream);
                    setMediaRecorder(recorder);

                    let chunks: Blob[] = [];

                    recorder.ondataavailable = (e: BlobEvent) => chunks.push(e.data);
                    recorder.onstop = () => {
                        const audioBlob = new Blob(chunks, { type: "audio/wav" });
                        const newAudioUrl = URL.createObjectURL(audioBlob);
                        setAudioUrl(newAudioUrl); // Update the audio URL after each recording
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

    return (
        <div>
            <div className="flex flex-col justify-center items-center min-h-[100vh] w-full">
                <h1 className="text-center text-2xl font-bold mb-6">What do you want to buy today?</h1>
                <SpeechIcon />
                {audioUrl && (
                    <audio key={audioUrl} controls className="mt-4">
                        <source src={audioUrl} type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                )}
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
