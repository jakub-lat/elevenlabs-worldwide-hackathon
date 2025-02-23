import Badges from "@/components/Badges";
import SpeechIcon from "@/components/SpeechIcon";
import { Link } from "react-router";

export default function Start() {
    return (
        <div className="w-full h-full bg-cover bg-center bg-white">
            <div className="flex flex-col justify-center items-center min-h-[100vh] w-full backdrop-blur-sm backdrop-saturate-50">
                <h1 className="text-center text-5xl font-bold mb-16 font-display">
                    What do you want to buy today?
                </h1>
                <SpeechIcon />
                <span className="text-sm text-gray-800 mt-6">
                    <Link to="/browse">Hold Space to talk</Link>
                </span>
            </div>
            
        </div>
    );
}
