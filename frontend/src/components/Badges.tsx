export default function Badges({badges}: {badges: string[]}) {
    return <div className="flex text-gray-700 gap-x-4">
        {badges.map(badge => <div key={badge} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-xl text-xs">{badge}</div>)}
    </div>

}