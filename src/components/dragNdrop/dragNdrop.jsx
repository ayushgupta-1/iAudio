/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import "./dragNdrop.css";

const AudioDragUploader = ({ onFilesSelected }) => {
  const [files, setFiles] = useState([]);

  /**
   * The handleFileChange function takes in a file input event, extracts selected files, and adds them to
   * the existing files state.
   */
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  /**
   * The handleDrop function in JavaScript React allows for handling files that are dropped onto a
   * designated area.
   */
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  /**
   * The function `handleRemoveFile` removes a file from the `files` state array based on the index
   * provided.
   */
  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  /**
   * The `uploadFiles` function adds selected files to the existing list of files and then clears the
   * list after a delay of 300 milliseconds.
   */
  const uploadFiles = () => {
    onFilesSelected((prevFiles) => [...prevFiles, ...files]);
    setTimeout(() => {
      setFiles([]);
    }, [300]);
  };

  return (
    <section className="drag-drop w-full mt-2">
      <div
        className={`document-uploader ${
          files.length > 0 ? "upload-box active" : "upload-box"
        }`}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <>
          <div className="flex items-center mb-4">
            <AiOutlineCloudUpload className="text-[36px] mr-4" />
            <div className="text-[16px]">
              <p className="font-bold">Drag and drop your files here</p>
              <p>Supported files: .MP3</p>{" "}
            </div>
          </div>
          <input
            type="file"
            hidden
            id="browse"
            onChange={handleFileChange}
            accept=".mp3"
            multiple
          />
          <label
            htmlFor="browse"
            className="browse-btn flex hover:bg-gray-700 text-white py-2 px-4 rounded-lg cursor-pointer bg-black"
          >
            Browse
          </label>
        </>
        {files.length > 0 && (
          <div className="flex items-center text-green-500 mt-2 font-medium">
            <AiOutlineCheckCircle
              style={{ color: "#6DC24B", marginRight: 1 }}
            />
            <p>{files.length} file(s) selected</p>
          </div>
        )}
        {files.length > 0 && (
          <div className="flex flex-col">
            {files.map((file, index) => (
              <div
                className="flex flex-row gap-1 sm:gap-6 items-center p-2"
                key={index}
              >
                <div className="flex flex-col gap-1 flex-1">
                  <p className="text-[14px] text-[#333]">{file.name}</p>
                  {/* <p>{file.type}</p> */}
                </div>
                <div className="cursor-pointer">
                  <MdClear
                    className="text-[18px] text-[#888]"
                    onClick={() => handleRemoveFile(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {files.length > 0 && (
          <div
            className="flex hover:bg-gray-700 text-white py-2 px-4 rounded-lg cursor-pointer bg-black"
            onClick={uploadFiles}
          >
            <p>Upload</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AudioDragUploader;
