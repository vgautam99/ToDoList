import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import {message, Button} from 'antd';


const Form = () => {
  const {register, handleSubmit, errors} = useForm();
  const [reload, setReload] = useState(false);

  const success = () => {
    message.success('Bucket is created', 10);
  }

  const onSubmit = (data) => {
    console.log(data)

    axios.post('http://127.0.0.1:8000/todolist/api/bucket/', {
      "bucket_name": data['bucket'],
      "created_by": "react"
    }).then(res=>success()).catch(err => console.log(err))


    // if (!bucketPresent) {
    //   axios.post('http://127.0.0.1:8000/todolist/api/bucket/', {
    //     "bucket_name": data['bucket'],
    //     "created_by": "react"
    //   }).then(res=>{
    //     setBucketPresent(true)
    //   }).catch(err => console.log(err))
    // }
    // console.log(bucketPresent)

    // if (bucketPresent) {
    //   axios.post('http://127.0.0.1:8000/todolist/api/bucket/'+data['bucket']+'/list/',{
    //     "list_topic": data['todo'],
    //     "created_by": "react"
    //   }).then().catch(err => console.log(err))
    // }
  };


  return(
     <form onSubmit={handleSubmit(onSubmit)}  id="form">
        <div className="flex-wrapper">
          <div style={{flex: 3, flexDirection: 'row'}}>
            <input className="form-control" id="bucket" ref={register({required: true})}
              type="text" name="bucket" placeholder="Create Bucket..." />
          </div>

          <div style={{flex: 1, flexDirection: 'row'}}>
            <button id="submit" className="btn btn-warning" type="submit" name="create">
              create
            </button>
          </div>
        </div>
      </form>
  );
}

export default Form;
