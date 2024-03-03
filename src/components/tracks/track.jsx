/* eslint-disable react/prop-types */
import { useRef, useEffect, useState, useCallback } from "react";

import {
  MdClear,
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
  MdPlayArrow,
  MdPause,
} from "react-icons/md";
import { MusicIcon } from "../../assets/icons";
import { formatTime } from "../../utils/helper";

const TrackInfo = ({ track, index, handleRemoveFile, edit, editQueue }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    try {
      const currentTime = audioRef.current.currentTime;
      progressBarRef.current.value = currentTime;

      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(progressBarRef.current.value / duration) * 100}%`
      );

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
    // console.log(audioRef.current.duration);
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
    progressBarRef.current.value = 0;
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className="flex cursor-pointer items-center justify-center rounded-full p-3 bg-gray-100 hover:bg-gray-200"
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <MdPause className="w-5 h-5" />
        ) : (
          <MdPlayArrow className="w-5 h-5" />
        )}
      </div>
      <div className="flex items-center gap-2 w-1/3">
        <MusicIcon className="w-4 h-4" />
        <div className="text-sm font-medium">{track[index].name}</div>
      </div>
      <audio
        ref={audioRef}
        src={URL.createObjectURL(track[index])}
        onLoadedMetadata={onLoadedMetadata}
      />
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
      {edit ? (
        <div className="flex justify-center  w-auto sm:w-1/6">
          {index !== 0 && (
            <div
              className="flex flex-grow cursor-pointer items-center justify-center rounded-lg h-10 w-10 text-white bg-black hover:bg-gray-700 mr-1"
              onClick={() => editQueue("up", index)}
            >
              <MdOutlineKeyboardArrowUp className="w-6 h-6" />
            </div>
          )}
          {index !== track.length - 1 && (
            <div
              className="flex flex-grow cursor-pointer items-center justify-center rounded-lg h-10 w-10  text-white bg-black hover:bg-gray-700"
              onClick={() => editQueue("down", index)}
            >
              <MdOutlineKeyboardArrowDown className="w-6 h-6" />
            </div>
          )}
        </div>
      ) : (
        <div className="text-sm flex justify-center  w-auto sm:w-1/6">
          {formatTime(duration)}
        </div>
      )}
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

export default TrackInfo;
