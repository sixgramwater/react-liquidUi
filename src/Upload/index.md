## Upload

```tsx
import React from 'react';
import { Upload } from 'liquidUi';

export default () => {
  return(
    <Upload
      action="https://upload.qiniup.com"
      onSuccess={(res)=>{console.log(res)}}
      onError={error=>console.log(error)}
      
    >
      click to upload
    </Upload>
  )
}

```