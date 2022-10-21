import React, { DragEventHandler, DragEvent } from 'react';
import Dropzone from 'react-dropzone';

export type Props = {};

export const ImageDropper = (props: Props) => {
  const dragEnter = (event: DragEvent<HTMLElement>) => {
    console.log(event.dataTransfer);
    console.log(event.dataTransfer.files);
  };

  const validationFunction = (file) => {
    //- Return non-null if not ok
    // return {
    //     code: 'name-too-large',
    //     message: `Name is larger than ${maxLength} characters`,
    // };

    return null; // OK
  };

  return (
    <Dropzone
      onDragEnter={dragEnter}
      onDrop={(acceptedFiles) => console.log(acceptedFiles)}
      accept={{ 'image/*': [] }}
      validator={validationFunction}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div className='grid place-content-center' {...getRootProps()}>
            <input {...getInputProps()} />
            <div className='p-16 border-2 border-dashed border-gray-500 italic hover:bg-gray-500/50 transition-all rounded-md'>
              Drag &lsquo;n&rsquo; drop some files here, or click to select
              files
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};
