import React, {useForm, useState, useEffect} from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { useAlert } from 'react-alert';
import Button from 'react-bootstrap/Button';


const BucketForm = (props) => {
  const alert = useAlert();
  const [bucketUpdatedName, setUpdatedBucket] = useState(props.bucketName);

  const updateBucketHandler = (evt) => {
    setUpdatedBucket(evt.target.value);
  }

  const updateBucket = (newBucketName) => {
    axios.put('http://127.0.0.1:8000/todolist/api/bucket/'+props.bucketName+'/',{
      "bucket_name": newBucketName
    }).then(()=>{
      alert.show('Bucket name is updated!');
      setUpdatedBucket(newBucketName);
    }).catch(err=>console.log(err))
    props.showRenameBucketHandler(false);
  }

  return (
    <div>
      <input type="text" placeholder={bucketUpdatedName} onChange={updateBucketHandler}/>
      <Button type="primary" onClick={()=>updateBucket(bucketUpdatedName)}>update</Button>
      <h1>{bucketUpdatedName}</h1>
    </div>
   );
}

export default BucketForm;
