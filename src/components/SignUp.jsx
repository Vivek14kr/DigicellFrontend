import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";

import "./Signin.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SignUp(props) {
  const navigate = useNavigate()
  const [form, setForm] = useState({})
  const handleChange = ({target: {name, value}})=>{
    setForm({
      ...form, 
      [name] : value,
  });
}
const handleSubmit = async (e)=>{
  e.preventDefault()
  let {firstname, email, password, confirmpassword} = form;

  if (password !== confirmpassword){
    alert("Write matching password")
    return
  }
  let obj = {
    "firstname":firstname,
    "email":email,
    "password":password
  }
  try {
    const response = await fetch("https://itchy-teddy-goat.cyclic.app/auth/signup", {
       method: "POST",
       body: JSON.stringify(obj),
       headers: {
         "Content-Type": "application/json",
       },
     })
     if (response.ok){
       const res = await response.json()
      console.log(res.message)
      props.setSignUp()
            props.onHide()
     }else {
       const error = await response.json();
       console.log(error.message)
      
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
          Sign Up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{backgroundColor:"purple",borderRadius:"20px", color:"yellow"}}>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"onChange={handleChange} name="firstname"  placeholder="Enter Name" />
           
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />
           
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control onChange={handleChange} name="confirmpassword" type="password" placeholder="Rewrite Password" />
          </Form.Group>

     
          <Button variant="primary" type="submit" style={{backgroundColor:"yellow", color:"#800080"}}>
            Sign Up
          </Button>
          <Button onClick={props.onHide} style={{backgroundColor:"yellow", color:"#800080",float:"right" }}>Close</Button>
    
        </Form>
      </Modal.Body>
   
      </div>  
    </Modal>
  );
}

export default SignUp