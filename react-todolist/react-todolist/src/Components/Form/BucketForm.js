import React, {useForm, useState, useEffect} from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {input} from 'antd';
import { Button } from 'antd';

const BucketForm = (props) => {
  const [bucketUpdatedName, setUpdatedBucket] = useState(props.bucketName);

  const updateBucketHandler = (evt) => {
    setUpdatedBucket(evt.target.value);
    console.log(bucketUpdatedName);
  }

  const updateBucket = (newBucketName) => {
    axios.put('http://127.0.0.1:8000/todolist/api/bucket/'+props.bucketName+'/',{
      "bucket_name": newBucketName
    }).then().catch(err=>console.log(err))
  }

  return (
    <div>
      <input type="text" placeholder={props.bucketName} onChange={updateBucketHandler}/>
      <Button type="primary" onClick={()=>updateBucket(bucketUpdatedName)}>update</Button>
      <h1>{bucketUpdatedName}</h1>
    </div>
   );
}

export default BucketForm;
