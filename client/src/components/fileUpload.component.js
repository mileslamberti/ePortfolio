import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

function FileUpload(props) {
  const [Files, setFiles] = useState([]);

  const onDropAccepted = useCallback((acceptedFiles) =>
    props.updateAccepted(acceptedFiles)
  );
  const onDropRejected = useCallback((rejectedFiles) =>
    props.updateRejected(rejectedFiles)
  );

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    maxSize: 1600000000,
    onDropAccepted,
    onDropRejected,
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <>
      <div
        className="dropbox"
        style={{
          width: "700px",
          height: "100px",
          flex: 1,
          flexDirection: "column",
          padding: "20px",
          borderWidth: "2px",
          borderRadius: "2px",
          borderStyle: "dashed",
          backgroundcolor: "#fafafa",
          color: "#bdbdbd",
          outline: "none",
        }}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <p>Drag and drop the files relevant to your project here.</p>
      </div>
      <br />
    </>
  );
}

export default FileUpload;
