import { ControlBar, GridLayout, LiveKitRoom, ParticipantTile, RoomAudioRenderer, useTracks } from "@livekit/components-react"
import { Track } from "livekit-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiVideo } from 'react-icons/fi';


import '@livekit/components-styles';




const VideoRoom = () => {
    const router = useRouter();
    const roomId = router.query.roomId?.toString();
    const [token, setToken] = useState<string | null>(null);


    useEffect(() => {
        (async () => {
            if (roomId) {
                try {
                    const resp = await fetch(
                        `/api/rooms/${roomId}/joinVideo`
                    );
                    const data = await resp.json();
                    setToken(data.token);
                } catch (e) {
                    console.error(e);
                }
            }

        })();
    }, []);

    if (!token) {
        return <div>Getting token...</div>;
    }



    return <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        connectOptions={{ autoSubscribe: false }}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL}
        // Use the default LiveKit theme for nice styles.
        data-lk-theme="default"
        style={{ height: '60dvh', width: '60dvh'}}
    >
        {/* Your custom component with basic video conferencing functionality. */}
        <MyVideoConference />
        {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
        <RoomAudioRenderer />
        {/* Controls for the user to start/stop audio, video, and screen 
      share tracks and to leave the room. */}
        <ControlBar />
    </LiveKitRoom>


    function MyVideoConference() {
        // `useTracks` returns all camera and screen share tracks. If a user
        // joins without a published camera track, a placeholder track is returned.
        const tracks = useTracks(
            [
                { source: Track.Source.Camera, withPlaceholder: true },
                { source: Track.Source.ScreenShare, withPlaceholder: false },
            ],
            { onlySubscribed: false },
        );
        return (
            <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
                {/* The GridLayout accepts zero or one child. The child is used
        as a template to render all passed in tracks. */}
                <ParticipantTile />
            </GridLayout>
        );
    }
}


export default VideoRoom;