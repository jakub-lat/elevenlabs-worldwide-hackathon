import Badges from "@/components/Badges";
import SpeechIcon from "@/components/SpeechIcon";
import { Link } from "react-router";

export default function Start() {
    return (
        <div className="w-full h-full bg-cover bg-center bg-gradient relative">
            <div className="absolute top-0 left-0 right-0 p-12 flex flex-col items-center">
                <span className="text-gray-700 font-bold text-md font-display">Revoice.</span>
                <span className="text-gray-600/75 text-sm">Voice-native shopping experience.</span>
            </div>

            <div className="flex flex-col justify-center items-center min-h-[100vh] w-full">
                {/* backdrop-blur-sm backdrop-saturate-50 */}
                <h1 className="text-center text-5xl font-bold mb-16 font-display">
                    What do you want to buy today?
                </h1>
                <SpeechIcon />
                <span className="text-xs text-black/75 mt-6">
                    <Link to="/browse">Hold Space to talk</Link>
                </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-12 flex justify-center">
                <span className="text-black/60 text-sm">This MVP supports shopping for hiking gear, such as tents and backpacks.</span>
            </div>
        </div>
    );
}
