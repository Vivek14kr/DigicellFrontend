import Button from "react-bootstrap/Button";
import react, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import Image from "react-bootstrap/Image";
import Bug from "../assets/bug.png";
import Panda from "../assets/panda.png";
import Signin from "./Signin";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import { loadData } from "./localStorage";
import Alert from 'react-bootstrap/Alert';

function Home({setuser, setloggedin, loggedin}) {
  const [visible, setVisible] = useState(false)
  const [SignUpsuccess, setSignUpSuccess] = useState(false)
  const [modalShow, setModalShow] = useState(false);
  const [SignUpModal, setSignUpModal] = useState(false);
  const [savedUser, SetSavedUser] = useState("")
  const [token, setToken] = useState("")
  const navigate = useNavigate();
  const [accessGranted, setAccess] = useState(true);

  useEffect(()=>{
   
   let data = loadData("token")
   let user = loadData("firstname")

   if (data){
    setToken(data)
    setloggedin(true)
   }
   if(user){
   SetSavedUser(user)
   setuser(user)
   }

  }, [])
  const handlePlayAcess = () => {
    
      
      setVisible(true)
   
       setTimeout(()=>{
          setVisible(false)
        },2000)
     
    } 
    const handleSignUpSuccess = () => {
    
      
      setSignUpSuccess(true)
   
       setTimeout(()=>{
          setSignUpSuccess(false)
        },2000)
     
    } 
    const handleQuiz = ()=>{
      navigate("/quiz")
    }
  return (
    <div style={{  paddingBottom:"5%"}}>
      <Alert key={"primary1"} variant={"primary"} show={visible} >
        Invalid Credientials! Login Again
      </Alert>
      <Alert key={"primary2"} variant={"primary"} show={SignUpsuccess} >
        SignUp Successful, Login Please
      </Alert>
      <div style={{borderTop:"10px solid #6B199F"}}>
      <img
        src={Bug}
        alt="bug"
        style={{ positon: "relative", marginBottom: "-50px" }}
      />
      <Card
        style={{
          width: "50%",
          textAlign: "left",
          padding: "50px",
          margin: "auto",
          borderRadius: "20px",
          backgroundColor: "#FDFF16",
        
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "25px",
            color: "#9328C2",
            textShadow: "10px",
          }}
        >
          Welcome to Quiz Game
        </p>

        {loggedin ?      <Button
          variant="primary"
          size="lg"
          style={{ backgroundColor: "#9328C2", color: "yellow" }}
          onClick={handleQuiz}
        >
          Let's Play
        </Button>: 
        <div>
        <p
          style={{
            fontWeight: "bold",
            paddingTop: "40px",
            textAlign: "center",
            fontSize: "25px",
            color: "#9328C2",
          }}
        >
          SignUp/Login
        </p>
        <div
          style={{
            display: "flex",
            paddingTop: "0px",
            margin: "auto",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Button
            style={{
              height: "40px",
              margin: "auto",
              backgroundColor: "#9328C2",
              color: "yellow",
            }}
            onClick={() => setSignUpModal(true)}
          >
            Sign up
          </Button>

          <Button
            style={{
              height: "40px",
              margin: "auto",
              marginLeft: "-180px",
              backgroundColor: "#9328C2",
              color: "yellow",
            }}
            onClick={() => setModalShow(true)}
          >
            Login
          </Button>
        </div>
        </div> }
   
       
        <Signin setuser={setuser} setvisible={handlePlayAcess} show={modalShow} onHide={() => setModalShow(false)} />
        <SignUp setSignUp={handleSignUpSuccess} show={SignUpModal} onHide={() => setSignUpModal(false)} />
      </Card>
      </div>
    </div>
  );
}

export default Home;
