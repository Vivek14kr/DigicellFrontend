import logo from "./logo.svg";
import "./App.css";
import Button from "react-bootstrap/Button";
import react, {useState} from "react";
import Form from "react-bootstrap/Form";
import { Routes, Route } from "react-router-dom";
import Card from "react-bootstrap/Card";
import NavBar from "./components/NavBar";
import Image from 'react-bootstrap/Image';
import Bug from "./assets/bug.png"
import Panda from "./assets/panda.png"
import Signin from "./components/Signin";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SignUp from "./components/SignUp";
import Quiz from "./components/Quiz";
import Home from "./components/Home"
import Admin from "./components/Admin";
import AdminPanel from "./components/AdminPanel";
import { PrivateRoute } from "./components/privateRoute";
import { AdminPrivateRoute } from "./components/AdminPrivateRoute";
function App() {
  const [currentUser, setCurrentUser] = useState("")
  let [loggedIn, setLoggedIn] = useState(false)
  const [questionData, setQuestion] = useState( [
    {
    difficulty: 1,
    text: "What is the capital of France?",
    options: ["Paris", "London", "New York", "Tokyo"],
    correct: [0]
    },
    {
    difficulty: 2,
    text: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: [2]
    },
    {
    difficulty: 3,
    text: "Which of these is a type of mammal?",
    options: ["Lizard", "Octopus", "Whale", "Penguin"],
    correct: [2]
    },
    {
    difficulty: 4,
    text: "Which of these is not a type of bird?",
    options: ["Sparrow", "Dolphin", "Pigeon", "Penguin"],
    correct: [1]
    },
    {
    difficulty: 5,
    text: "What is the highest mountain in the world?",
    options: ["Mount Everest", "K2", "Kilimanjaro", "The Andes"],
    correct: [0]
    },
    {
    difficulty: 6,
    text: "What is the currency of Japan?",
    options: ["Yen", "Dollar", "Euro", "Pound"],
    correct: [0]
    },
    {
    difficulty: 7,
    text: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correct: [2]
    },
    {
    difficulty: 8,
    text: "What is the most populous country in the world?",
    options: ["India", "China", "United States", "Indonesia"],
    correct: [1]
    },{
      difficulty: 9,
      text: "Which of the following is not a type of reptile?",
      options: ["Turtle", "Snake", "Lizard", "Penguin"],
      correct: [3]
      },
      {
      difficulty: 10,
      text: "Who invented the steam engine?",
      options: ["Thomas Edison", "Henry Ford", "James Watt", "Nikola Tesla"],
      correct: [2]
      }
      
      
      
      
    ])
 
  return (
    <div className="App" style={{backgroundImage:`url("https://media.istockphoto.com/photos/purple-defocused-blurred-motion-abstract-background-picture-id1273929462?b=1&k=20&m=1273929462&s=612x612&w=0&h=SiJ-IIlRT_GMs_UGFMaMcHhIosKvvvMnb0PNE3wGk6k=")` 
    ,height: "fit-content", backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover" , paddingBottom:"100px"}}>
      <NavBar user={currentUser} setloggedin={setLoggedIn} setuser={setCurrentUser}/>
     <Routes>
      <Route path="/" element={<Home setuser={setCurrentUser} loggedin={loggedIn} setloggedin={setLoggedIn}/>}></Route>
      <Route path="/quiz" element={
      <PrivateRoute>
      <Quiz questionData={questionData} setQuestion={setQuestion}/>
      </PrivateRoute>}></Route>
      <Route path="/admin" element={<Admin/>}></Route>
      <Route path="/adminpanel" element={
      <AdminPrivateRoute>
      <AdminPanel/></AdminPrivateRoute>}></Route>

     </Routes>
    </div>
  );
}

export default App;
