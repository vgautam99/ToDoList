import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';

import { useAlert } from 'react-alert';
import classes from './Form.css';


const Form = (props) => {
  const alert = useAlert();
  const {register, handleSubmit, errors} = useForm();
  const [reload, setReload] = useState(false);


  const onSubmit = (data, e) => {
    axios.post('/todolist/api/bucket/', {
      "bucket_name": data['bucket'],
      "created_by": "react"
    }).then(res=>{
      alert.show('Bucket is created!');
    }).catch(err => console.log(err))
    props.handleReload(true);
    e.target.reset();
  };


  return(
     <form onSubmit={handleSubmit(onSubmit)}  id="form" className={classes.Form}>
        <div className="flex-wrapper">
          <div class="row">
            <div class="col-sm-6 col-md-6">
              <input className="form-control" id="bucket" ref={register({required: true})}
                type="text" name="bucket" placeholder="Create Bucket..."/>
            </div>
            <div className={classes.Button} class="col-sm-6 col-md-6">
              <button id="submit" className="btn btn-warning" type="submit" name="create">
                create
              </button>
            </div>
          </div>
        </div>
      </form>
  );
}

export default Form;
