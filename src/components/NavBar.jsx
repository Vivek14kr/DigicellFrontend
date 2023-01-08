import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavBar({user, setuser, setloggedin}) {
  const navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('firstname');
    setuser("")
    setloggedin(false)
    navigate('/')

  }
  return (
    <Navbar expand="lg" style={{backgroundColor:"#FDFF16"}}>

    
      <Container >
        
        <Navbar.Brand href="#home" style={{color:"#5C1492"}}>Quiz Competition</Navbar.Brand>
        <Nav className="justify-content-end flex-grow-1 pe-3">
        {user? <Navbar.Brand href="" style={{
            fontWeight:"bold" , color:"#5C1492"
        }}> Hello {user}!</Navbar.Brand>:<Navbar.Brand href="" style={{
          fontWeight:"bold" , color:"#5C1492"
      }}> Hello there!</Navbar.Brand>}
        {user? <Button style={{backgroundColor:"#8620B7", color:"yellow"}} onClick={handleLogout}>Logout</Button>:""}
                </Nav>
        
      </Container>
    </Navbar>
  )
}

export default NavBar