import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { APIURL } from './util';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [newText, setNewText] = useState('');
  const [h1Text, setH1Text] = useState('Default H1 Text'); // Initialize state with default text
  const [h1Id, setH1Id] = useState(null); // State to store H1 ID for updates

  useEffect(() => {
    // Fetch the initial H1 text from the backend
   

    fetchH1();
  }, []);
  const fetchH1 = async () => {
    try {
      const response = await axios.get(APIURL+'/api/h1');
      setH1Text(response?.data?.data[0]?.header); // Adjust based on your API response
      setH1Id(response?.data?.data[0]?._id); // Store the H1 ID for updates
    } catch (error) {
      console.error('Error fetching H1 text:', error);
    }
  };
  const handleShow = () => {
    setNewText(h1Text)
    setShowModal(true);

  }
  const handleClose = () => setShowModal(false);

  const handleCreate = async () => {
    if (newText.trim() !== '') {
      try {
        await axios.post(APIURL+'/api/h1', { header: newText });
        setH1Text(newText);
        handleClose();
      } catch (error) {
        console.error('Error creating H1:', error);
      }
    }
  };

  const handleUpdate = async () => {
    if (newText.trim() !== '' && h1Id) {
      try {
        const body ={ header: newText, id: h1Id }
       const res= await axios.put(APIURL+'/api/h1', body);
        console.log('handle update',res)
        await fetchH1();
        handleClose();
      } catch (error) {
        console.error('Error updating H1:', error);
      }
    }
  };

  return (
    <div className="dashboard">
      <Button className="update-button" onClick={handleShow}>
        Enter new H1 and Update
      </Button>

      <h1>{h1Text}</h1>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update H1 Text</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicText">
              <Form.Label>New H1 Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new H1 text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={h1Id ? handleUpdate : handleCreate}>
            {h1Id ? 'Update' : 'Create'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
