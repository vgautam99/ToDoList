import React, {useForm, useState, useEffect} from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';

import classes from './ListForm.css';



const ListForm = (props) => {
  const alert = useAlert();
  const [reload, setReload] = useState(true);
  const [listName, setListName] = useState('');

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/todolist/api/bucket/'+props.bucketName+'/list/').then(res=>{
      setReload(false);
    }).catch(err => console.log(err))
  }, [reload])

  const onSubmit = (evt) => {
    evt.preventDefault();
    axios.post('http://127.0.0.1:8000/todolist/api/bucket/'+props.bucketName+'/list/',{
        "list_topic": listName,
        "created_by": "react"
      }).then(res=>{
        alert.show('To Do list is added!');
       setReload(true);
      }).catch(err => console.log(err))

      props.handleReload(true);
  }

  const updateListHandler = (evt) => {
    setListName(evt.target.value);
  }

  return(
    <form onSubmit={onSubmit}  id="list-form" className={classes.Form}>
        <div className="flex-wrapper">
          <div>
            <input className="form-control" id="todo" onChange={updateListHandler}
              value={listName} type="text" name="todo" placeholder="Add List..." />
          </div>

          <div className={classes.Button}>
            <button id="submit" className="btn btn-warning" type="submit" name="create">
              Add
            </button>
          </div>
        </div>
      </form>
  );
};

export default ListForm;
