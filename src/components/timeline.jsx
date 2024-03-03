/* eslint-disable react/prop-types */
import { useEffect, useState, useRef, useCallback } from "react";
import { MdOutlineEdit, MdClear, MdOutlineDownload } from "react-icons/md";

// import Crunker from "../../utils/crunker";
import { formatTime } from "../utils/helper";
import { PauseIcon, PlayIcon, PlusIcon } from "../assets/icons";

const Timeline = ({ tracks, onFilesSelected, setEdit, edit }) => {
  const [timeProgress, setTimeProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeline, setTimeline] = useState();
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const playAnimationRef = useRef();

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  /* The `repeat` function defined using `useCallback` is responsible for updating the progress of the
  audio playback on the timeline. */
  const repeat = useCallback(() => {
    try {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);

      progressBarRef.current.value = currentTime;

      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(progressBarRef.current.value / duration) * 100}%`
      );

      playAnimationRef.current = requestAnimationFrame(repeat);
    } catch (e) {
      console.log("error : ", e);
    }
  }, [audioRef, progressBarRef, duration, setTimeProgress]);

  /* This `useEffect` hook is responsible for controlling the audio playback and updating the progress
  on the timeline based on the `isPlaying` state. */
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  /**
   * The `onLoadedMetadata` function sets the the progress bar maximum value to duration of an audio element and resets the progress bar value to 0.
   */
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  /**
   * The `onLoadedMetadata` function sets the duration of an audio element to the progress bar
   * maximum value, and resets the progress bar value to 0.
   */
  const onLoadedMetadata = () => {
    // console.log(audioRef.current.duration);
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
    progressBarRef.current.value = 0;
  };

  /* The commented out code block provided is attempting to use the `Crunker` library to create a
timeline by fetching audio tracks, concatenating them, and exporting the merged audio as an MP3
file. */
  // let crunker = new Crunker();

  // const createTimeline = () => {
  //   crunker
  //     .fetchAudio(...tracks)
  //     .then((buffers) => crunker.concatAudio(buffers))
  //     .then((merged) => crunker.export(merged, "audio/mp3"))
  //     .then((output) => setTimeline(output.blob))
  //     .catch((error) => {
  //       throw new Error(error);
  //     });
  // };

  /**
   * The function `createCustomTimeline` generates a custom timeline by fetching and combining blobs from
   * a list of tracks. This results in concatenation of audios and formation of a timeline.
   */
  const createCustomTimeline = () => {
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
        setTimeline(blobUrl);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    createCustomTimeline();
  }, [tracks]);

  const uploadFiles = (event) => {
    event.preventDefault();
    const droppedFiles = event.target.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      onFilesSelected((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  /* The `useEffect` hook is monitoring the `timeProgress` state variable. When the
 `timeProgress` value equals the `duration` value (indicating that the audio playback has reached
 the end), the effect will trigger and audio playback will be reset */
  useEffect(() => {
    if (timeProgress === duration) {
      setIsPlaying(false);
      audioRef.current.currentTime = 0;
    }
  }, [timeProgress]);

  const handleDownload = () => {
    if (timeline) {
      const link = document.createElement("a");
      link.href = timeline;
      link.download = "audio.mp3"; // Specify the filename for download

      // Programmatically click the anchor to trigger download
      document.body.appendChild(link);
      link.click();

      // Clean up after download
      URL.revokeObjectURL(timeline);
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row w-full">
      <div className="flex flex-grow items-center gap-4">
        <div
          className="flex cursor-pointer items-center text-white justify-center rounded-full p-4 bg-black hover:bg-gray-700"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <PauseIcon className="w-5 h-5" />
          ) : (
            <PlayIcon className="w-5 h-5" />
          )}
        </div>
        <div className="flex w-full items-center">
          <input
            id="slider"
            type="range"
            ref={progressBarRef}
            defaultValue="0"
            className="w-full thumb"
            onChange={handleProgressChange}
          />
        </div>

        <audio
          ref={audioRef}
          // src={URL.createObjectURL(new Blob([timeline]))}
          src={timeline}
          onLoadedMetadata={onLoadedMetadata}
        />
        {/* <audio ref={audioRef} onLoadedMetadata={onLoadedMetadata}>
        <source src={timeline} type="audio/mpeg" />
      </audio> */}
        {/* <div className="text-sm flex justify-center">{formatTime(duration)}</div> */}
        <div className="text-sm flex justify-center  w-auto sm:w-1/5">
          {formatTime(timeProgress)} / {formatTime(duration)}
        </div>
      </div>
      <div className="flex items-center mt-2 pl-0 sm:mt-0 sm:pl-1 gap-2">
        <div
          className="flex cursor-pointer items-center text-white justify-center rounded-full p-4 bg-black hover:bg-gray-700"
          onClick={() => setEdit((prev) => !prev)}
        >
          {edit ? (
            <MdClear className="h-5 w-5" />
          ) : (
            <MdOutlineEdit className="h-5 w-5" />
          )}
        </div>
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
        <div
          className="flex cursor-pointer items-center text-white justify-center rounded-full p-3 bg-black hover:bg-gray-700"
          onClick={handleDownload}
        >
          <MdOutlineDownload className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
