import React, {useState, useEffect, useForm} from 'react';
import axios from 'axios';
import Form from '../Form/Form';
import Modal from 'react-modal';
import BucketForm from '../Form/BucketForm';
import ListForm from '../Form/ListForm';

import { useAlert } from 'react-alert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import './Buckets.css';


const Buckets = () => {
  let subtitle;
  const alert = useAlert();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [buckets, setBuckets] = useState([]);
  const [toDoLists, setToDoLists] = useState([]);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [bucketName, setBucketName] = useState(null);
  const [reload, setReload] = useState(false);
  const [showUpdateBucket, setShowUpdateBucket] = useState(false);
  const [visible, setRenameBucket] = useState(true);


  useEffect(() => {
    axios.get('/todolist/api/bucket/').then(res => {
      setBuckets(res.data);
      setReload(false);
    }).catch(err => {
      console.log(err);
    })
  }, [reload])

  useEffect(() => {
    if (!bucketName) return;
    axios.get('/todolist/api/bucket/'+bucketName+'/list/').then(res => {
      setToDoLists(res.data);
      setReload(false);
    }).catch(err => {
      console.log(err)
    })
  }, [bucketName, reload])

  function openModal(bucket) {
    setIsOpen(true);
    setBucketName(bucket);
    setShowUpdateBucket(false);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
    setReload(true);
  }

  const updateStatus = ( updatedStatus, bucketName, id) => {
    axios.put('/todolist/api/bucket/'+bucketName+'/list/'+id+'/',{
      "status": updatedStatus
    }).then(res => {
      alert.show('list status is updated!');
      setReload(true);
    }).catch(err=>console.log(err))
  }

  const deleteBucket = (bucketName) => {
    axios.delete('/todolist/api/bucket/'+bucketName+'/').then(
      res=>{
        alert.show('Bucket is deleted!');
        setReload(true);
      }
    ).catch(err=>console.log(err))
    setIsOpen(false);
  }

  const handleReload = (value) => {
    setReload(value);
  }

  const showRenameBucketHandler = (visible) => {
    setRenameBucket(!visible);
    if (visible) {
      setShowUpdateBucket(true);
    } else {
      setShowUpdateBucket(false);
    }
  }

  return (
    <div>
      <div class="row" style={{marginLeft:"1px"}}>
        <Form handleReload={handleReload}/>
      </div>
      <div class="row">
        {
          buckets && buckets.map((bucket,index) => {
            return(
              <div class="row">
                <div class="col-md-4 col-sm-4">
                  <div class="col-md-12 col-sm-12">
                    <Card id="bucket-container" style={{ width: '12rem'}} onClick={() => openModal(bucket.bucket_name)} key= {bucket.id}>
                      <Card.Img variant="top" src={require("../Assets/Images/bucket_img.png")} width="100"/>
                      <Card.Body>
                        <Card.Title>{bucket.bucket_name}</Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                  <br></br>
                </div>
              </div>
            )
          })
        }

        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="List Modal"
          >

          <React.Fragment>
          <h2 ref={_subtitle => (subtitle = _subtitle)}>To Do List</h2>
          <div class="row">
            <div class="col-sm-6 col-md-6">
              <Button style={{color: "white", background: "orange", marginRight: "5px"}} onClick={closeModal}>close</Button>
              <Button style={{color: "white", background: "red", marginRight: "5px"}} onClick={()=>deleteBucket(bucketName)}>Delete Bucket</Button>
              <Button style={{color: "white", background: "green"}} onClick={()=>showRenameBucketHandler(visible)}>Update Bucket</Button>
            </div>
            <div class="col-sm-6 col-md-6">
              {showUpdateBucket?<BucketForm bucketName={bucketName} showRenameBucketHandler={showRenameBucketHandler}/>:null}
            </div>
          </div>

          <div class="row" style={{marginTop:"5px"}}>
            <div class="col-sm-12 col-md-12">
              <ListForm bucketName={bucketName} handleReload={handleReload}/>
            </div>
          </div>

          <div class="row">
            <div class="col-sm col-md">
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
            </div>
          </div>
          </React.Fragment>
        </Modal>
      </div>

    </div>
  );
}

export default Buckets;
