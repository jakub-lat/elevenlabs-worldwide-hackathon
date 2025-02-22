import Badges from "./Badges";
import SpeechIcon from "./SpeechIcon";

export default function SpeechBar() {
    return <div className="absolute bottom-10 left-24 right-24 flex flex-col items-center">
        <div className="text-md font-semibold text-gray-800">Here are your results. What do you want to do?</div>
        <div className="mb-4 flex flex-col items-center">
            <Badges badges={["Winter jackets", "Tents", "Hiking boots", "Camping gear"]} />
        </div>
        <SpeechIcon />
        {/* <span className="text-xs text-gray-600 mt-4">
            Control the website with your voice.
        </span> */}
    </div>
}