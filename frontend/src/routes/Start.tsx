import Badges from "@/components/Badges";
import SpeechIcon from "@/components/SpeechIcon";

export default function Start() {
    return <div>
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
}