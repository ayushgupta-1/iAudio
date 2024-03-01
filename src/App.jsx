import { useEffect, useState } from "react";

import TrackInfo from "./components/tracks/track";
import AudioDragUploader from "./components/dragNdrop/dragNdrop";
import Timeline from "./components/timeline/timeline";

export default function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log("File : ", files);
  }, [files]);

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col w-full max-w-4xl p-4 mx-auto">
      <div className="mt-4 text-6xl">
        <p>iAudio</p>
      </div>
      {/* <div className="mt-6 grid gap-2"> */}
      <div className="mt-2">
        {/* <h1 className="text-2xl">Audio Timeline</h1> */}
        <p className="text-gray-500">
          Add audio files to the timeline and arrange them as needed. Click the
          play button to start playback.
        </p>
      </div>
      {files.length == 0 && <AudioDragUploader onFilesSelected={setFiles} />}
      {/* <AudioDragUploader onFilesSelected={setFiles} /> */}
      <div className="mt-6 grid gap-4">
        {files.length !== 0 && (
          <Timeline tracks={files} onFilesSelected={setFiles} />
        )}
        <div className="grid gap-2">
          {files.map((file, index) => (
            <div key={index}>
              <TrackInfo
                trackName={file.name}
                index={index}
                handleRemoveFile={handleRemoveFile}
                track={files[index]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
