import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoomService } from "../services";

export default function Home() {
  const [activeTab, setActiveTab] = useState("create");
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    if (!name.trim()) return alert("Enter your name");

    const roomId = await createRoomService({
      name: `${name}'s Room`,
    });

    navigate(`/meetings/${roomId}`, {
      state: { name },
    });
  };

  const handleJoinRoom = () => {
    if (!name.trim() || !roomId.trim())
      return alert("Enter name & room ID");

    navigate(`/meetings/${roomId}`, {
      state: { name },
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-xl">

        {/* TABS */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-4 ${
              activeTab === "create"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-400"
            }`}
          >
            Create Room
          </button>
          <button
            onClick={() => setActiveTab("join")}
            className={`flex-1 py-4 ${
              activeTab === "join"
                ? "border-b-2 border-green-500 text-green-500"
                : "text-gray-400"
            }`}
          >
            Join Room
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-4">
          <input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded bg-gray-800"
          />

          {activeTab === "join" && (
            <input
              placeholder="Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 uppercase"
            />
          )}

          {activeTab === "create" ? (
            <button
              onClick={handleCreateRoom}
              className="w-full bg-blue-600 py-3 rounded font-semibold"
            >
              Create & Join
            </button>
          ) : (
            <button
              onClick={handleJoinRoom}
              className="w-full bg-green-600 py-3 rounded font-semibold"
            >
              Join Room
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
