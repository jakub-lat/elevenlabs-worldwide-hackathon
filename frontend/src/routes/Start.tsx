import Badges from "@/components/Badges";
import SpeechIcon from "@/components/SpeechIcon";

export default function Start() {
    return (
        <div className="w-full h-full bg-[url(/images/7.jpg)] bg-cover bg-center">
            <div className="flex flex-col justify-center items-center min-h-[100vh] w-full backdrop-blur-sm backdrop-saturate-50 bg-white/30">
                <h1 className="text-center text-6xl font-bold mb-16 font-display tracking-tight">
                    What do you want to buy today?
                </h1>
                <div className="scale-150 mb-8">
                    <SpeechIcon />
                </div>
                <span className="text-sm text-gray-800 mt-4 tracking-wide uppercase">
                    Hold Space to talk
                </span>

                <div className="absolute left-0 right-0 bottom-0 pb-32 w-full">
                    <div className="mt-10 flex flex-col items-center">
                        <span className="text-sm uppercase tracking-widest mb-4 text-gray-700">Inspirations</span>
                        <Badges badges={["Winter jackets", "Tents", "Hiking boots", "Camping gear"]} />
                    </div>
                </div>
            </div>
        </div>
    );
}
