import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone';

function FileUpload(props){

    const onDrop = useCallback((acceptedFiles) => {
        
        console.log(acceptedFiles.length)
        props.refreshFunction(acceptedFiles)


    })

    const acceptableFiles = ['.pdf', '.png', '.jpg'];

    const {acceptedFiles, fileRejections,  getRootProps, getInputProps} = useDropzone({  onDrop,
                                                                        maxSize: 1600000000,
                                                                        accept: acceptableFiles
                                                                        });
  
    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));
        
    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map(e => (
              <li key={e.code}>{e.message}</li>
            ))}
          </ul>
        </li>
      ));

    return (
        
      <>
        <br/>
        <div className="dropbox"
             style={{width: '700px',
                     height: '100px',
                     flex: 1,
                     flexDirection: 'column',
                     padding: '20px',
                     borderWidth: '2px',
                     borderRadius: '2px',
                     borderStyle: 'dashed',
                     backgroundcolor: '#fafafa',
                     color: '#bdbdbd',
                     outline: 'none'
                     }} {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>Drag and drop the files relevant to your portfolio here.</p>
          
        </div>
        <br/>
        <aside>
          <h4>Files</h4>
          <ul>{acceptedFileItems}</ul>
          <h4>Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </aside>
      </>
    );
}


export default FileUpload