import { type } from 'os';
import React from 'react';
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone';

type Props = {
  onDropImages: (images: File[]) => void;
};

export const ImageDropper = ({ onDropImages }: Props) => {
  const [hasFocus, setHasFocus] = React.useState(false);

  const validationFunction = (file: File) => {
    //- Return non-null if not ok
    //- return null if ok

    const valid =
      file.size < 1000000 //- 1MB
        ? null // OK
        : {
            code: 'file-too-large',
            message: 'File size is larger than 1MB',
          };

    return valid;
  };

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[], dropEvent: DropEvent) => {
    dropEvent.preventDefault();
    dropEvent.stopPropagation();

    console.log('--- onDrop ---');
    console.log('Accepted', acceptedFiles);
    console.log('Rejected', rejectedFiles);
    console.log('DropEvent', dropEvent);

    onDropImages(acceptedFiles);

    setHasFocus(false);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setHasFocus(true);
  };

  return (
    <Dropzone
      accept={{ 'image/*': [] }}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={() => setHasFocus(false)}
      validator={validationFunction}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div
            className={`cursor-pointer select-none rounded-md border-2 border-dashed border-gray-500 p-16
                        text-center italic transition-all hover:bg-gray-500/50 ${
                          hasFocus ? 'bg-gray-500/50' : ''
                        }`}
          >
            Drag &lsquo;n&rsquo; drop some files here, or click to select files
          </div>
        </div>
      )}
    </Dropzone>
  );
};

//- https://github.com/rpldy/react-uploady
