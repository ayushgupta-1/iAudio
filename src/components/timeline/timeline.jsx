import { useEffect, useState, useRef, useCallback } from "react";
import { MdOutlineEdit } from "react-icons/md";

import Crunker from "../../utils/crunker";
import { PauseIcon, PlayIcon, PlusIcon } from "../../assets/icons";

const Timeline = ({ tracks, onFilesSelected }) => {
  //   const [files, setFiles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeline, setTimeline] = useState();
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const playAnimationRef = useRef();

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const repeat = useCallback(() => {
    try {
      const currentTime = audioRef.current.currentTime;
      progressBarRef.current.value = currentTime;

      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(progressBarRef.current.value / duration) * 100}%`
      );

      // if (currentTime === duration) {
      //   togglePlayPause();
      // }

      playAnimationRef.current = requestAnimationFrame(repeat);
    } catch (e) {
      console.log("error : ", e);
    }
  }, [audioRef, progressBarRef, duration]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  const onLoadedMetadata = () => {
    console.log(audioRef.current.duration);
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
    progressBarRef.current.value = 0;
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  let crunker = new Crunker();

  const createTimeline = () => {
    crunker
      .fetchAudio(...tracks)
      .then((buffers) => crunker.concatAudio(buffers))
      .then((merged) => crunker.export(merged, "audio/mp3"))
      .then((output) => setTimeline(output.blob))
      .catch((error) => {
        throw new Error(error);
      });
  };

  const createTimelineCustom = () => {
    try {
      const uris = tracks.map((track) => {
        // Assuming track is an object with some properties like filename or path
        return URL.createObjectURL(track); // Function to generate URI from track
      });

      // Map over the tracks array and fetch each URI to get the corresponding blob
      const proms = uris.map((uri) => fetch(uri).then((r) => r.blob()));

      // After all promises resolve, create a blob from all the fetched blobs
      Promise.all(proms).then((blobs) => {
        const blob = new Blob(blobs),
          blobUrl = URL.createObjectURL(blob);
        console.log("BU :" + blobUrl);
        setTimeline(blobUrl);
        // audio = new Audio(blobUrl);
        //   audio.play();
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    createTimelineCustom();
  }, [tracks]);

  const editQueue = () => {};

  const uploadFiles = (event) => {
    event.preventDefault();
    const droppedFiles = event.target.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      onFilesSelected((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className="flex cursor-pointer items-center text-white justify-center rounded-full p-4 bg-black hover:bg-gray-700"
        onClick={togglePlayPause}
      >
        {/* <PlayIcon className="w-4 h-4" /> */}
        {isPlaying ? (
          <PauseIcon className="w-5 h-5" />
        ) : (
          <PlayIcon className="w-5 h-5" />
        )}
      </div>
      <div
        className="flex cursor-pointer items-center text-white justify-center rounded-full p-4 bg-black hover:bg-gray-700"
        onClick={editQueue}
      >
        <MdOutlineEdit className="h-5 w-5" />
      </div>
      <div className="flex w-full items-center">
        <input
          id="slider"
          type="range"
          ref={progressBarRef}
          defaultValue="0"
          className="w-full"
          onChange={handleProgressChange}
        />
      </div>
      {/* <audio
        ref={audioRef}
        // src={URL.createObjectURL(new Blob([timeline]))}
        src={timeline}
        onLoadedMetadata={onLoadedMetadata}
      /> */}
      <audio ref={audioRef} onLoadedMetadata={onLoadedMetadata}>
        <source src={timeline} type="audio/mpeg" />
      </audio>
      <div className="text-sm flex justify-center">{formatTime(duration)}</div>
      <input
        type="file"
        hidden
        id="browse"
        onChange={uploadFiles}
        accept=".mp3"
        multiple
      />
      <label
        htmlFor="browse"
        className="browse-btn flex cursor-pointer items-center text-white justify-center rounded-full p-4 bg-black hover:bg-gray-700"
      >
        <PlusIcon className="h-5 w-5" />
      </label>
    </div>
  );
};

export default Timeline;