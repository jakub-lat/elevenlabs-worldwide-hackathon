import { cn } from "@/lib/utils";
import { BsSoundwave } from "react-icons/bs";


export default function SpeechIcon({ animate = false }: { animate: boolean }) {
    return <div>
        {/* <BsSoundwave size={40} /> */}
        <div className={cn('boxContainer my-1', { 'noAnimation': !animate })}>
            <div className="box box1"></div>
            <div className="box box2"></div>
            <div className="box box3"></div>
            <div className="box box4"></div>
            <div className="box box5"></div>
        </div>
    </div>
}