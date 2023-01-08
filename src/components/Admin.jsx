import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate } from 'react-router-dom';
import { saveData } from './localStorage';
import Alert from 'react-bootstrap/Alert';

function Admin() {
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({})
  const navigate = useNavigate()

  const handleChange = ({target: {name, value}})=>{
    setForm({
      ...form, 
      [name] : value,
  });
  }
  const handlePlayAcess = () => {
    
      
    setVisible(true)
 
     setTimeout(()=>{
        setVisible(false)
      },2000)
   
  } 
  const handleSubmit = async (e) =>{
    e.preventDefault()

    const {email, password} = form;

    if (email != "admin@mail.com" && password !="admin"){
      handlePlayAcess()
      return;
    }



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
    
             navigate("/adminpanel")
      }else {
        const error = await response.json();
        console.log(error.message)
        
      }
    
      
    } catch (error) {
      console.log(error," yo")
    }

  }
  return (
    <div style={{height:"1000px"}}>
        <Alert key={"primary1"} variant={"primary"} show={visible} >
        No Admin Panel Access
      </Alert>

      <h1 style={{color:"yellow", padding:"50px"}}>Admin Sign In</h1>  
      <Card
        style={{
            
          width: "50%",
          textAlign: "left",
          padding: "20px",
          margin: "auto",
          borderRadius: "20px",
          backgroundColor: "#FDFF16",
        }}
      >
        <div style={{border:"20px solid #6B199F", borderRadius:"20px", padding:"80px"}}>
           <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control  onChange={handleChange} type="email" name="email"placeholder="Enter Email" />
           
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handleChange} type="password" name="password"  placeholder="Password" />
          </Form.Group>
     
          <Button variant="primary" type="submit" style={{backgroundColor:"#6B199F", color:"yellow"}}>
            Sign In
          </Button>
          <Button style={{backgroundColor:"#6B199F", color:"yellow",float:"right" }}>Close</Button>
    
        </Form>
        </div>
      </Card>
    </div>
  )
}

export default Admin