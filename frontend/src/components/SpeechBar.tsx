import { bottomBarAtom } from "@/lib/state";
import Badges from "./Badges";
import SpeechIcon from "./SpeechIcon";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function SpeechBar() {
    const [state, setState] = useAtom(bottomBarAtom);
        
    return <div className="fixed bottom-0 left-0 right-0 py-8 flex justify-center z-[1000]">
        <div className="py-4 px-24 flex flex-col items-center bg-white rounded-2xl shadow-lg z-[1000]">
            <div className="text-sm font-semibold text-gray-800">{state.text}</div>
            <div className={`${state.examples?.length && 'mb-4'} mt-2 flex flex-col items-center transition-all`}>
                <Badges badges={state.examples} />
            </div>
            <SpeechIcon />
            <span className="text-xs text-gray-500 mt-2">
                Hold Space to talk
            </span>
        </div>
    </div>
}