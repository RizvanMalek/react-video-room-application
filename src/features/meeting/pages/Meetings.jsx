import { MeetingProvider } from "@videosdk.live/react-sdk";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import MeetingUI from "../components/MeetingUI";

const TOKEN = import.meta.env.VITE_VIDEOSDK_TOKEN;

export default function Meetings() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const userName = state?.name;

  if (!userName) {
    navigate("/");
    return null;
  }

  return (
    <div className="h-screen bg-gray-900">
      <MeetingProvider
        token={TOKEN}
        config={{
          meetingId: id,
          micEnabled: true,
          webcamEnabled: true,
          name: userName,
        }}
      >
        <MeetingUI roomId={id} leaveRoom={() => navigate("/")} />
      </MeetingProvider>
    </div>
  );
}
