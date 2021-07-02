import React, { useState } from 'react';
import className from 'classnames';
import './index.less';

export interface DraggerProps {
  onFile: (files: FileList) => void;
}

const Dragger:React.FC<DraggerProps> = (props) => {
  const {
    children,
    onFile,
  } = props;
  const [dragOver, setDragOver] = useState(false);
  const classes = className('liquid-upload-dragger', {
    'is-drag-over': dragOver,
  });

  const handleDrag = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  }

  const handleDrop = (e: React.DragEvent<HTMLElement>)=>{
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  }
  return(
    <div
      className={classes}
      onDragOver={e=>{handleDrag(e, true)}}
      onDragLeave={e=>{handleDrag(e, false)}}
      onDrop={e=>handleDrop(e)}
    >
      {children}
    </div>
  )
}

export default Dragger;