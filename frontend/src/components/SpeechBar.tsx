import { bottomBarAtom, speakingAtom } from "@/lib/state";
import Badges from "./Badges";
import SpeechIcon from "./SpeechIcon";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function SpeechBar() {
    const [state, setState] = useAtom(bottomBarAtom);
    const [speaking, setSpeaking] = useAtom(speakingAtom);
        
    return <div className="fixed bottom-0 left-0 right-0 py-10 flex justify-center z-[1000]">
        <div className="py-5 px-24 flex flex-col items-center bg-white rounded-xl shadow-lg z-[1000]">
            <div className="text-md font-semibold text-gray-800">{state.text}</div>
            <div className={`${state.examples?.length && 'mb-4'} flex flex-col items-center transition-all`}>
                <Badges badges={state.examples} />
            </div>
            <SpeechIcon animate={speaking} />
            {/* <span className="text-xs text-gray-600 mt-4">
                Control the website with your voice.
            </span> */}
        </div>
    </div>
}