import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./styles.css";

interface PlayerProps {
  recommendedSongs?: Song[];
  className: string,
}

type Song = {
  id: string;
  name: string;
  duration_ms: number;
  preview_url: string;
  url: string;
  artists: Artist[];
  total: number;
  album: {
    id: string;
    name: string;
    images: Image[];
  };
};

type Artist = {
  id: string;
  name: string;
};

type Image = {
  url: string;
};

export function Player({ recommendedSongs, className }: PlayerProps) {
  const [trackIndex, setTrackIndex] = useState(0);

  function handleClickPrevSong() {
    if (recommendedSongs) {
      setTrackIndex((currentTrack) =>
        currentTrack > 0 ? currentTrack - 1 : recommendedSongs.length - 1
      );
    }
  }

  function handleClickNextSong() {
    if (recommendedSongs) {
      setTrackIndex((currentTrack) =>
        currentTrack < recommendedSongs.length - 1 ? currentTrack + 1 : 0
      );
    }
  }

  return (
    <div className={`containerMusic ${className}`}>
      <div className={`imageAlbum ${className}`}>
        <img
          src={
            recommendedSongs &&
            recommendedSongs[trackIndex].album.images[0].url === undefined
              ? `/default.png`
              : recommendedSongs && recommendedSongs[trackIndex].album.images[0].url
          }
          alt={recommendedSongs && recommendedSongs[trackIndex].album.name}
        />
        <h3>Título</h3>
        <p>{recommendedSongs && recommendedSongs[trackIndex].artists[0].name}</p>
      </div>
      <AudioPlayer
        className={"player"}
        src={recommendedSongs && recommendedSongs[trackIndex].url}
        showSkipControls={true}
        showJumpControls={false}
        onClickPrevious={handleClickPrevSong}
        onClickNext={handleClickNextSong}
        onEnded={handleClickNextSong}
        showFilledVolume={true}
        autoPlay={false}
        autoPlayAfterSrcChange={true}
        volume={0.2}
      />
    </div>
  );
}
