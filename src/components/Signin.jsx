import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import "./Signin.css"
import { useState } from 'react';
import { saveData } from "./localStorage";
import { useNavigate } from 'react-router-dom';
function Signin(props) {
  const [form, setForm] = useState({})
  const navigate = useNavigate()

  const handleChange = ({target: {name, value}})=>{
    setForm({
      ...form, 
      [name] : value,
  });
  }
  console.log(form)
  const handleSubmit = async (e) =>{
    e.preventDefault()

    try {
     const response = await fetch("https://itchy-teddy-goat.cyclic.app/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok){
        const res = await response.json()
        saveData("token", res.token)
        saveData("firstname", res.firstname)
        props.setuser(res.firstname)
             navigate("/quiz")
      }else {
        const error = await response.json();
        console.log(error.message)
        props.setvisible()
        props.onHide()
      }
    
      
    } catch (error) {
      console.log(error," yo")
    }

  }
  return (
    <Modal
      {...props}
      dialogClassName="my-modal"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    
    >
      <div style={{padding:"5px", }}>
      <Modal.Header closeButton style={{color:"yellow"}}>
        <Modal.Title id="contained-modal-title-vcenter " style={{color:"yellow"}}>
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{backgroundColor:"purple",borderRadius:"20px", color:"yellow"}}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={handleChange} type="email" name="email" placeholder="Enter email" />
           
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handleChange} type="password" name="password" placeholder="Password" />
          </Form.Group>
     
          <Button variant="primary" type="submit" style={{backgroundColor:"yellow", color:"#800080"}}>
            Login
          </Button>
          <Button onClick={props.onHide} style={{backgroundColor:"yellow", color:"#800080",float:"right" }}>Close</Button>
    
        </Form>
      </Modal.Body>
   
      </div>  
    </Modal>
  );
}

export default Signin