import React, {useState, useEffect, useForm} from 'react';
import axios from 'axios';
import Form from '../Form/Form';
import Modal from 'react-modal';
import BucketForm from '../Form/BucketForm';

import './Buckets.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import { Input } from 'antd';


const Buckets = () => {
  let subtitle;
  const [buckets, setBuckets] = useState([]);
  const [toDoLists, setToDoLists] = useState([]);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [bucketName, setBucketName] = useState(null);
  const [reload, setReload] = useState(false);
  const [showUpdateBucket, setShowUpdateBucket] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/todolist/api/bucket/').then(res => {
      console.log(res);
      setBuckets(res.data);
      setReload(false);
    }).catch(err => {
      console.log(err)
    })
  }, [reload])

  useEffect(() => {
    console.log(bucketName);
    if (!bucketName) return;
    axios.get('http://127.0.0.1:8000/todolist/api/bucket/'+bucketName+'/list/').then(res => {
      setToDoLists(res.data);
      console.log(res);
      console.log(reload);
      setReload(false);
      console.log('updating reload to false');
    }).catch(err => {
      console.log(err)
    })
  }, [bucketName, reload])

  function openModal(bucket) {
    setIsOpen(true);
    setBucketName(bucket);
    console.log('model is opened')
    console.log(bucket)

  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }

  const updateStatus = ( updatedStatus, bucketName, id) => {
    console.log(updatedStatus)
    axios.put('http://127.0.0.1:8000/todolist/api/bucket/'+bucketName+'/list/'+id+'/',{
      "status": updatedStatus
    }).then(res => {
      console.log('updating reload to true')
      setReload(true)
      console.log(reload)
    }).catch(err=>console.log(err))
  }

  const deleteBucket = (bucketName) => {
    console.log(bucketName)
    axios.delete('http://127.0.0.1:8000/todolist/api/bucket/'+bucketName+'/').then(
      res=>{
        setReload(true);
      }
    ).catch(err=>console.log(err))
    setIsOpen(false);
  }

  const updateBucket = (bucketName) => {
    console.log('updateBucket');
    setShowUpdateBucket(true);
  }

  return (
    <div className='container'>
      <div id="task-container">
        <Form/>
      </div>
      <div class="row" id="bucketContainer">
        {
          buckets && buckets.map((bucket,index) => {
            return(
              <div class="col-sm col-md">
                <Card style={{ width: '18rem'}} onClick={() => openModal(bucket.bucket_name)} key= {bucket.id}>
                  <Card.Img variant="top" src={require("../Assets/Images/bucket_img.png")} width="100"/>
                  <Card.Body>
                    <Card.Title>{bucket.bucket_name}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            )
          })
        }
      </div>
      <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="List Modal"
        >


      <h2 ref={_subtitle => (subtitle = _subtitle)}>To Do List</h2>
      <button onClick={closeModal}>close</button>
      <button onClick={()=>deleteBucket(bucketName)}>Delete Bucket</button>
      <button onClick={()=>updateBucket(bucketName)}>Update Bucket</button>

      if (showUpdateBucket) {
        ReactDOM.render (
          <BucketForm bucketName={bucketName}/>,
          document.getElementById('root')
        );
      }


      {toDoLists && toDoLists.map((list, index) => {
        return (
        <div>
          <h2>{toDoLists.bucket_name}</h2>
          <Card key={index}>
            <Card.Body>
              <Card.Text>
                {list.list_topic}
              </Card.Text>
              <Dropdown>
                <Button variant="success">{list.status}</Button>

                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                <Dropdown.Menu>
                  <Dropdown.Item href="#" value='ToDo' onClick={()=>updateStatus('ToDo', list.bucket_name, list.id)}>
                    To Do
                  </Dropdown.Item>
                  <Dropdown.Item href="#" value='InProgress' onClick={()=>updateStatus('InProgress', list.bucket_name, list.id)}>
                    In Progress
                  </Dropdown.Item>
                  <Dropdown.Item href="#" value='Done' onClick={()=>updateStatus('Done', list.bucket_name, list.id)}>
                    Done
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
          </Card>
        </div>
        );
      })}
    </Modal>
    </div>
  );
}

export default Buckets;
