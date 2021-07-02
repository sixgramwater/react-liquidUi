import React, { useRef, useState } from 'react';
import className from 'classnames';
import Dragger from './dragger';
import Message from '../Message';
import UploadList from './uploadList';
import axios from 'axios';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  // upload url 
  action: string;
  drag?: boolean;
  /** 可上传的文件类型 */
  accept?: string;
  /** 自定义请求头 */
  headers?: {[key: string]: any};
  data?: {[key: string]: any};
  /** 文件上传的字段名称 */
  name?: string;
  /** 是否一次选择多个文件上传 */
  multiple?: boolean;
  defaultFileList?: UploadFile[];
  /** 设置上传是否携带验证信息 */
  withCredentials?: boolean;
  /** 上传之前的回调 */
  beforeUpload: (file: File) => boolean | Promise<File>;
  /** 上传过程中的回调函数 */
  onProgress?: (percentage: number, file: File) => void;
  /** 上传成功的回调函数 */
  onSuccess?: (data: any, file: UploadFile) => void;
  /** 上传出错的回调函数 */
  onError?: (err: any, file: UploadFile) => void;
  /** 文件状态改变时的回调函数，上传成功或者失败时都会被调用 */
  onChange?: (file: UploadFile) => void;
  /** 从文件列表移除文件的回调函数 */
  onRemove?: (file: UploadFile) => void;
}

const Upload: React.FC<UploadProps>= (props) => {
  const {
    action,
    drag,
    accept,
    data,
    headers,
    name,
    multiple,
    defaultFileList,
    withCredentials,
    beforeUpload,
    onChange,
    onError,
    onProgress,
    onRemove,
    onSuccess,
    children,
  } = props;

  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const fileInput = useRef() as React.MutableRefObject<HTMLInputElement>;
  // update fileList (uploadlist view)
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file=>{
        if(file.uid === updateFile.uid) {
          return {...file, ...updateObj}
        } else {
          return file;
        }
      })
    })
  }
  const uploadFiles = (files: FileList) => {
    let filesArray = Array.from(files);
    filesArray.forEach(file=> {
      if(!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if(result && result instanceof Promise) {
          result.then(processedFile=>{
            post(processedFile);
          })
        } else if(result !== false) {
          post(file);
        }
      }
    })
    // Message.success('File Upload Success')
  }

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    
    setFileList(prevList=>{
      // console.log([_file, ...prevList])
      return [_file, ...prevList]
    });

    const formData = new FormData();
    formData.append(name || 'file', file);
    if (data) {
      Object.keys(data).forEach(key=>{
        formData.append(key, data[key])
      })
    }

    // axios API: url, data, config
    axios.post(action, formData, {
      headers,
      withCredentials,
      onUploadProgress: (e: ProgressEvent) => {
        let percentage = Math.round(e.loaded*100 / e.total) || 0;
        updateFileList(_file, {
          percent: percentage,
          status: 'uploading',
        })
        _file.percent = percentage;
        _file.status = 'uploading';
        onProgress && onProgress(percentage, file);
      }
    }).then(res => {
      updateFileList(_file, {
        response: res.data,
        status: 'success',
      })
      _file.status = 'success';
      _file.response = res.data;
      onSuccess && onSuccess(res.data, _file);
    }).catch(err => {
      updateFileList(_file, {
        status: 'error',
        response: err,
      })
      _file.status = 'error'
      _file.response = err
      onError && onError(err, _file)
    }).finally(() => {
      onChange && onChange(_file)
    })

    // console.log(fileList)


  }

  const handleRemove = (_file: UploadFile) => {
    setFileList(prevList=>{
      return prevList.filter(item=>item.uid !== _file.uid);
    });
    console.log(_file);
    onRemove && onRemove(_file);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // fileList
    if(!files){
      return;
    }
    uploadFiles(files);
    if(fileInput.current) {
      fileInput.current.value = '';
    }
  }
  const handleClick = () => {
    if(fileInput.current) {
      fileInput.current.click();
    }
  }
  return(
    <div className="liquid-upload">
      <div className="liquid-upload-input" onClick={handleClick}>
        {
          drag ?
          <Dragger
            onFile={files=>uploadFiles(files)}
          >
            {children}
          </Dragger>
          : children
        }
        <input 
          type="file"
          ref={fileInput}
          onChange={handleFileChange}
          style={{display: 'none'}}
          accept={accept}
          multiple={multiple}
        />
        
      </div>
      <UploadList 
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  drag: true,
  name: 'file',
}

export default Upload;