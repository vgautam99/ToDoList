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
    axios.put('/todolist/api/bucket/'+props.bucketName+'/',{
      "bucket_name": newBucketName
    }).then(res =>{
      alert.show('Bucket name is updated!');
      setUpdatedBucket(newBucketName);
    }).catch(err=>console.log(err))
    props.showRenameBucketHandler(false);
  }

  return (
    <div class="row">
      <div class="col-sm-8">
        <input style={{margin: "5px"}} className="form-control" type="text" placeholder={bucketUpdatedName} onChange={updateBucketHandler}/>
      </div>
      <div class="col-sm-4">
        <Button style={{margin: "5px"}} type="primary" onClick={()=>updateBucket(bucketUpdatedName)}>update</Button>
      </div>
    </div>
   );
}

export default BucketForm;
