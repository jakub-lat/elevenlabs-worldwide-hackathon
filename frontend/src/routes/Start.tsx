import { useEffect, useState } from "react";
import Badges from "@/components/Badges";
import SpeechIcon from "@/components/SpeechIcon";
import { useAtom } from "jotai";
import { speakingAtom } from "@/lib/state";
import { Link } from "react-router";

export default function Start() {
    const [speaking, setSpeaking] = useAtom(speakingAtom);

    return (
        <div className="w-full h-full bg-[url(/images/7.jpg)] bg-cover bg-center ">
            <div className="flex flex-col justify-center items-center min-h-[100vh] w-full backdrop-blur-sm backdrop-saturate-50">
                <h1 className="text-center text-3xl font-bold mb-12 font-display">What do you want to buy today?</h1>
                <SpeechIcon animate={speaking} />
                <span className="text-xs text-gray-800 mt-4">
                    <Link to="/browse"> Hold Space to talk</Link>
                </span>
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
