import { useParticipant, VideoPlayer } from "@videosdk.live/react-sdk";
import { useEffect, useRef } from "react";
import { MicOff } from "lucide-react";

export default function ParticipantTile({ participantId }) {
    const { isLocal, displayName, micStream, micOn } =
        useParticipant(participantId);

    const micRef = useRef(null);

    useEffect(() => {
        if (!micRef.current) return;

        if (micOn && micStream) {
            const stream = new MediaStream();
            stream.addTrack(micStream.track);
            micRef.current.srcObject = stream;
            micRef.current.play().catch(() => { });
        } else {
            micRef.current.srcObject = null;
        }
    }, [micStream, micOn]);

    return (
        <div className="relative w-full h-full bg-black rounded-xl overflow-hidden shadow-lg">

            {/* VIDEO */}
            <VideoPlayer
                participantId={participantId}
                type="video"
                muted={isLocal}
                autoPlay
                playsInline
                classNameVideo="w-full h-full object-cover"
            />

            {/* AUDIO */}
            <audio ref={micRef} autoPlay muted={isLocal} />

            {/* NAME BADGE */}
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-xs text-white">
                {isLocal ? "You" : displayName}
            </div>

            {/* MIC OFF INDICATOR */}
            {!micOn && (
                <div className="absolute top-3 right-3 bg-red-600 p-1 rounded-full">
                    <MicOff size={14} />
                </div>
            )}
        </div>
    );
}
