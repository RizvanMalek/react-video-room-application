import { useMeeting } from "@videosdk.live/react-sdk";
import { useEffect } from "react";
import ParticipantTile from "./ParticipantTile";
import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    LogOut,
    Users,
} from "lucide-react";

export default function MeetingUI({ leaveRoom, roomId }) {
    const {
        join,
        leave,
        toggleMic,
        toggleWebcam,
        localMicOn,
        localWebcamOn,
        participants,
    } = useMeeting();

    useEffect(() => {
        join();
    }, []);

    return (
        <div className="relative w-full h-screen bg-[#0b0f1a] text-white">

            {/* TOP BAR */}
            <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-6 py-3 bg-black/40 backdrop-blur-md">
                <div className="text-sm text-gray-300">
                    Room ID: <span className="text-sky-400 font-semibold">{roomId}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users size={16} />
                    {participants.size}
                </div>
            </div>

            {/* VIDEO GRID */}
            <div className="pt-16 pb-24 px-4 h-full">
                <div
                    className="grid gap-4 h-full"
                    style={{
                        gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
                    }}
                >
                    {[...participants.keys()].map((id) => (
                        <ParticipantTile key={id} participantId={id} />
                    ))}
                </div>
            </div>

            {/* CONTROL BAR */}
            <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center">
                <div className="mb-6 flex items-center gap-4 bg-black/60 backdrop-blur-lg px-6 py-4 rounded-2xl shadow-2xl">

                    {/* MIC */}
                    <ControlButton
                        active={localMicOn}
                        onClick={toggleMic}
                        label={localMicOn ? "Mic On" : "Mic Off"}
                        activeColor="bg-green-600"
                        inactiveColor="bg-red-600"
                        icon={localMicOn ? <Mic size={20} /> : <MicOff size={20} />}
                    />

                    {/* CAMERA */}
                    <ControlButton
                        active={localWebcamOn}
                        onClick={toggleWebcam}
                        label={localWebcamOn ? "Camera On" : "Camera Off"}
                        activeColor="bg-green-600"
                        inactiveColor="bg-red-600"
                        icon={localWebcamOn ? <Video size={20} /> : <VideoOff size={20} />}
                    />

                    {/* LEAVE */}
                    <button
                        onClick={() => {
                            leave();
                            leaveRoom();
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-red-700 hover:bg-red-800 rounded-xl font-semibold transition"
                    >
                        <LogOut size={20} />
                        Leave
                    </button>
                </div>
            </div>
        </div>
    );
}

function ControlButton({
    active,
    onClick,
    label,
    activeColor,
    inactiveColor,
    icon,
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl transition font-medium ${active ? activeColor : inactiveColor
                }`}
        >
            {icon}
            {label}
        </button>
    );
}
