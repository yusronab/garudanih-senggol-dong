import './modal.css';
import axios from "axios"
import { Modal, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from 'react';

export default function DeleteModal(props) {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onDeletedHandler = () => {
        setLoading(true)
        
        axios({
            method: 'DELETE',
            url: `https://api-ticket.up.railway.app/v1/${props.target}/${props.dataid}`,
            timeout: 120000
        }).then(() => {
            navigate("/")
            setLoading(false)
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {loading ? (
                <>
                    <Modal.Header closeButton className="border-0">
                        <Modal.Title id="contained-modal-title-vcenter">
                            Please waiting
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="load-wrapper d-flex justify-content-center">
                        <div className="follow-the-leader">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center border-0">
                        <p>This process takes several time</p>
                    </Modal.Footer>
                </>
            ) : (
                <>
                    <Modal.Header closeButton className="border-0 text-danger">
                        <Modal.Title id="contained-modal-title-vcenter">
                            Warning!!!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure want to delete data with Id : <span className="text-danger fw-bold">{props.dataid}</span>, permanently ?</p>
                    </Modal.Body>
                    <Modal.Footer className="d-flex flex-nowrap border-0">
                        <Button onClick={props.onHide} className="w-100" style={{ borderRadius: "0 10px 0 10px" }}>Cancel</Button>
                        <Button variant="secondary" onClick={(e) => onDeletedHandler(e)} className="w-100" style={{ borderRadius: "10px 0 10px 0" }}>Yes, sure</Button>
                    </Modal.Footer>
                </>
            )}

        </Modal>
    );
}