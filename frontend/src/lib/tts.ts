import { API_URL } from "./const";

export default async function playTts(text: string): Promise<HTMLAudioElement> {
    const ttsRes = await fetch(API_URL+"/text-to-speech/", {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
            "Content-Type": "application/json",
        }
    });
    const audioBlob = await ttsRes.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
    return audio;
}

export function playTtsCancellable(text: string): () => void {
    const promise = playTts(text);
    return () => {
        promise.then(audio => audio.pause());
    };
}