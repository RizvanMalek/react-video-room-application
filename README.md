# Project setup frontend

**Prerequisites**
- Node.js v18+
- npm / yarn
- VideoSDK account
- VideoSDK JWT Token

**Clone**
- `git clone https://github.com/RizvanMalek/video-sdk-application-frontend.git`
- `cd video-sdk-application-frontend`

**Install dependencies**
- 'npm install' or 'yarn install'

**Copy ENVs**
- `cp .env.exampe .env`

**Run application**
- `npm run dev`

**How It Works**
- Two rooms (Room 1 and Room 2) are managed using React state.
- Also, We can join custom room.
- A room is created only once using VideoSDK’s /rooms API.
- Room IDs are stored locally after creation.
- When switching rooms:
    - The current meeting is left
    - The selected room is joined instantly using the stored room ID

**Basic logic**
```
if (rooms[roomKey]) {
  setActiveRoom(rooms[roomKey]);
} else {
  const roomId = await createRoom();
  setRooms({ ...rooms, [roomKey]: roomId });
  setActiveRoom(roomId);
}
```

**What is Media Relay?**

- Media Relay allows audio/video of a participant in one room to be relayed (broadcasted) into another room.

- A participant in Room A can be heard and seen in Room B without joining Room B directly.

**How Media Relay Is Used Here**
- Media Relay is handled from the backend using VideoSDK REST APIs.
- Frontend sends:
    - sourceRoomId
    - targetRoomId
    - participantName

**Backend calls VideoSDK /relay API to start relaying media.**
**Backend Flow**
- `Frontend → Backend → VideoSDK Relay API`

**Use Case Examples**
- Host speaking to multiple rooms
- Broadcasting announcements
- One-way communication across rooms

**Thank you**
- Rizwan Malek (Sr. Software engineer)
