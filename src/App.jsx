import { useState } from "react";

import TrackInfo from "./components/track";
import AudioDragUploader from "./components/dragNdrop/dragNdrop";
import Timeline from "./components/timeline";

export default function App() {
  const [files, setFiles] = useState([]);
  const [edit, setEdit] = useState(false);

  /**
   * The `handleRemoveFile` function removes a file from the `files` state array based on the index
   * provided.
   */
  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  /**
   * The `editQueue` function allows for moving an item within an array based on a specified position
   * (up or down) and index, this is used to move audio up and down the timeline.
   */
  const editQueue = (position, index) => {
    const newArray = [...files];
    const itemToMove = newArray.splice(index, 1)[0];
    if (edit) {
      if (position === "up" && index > 0) {
        newArray.splice(index - 1, 0, itemToMove);
      } else if (position === "down" && index < newArray.length) {
        newArray.splice(index + 1, 0, itemToMove);
      }
      setFiles(newArray);
    }
    // console.log("queue edit : " + position + ", " + edit);
  };

  //here

  return (
    <div className="flex flex-col w-full max-w-4xl p-4 mx-auto">
      <div className=" mt-4 flex w-full">
        <div className="flex flex-grow text-6xl">
          <p>iAudio</p>
        </div>
        <div className="flex text-gray-500 items-center">
          Made by
          <a
            className="underline ml-1"
            href="https://www.linkedin.com/in/ayush-gupta-099/"
          >
            Ayush Gupta
          </a>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-gray-500">
          Arrange the audio files on the timeline as desired and click the play
          button to begin playback.
        </p>
      </div>
      {files.length == 0 && <AudioDragUploader onFilesSelected={setFiles} />}
      {files.length !== 0 && (
        <div className="mt-6 grid gap-4">
          <Timeline
            tracks={files}
            onFilesSelected={setFiles}
            setEdit={setEdit}
            edit={edit}
          />
          <div className="grid gap-2">
            {files.map((file, index) => (
              <div key={index}>
                <TrackInfo
                  index={index}
                  handleRemoveFile={handleRemoveFile}
                  track={files}
                  edit={edit}
                  editQueue={editQueue}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
