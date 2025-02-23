import Badges from "@/components/Badges";
import SpeechIcon from "@/components/SpeechIcon";

export default function Start() {
    return (
        <div className="w-full h-full bg-[url(/images/7.jpg)] bg-cover bg-center ">
            <div className="flex flex-col justify-center items-center min-h-[100vh] w-full backdrop-blur-sm backdrop-saturate-50">
                <h1 className="text-center text-3xl font-bold mb-12 font-display">What do you want to buy today?</h1>
                <SpeechIcon />
                <span className="text-xs text-gray-800 mt-4">
                    Hold Space to talk
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
