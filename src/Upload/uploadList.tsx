import React from 'react';
import className from 'classnames';
import { UploadFile } from './Upload';
import Icon from '../Icon';
import Progress from '../Progress';
import Loader from '../Loader';

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const {
    fileList,
    onRemove,
  } = props;
  React.useEffect(()=>{
    console.log(fileList);
  }, [fileList])
  return(
    <ul className="liquid-upload-list">
      {
        fileList.map(item=>{
          const { status, name, uid, percent } = item;
          return(
            <li className="liquid-upload-list-item" key={uid}>
              {/* <span className="file-icon"> */}
                <Icon type="MdAttachFile" theme={status === 'error' ? 'danger' : 'secondary'} className="file-icon"></Icon>
              {/* </span> */}
              <span className={`file-name file-name-${status}`}>
                {/* <Icon type="MdAttachFile" theme={status === 'error' ? 'danger' : 'secondary'}></Icon> */}
                {name}
              </span>
              {status === 'success' && <Icon type="MdCheckCircle" theme="success" className="file-status"></Icon> }
              {status === 'error' && <Icon type="MdWarning" theme="danger" className="file-status"></Icon>}
              {/* <span className="file-status">
                {(status === 'ready' || status === 'uploading') && <Loader show={true} color="#1890ff"/> }
                {status === 'success' && <Icon type="MdCheckCircle" theme="success" className="file-status"></Icon> }
                
              </span> */}
              {/* <span className="file-action"> */}
                <Icon type="MdDelete" onClick={() => { onRemove(item) }} className="file-action" theme={status === 'error' ? 'danger' : 'secondary'}/>
              {/* </span> */}


              {
                status === 'uploading' && <div className="file-progress"><Progress percent={percent || 0} strokeHeight={4}/></div>
              }

            </li>
          )
        })
      }
    </ul>
  )
}

export default UploadList;
