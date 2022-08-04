import React from 'react'
import { Modal } from 'react-bootstrap';

const AddModal = (props) => {
    console.log('props :',props);
  return (
    <div>
      <Modal show={props.isOpen} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddModal