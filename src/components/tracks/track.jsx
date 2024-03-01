import { useRef, useEffect, useState, useCallback } from "react";

import { MdClear } from "react-icons/md";

import "./track.css";

const TrackInfo = ({ track, trackName, index, handleRemoveFile }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const playAnimationRef = useRef();

  // const repeat = useCallback(() => {
  //   const currentTime = audioRef.current.currentTime;
  //   console.log("current time :", currentTime);
  //   setTimeProgress(currentTime);
  //   progressBarRef.current.value = currentTime;
  //   progressBarRef.current.style.setProperty(
  //     "--range-progress",
  //     `${(progressBarRef.current.value / duration) * 100}%`
  //   );

  //   playAnimationRef.current = requestAnimationFrame(repeat);
  // }, [audioRef, duration, progressBarRef, setTimeProgress]);

  // const repeat = useCallback(() => {
  //   const currentTime = audioRef.current.currentTime;
  //   console.log("Current Time :" + currentTime);
  //   const currentWholeSecond = Math.floor(currentTime);
  //   console.log(
  //     "current whole sec : " +
  //       currentWholeSecond +
  //       ", time Progress : " +
  //       timeProgress
  //   );

  //   if (Math.floor(currentTime) !== timeProgress) {
  //     var i = 0;
  //     console.log("Updating timeProgress : " + currentWholeSecond + ", " + ++i);
  //     // setTimeProgress(currentWholeSecond);
  //   }
  //   // setTimeProgress(currentTime);
  //   // console.log(timeProgress);
  //   progressBarRef.current.value = currentTime;
  //   progressBarRef.current.style.setProperty(
  //     "--range-progress",
  //     `${(progressBarRef.current.value / duration) * 100}%`
  //   );

  //   playAnimationRef.current = requestAnimationFrame(repeat);
  // }, [duration, audioRef, progressBarRef]);

  // }, [audioRef, duration, progressBarRef, setTimeProgress]);

  const repeat = useCallback(() => {
    try {
      const currentTime = audioRef.current.currentTime;
      // const currentWholeNumber = Math.floor(currentTime); // Get the whole number part of currentTime
      progressBarRef.current.value = currentTime;
      // let lastProgressBarValue = 0;
      // console.log(
      //   "PV : " + progressBarRef.current.value + ", TP :" + timeProgress
      // );
      // if (timeProgress === progressBarRef.current.value - 1) {
      //   console.log(
      //     "if triggered : " + timeProgress + " ," + progressBarRef.current.value
      //   );
      //   setTimeProgress(progressBarRef.current.value);
      // }

      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(progressBarRef.current.value / duration) * 100}%`
      );

      // if (currentTime >= duration - 3) {
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

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

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

  return (
    <div className="flex items-center gap-4">
      <div
        className="flex cursor-pointer items-center justify-center rounded-full p-4 hover:bg-gray-100"
        onClick={togglePlayPause}
      >
        {/* <PlayIcon className="w-4 h-4" /> */}
        {isPlaying ? (
          <PauseIcon className="w-4 h-4" />
        ) : (
          <PlayIcon className="w-4 h-4" />
        )}
      </div>
      <div className="flex items-center gap-2 w-1/3">
        <MusicIcon className="w-4 h-4" />
        <div className="text-sm font-medium">{trackName}</div>
      </div>
      <audio
        ref={audioRef}
        src={URL.createObjectURL(track)}
        onLoadedMetadata={onLoadedMetadata}
      />
      {/* <source src={URL.createObjectURL(track)} type={track.type} />
        Your browser does not support the audio element.
      </audio> */}
      <div className="w-2/5 flex items-center">
        <input
          id="slider"
          type="range"
          ref={progressBarRef}
          defaultValue="0"
          className="w-full"
          onChange={handleProgressChange}
        />
      </div>
      {/* <div className="text-sm flex justify-center  w-auto sm:w-1/6">
        {formatTime(duration)} / {formatTime(duration)}
      </div> */}
      <div className="text-sm flex justify-center  w-auto sm:w-1/6">
        {formatTime(duration)}
      </div>
      <div
        className="flex cursor-pointer items-center justify-center rounded-full h-10 w-10 hover:bg-gray-100"
        onClick={() => handleRemoveFile(index)}
      >
        <MdClear className="w-4 h-4" />
        <span className="sr-only">Remove</span>
      </div>
    </div>
  );
};

function MusicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function PauseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="4" height="16" x="6" y="4" />
      <rect width="4" height="16" x="14" y="4" />
    </svg>
  );
}

function PlayIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

export default TrackInfo;
