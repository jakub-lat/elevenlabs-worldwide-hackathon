import { speechStateAtom } from "@/lib/state";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { BsSoundwave } from "react-icons/bs";


export default function SpeechIcon() {
    const [speechState, setSpeechState] = useAtom(speechStateAtom);

    return <div>
        {/* <BsSoundwave size={40} /> */}
        <div className={cn('boxContainer my-1', { 'noAnimation': speechState === 'none', 'loading': speechState === 'loading' })}>
            <div className="box box1"></div>
            <div className="box box2"></div>
            <div className="box box3"></div>
            <div className="box box4"></div>
            <div className="box box5"></div>
        </div>
    </div>
}