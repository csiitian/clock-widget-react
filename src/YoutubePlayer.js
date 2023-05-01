import React, { useRef, useEffect } from "react";

function YoutubePlayer(props) {
  const playerRef = useRef(null);

  useEffect(() => {
    // Load the YouTube Iframe API script
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);

    // Initialize the YouTube player
    let player;
    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player(playerRef.current, {
        videoId: props.videoId,
        playerVars: {
          autoplay: 1,
        },
        events: {
          onReady: () => console.log("YouTube player is ready"),
          onStateChange: (event) =>
            console.log("YouTube player state changed:", event.data),
        },
      });
    };

    return () => {
      // Clean up the YouTube player and script
      if (player) {
        player.destroy();
      }
      document.body.removeChild(script);
      delete window.onYouTubeIframeAPIReady;
    };
  }, [props.videoId]);

  return <div ref={playerRef}></div>;
}

export default YoutubePlayer;
