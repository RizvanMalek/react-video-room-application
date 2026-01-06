import { MeetingProvider, useMeeting, useParticipant, VideoPlayer } from "@videosdk.live/react-sdk";
import { useState, useEffect } from "react";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIyOTViODJhMi1iZThiLTQ3MGQtYmFhMS1kNTIyNDAyZTE2ZGIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sInJvbGVzIjpbImNyYXdsZXIiXSwiaWF0IjoxNzY2NTk4OTcxLCJleHAiOjE3NjkxOTA5NzF9.gXoJFov2hoHi6KpFtxuWcaX6h0oK3dJVvWPSgNPKnS4";

export default function App() {
  const [rooms, setRooms] = useState({
    room1: null,
    room2: null,
  });

  const [activeRoom, setActiveRoom] = useState(null);
  const [userName, setUserName] = useState("");
  const [customRoomId, setCustomRoomId] = useState("");

  // CREATE ROOM (ONLY ONCE)
  const createMeeting = async () => {
    const res = await fetch("https://api.videosdk.live/v2/rooms", {
      method: "POST",
      headers: {
        Authorization: TOKEN,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data.roomId;
  };

  // JOIN PREDEFINED ROOM
  const handleJoinRoom = async (roomKey) => {
    if (!userName.trim()) {
      alert("Please enter your name");
      return;
    }

    if (rooms[roomKey]) {
      setActiveRoom(rooms[roomKey]);
      return;
    }

    const roomId = await createMeeting();
    if (roomId) {
      setRooms((prev) => ({ ...prev, [roomKey]: roomId }));
      setActiveRoom(roomId);
    }
  };

  // JOIN CUSTOM ROOM
  const joinCustomRoom = () => {
    if (!userName.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!customRoomId.trim()) {
      alert("Please enter room ID");
      return;
    }

    setActiveRoom(customRoomId.trim());
  };

  const leaveRoom = () => setActiveRoom(null);

  return (
    <div className="h-screen w-full bg-gray-900">
      <div className="w-full h-full flex gap-6 p-6">
        {/* VIDEO AREA */}
        <div className="flex-1 bg-gray-800 rounded-lg">
          {activeRoom ? (
            <MeetingProvider
              token={TOKEN}
              config={{
                meetingId: activeRoom,
                micEnabled: true,
                webcamEnabled: true,
                name: userName,
              }}
            >
              <MeetingUI
                roomId={activeRoom}
                leaveRoom={leaveRoom}
              />
            </MeetingProvider>
          ) : (
            <div className="h-full flex items-center justify-center text-white">
              Join a room to start
            </div>
          )}
        </div>

        {/* SIDE PANEL */}
        <div className="w-80 bg-gray-800 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-4">Join Meeting</h1>

          {/* NAME INPUT */}
          <input
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded bg-gray-700"
          />

          {/* PREDEFINED ROOMS */}
          <button
            onClick={() => handleJoinRoom("room1")}
            className="w-full bg-sky-700 py-2 rounded mb-2"
          >
            Join Room 1
          </button>

          <button
            onClick={() => handleJoinRoom("room2")}
            className="w-full bg-sky-700 py-2 rounded mb-4"
          >
            Join Room 2
          </button>

          <hr className="border-gray-600 my-4" />

          {/* CUSTOM ROOM */}
          <input
            placeholder="Enter Room ID"
            value={customRoomId}
            onChange={(e) => setCustomRoomId(e.target.value)}
            className="w-full mb-2 px-3 py-2 rounded bg-gray-700"
          />

          <button
            onClick={joinCustomRoom}
            className="w-full bg-green-700 py-2 rounded"
          >
            Join Custom Room
          </button>
        </div>
      </div>
    </div>
  );
}
/* ===========================
   MEETING UI (INSIDE APP)
=========================== */
function ParticipantTile({ participantId }) {
  const { isLocal, displayName } = useParticipant(participantId);

  return (
    <div className="relative w-full h-full bg-black rounded overflow-hidden">
      <VideoPlayer
        participantId={participantId}
        type="video"
        muted={isLocal}
        autoPlay
        playsInline
        containerStyle={{ width: "100%", height: "100%" }}
        className="w-full h-full"
        classNameVideo="w-full h-full object-cover"
      />
      <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs">
        {isLocal ? "You" : displayName}
      </div>
    </div>
  );
}

function MeetingUI({ leaveRoom, roomId }) {
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
    <div className="flex flex-col w-full h-full p-4 gap-4 text-white">
      <h2 className="text-center font-bold">
        Room ID: <span className="text-sky-400">{roomId}</span>
      </h2>

      {/* VIDEO GRID */}
      <div className="flex-1 grid grid-cols-2 gap-4 bg-black p-4 rounded">
        {[...participants.keys()].map((id) => (
          <ParticipantTile key={id} participantId={id} />
        ))}
      </div>

      {/* CONTROLS */}
      <div className="flex justify-center gap-4">
        <button
          onClick={toggleMic}
          className={`px-4 py-2 rounded ${
            localMicOn ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {localMicOn ? "Mic ON" : "Mic OFF"}
        </button>

        <button
          onClick={toggleWebcam}
          className={`px-4 py-2 rounded ${
            localWebcamOn ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {localWebcamOn ? "Camera ON" : "Camera OFF"}
        </button>
      </div>

      <button
        onClick={() => {
          leave();
          leaveRoom();
        }}
        className="mx-auto bg-red-700 px-6 py-2 rounded"
      >
        Leave Room
      </button>
    </div>
  );
}
4