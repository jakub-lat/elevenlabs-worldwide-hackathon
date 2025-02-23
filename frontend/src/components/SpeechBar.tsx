import { bottomBarAtom } from "@/lib/state";
import Badges from "./Badges";
import SpeechIcon from "./SpeechIcon";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function SpeechBar() {
    const [state, setState] = useAtom(bottomBarAtom);
        
    return <div className="fixed bottom-[-20px] left-0 right-0 py-8 flex justify-center z-[1000]">
        <div className="mt-10 py-2 bg-white shadow-lg px-20 flex flex-col items-center rounded-2xl z-[1000]">
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