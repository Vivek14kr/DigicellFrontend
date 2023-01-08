import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { loadData } from './localStorage'
import Alert from 'react-bootstrap/Alert';

function AdminPanel() {
  const [visible, setVisible] = useState(false)
  let token = loadData("token")
    let [finaldata, setFinalData] = useState([])
    const [form, setForm] = useState([])
    const [correct, setCorrect] = useState([])
    const handlePlayAcess = () => {
    
      
      setVisible(true)
   
       setTimeout(()=>{
          setVisible(false)
        },2000)
     
    } 
    const handlePost = async()=>{

      let obj = {
        "questions":finaldata
      }


      
      try {
        const response = await fetch("https://itchy-teddy-goat.cyclic.app/quizzes", {
           method: "POST",
           body: JSON.stringify(obj),
           headers: {
             "Content-Type": "application/json",
             "Authorization":`Bearer ${token}`
           },
         })
         if (response.ok){
           const res = await response.json()
          handlePlayAcess()
         }else {
           const error = await response.json();
           alert("no")
         }
       
         
       } catch (error) {
         console.log(error," yo")
       }
    }

    const handleSubmit = ()=>{
      

        let {difficulty, text, options1, options2, options3, options4} = form;

        let options = [options1, options2, options3, options4];

        let obj = {
            "difficulty":difficulty,
            "text":text,
            "options":options,
            "correct":correct
        }
        console.log(obj, "check obj")
        let final = finaldata
        final.push(obj)
        console.log(final, " this is final")
        setFinalData(final)
        setPage(page + 1);
        setForm([])
        setCorrect([])
    }
    
   const handleRegisterChange = ({target: {name, value}})=>{
    

    if (name.includes("correct")){
        let correctdata = correct;

        correctdata.push(Number(value));
        setCorrect(correctdata)
    }else {
        setForm({
            ...form, 
            [name] : value,
        });
    }

   
    
   }
   console.log(form)
console.log(finaldata, " line 80")
    const [page, setPage] = useState(0); // initialize page to 0
    const cardsPerPage = 1; // number of cards to display per page
  
    const handleNextPage = () => {
  
    };
  
    const handlePrevPage = () => {
      setPage(page - 1);
    };
  
    const cardsToRender = [0,1,2,3,4,5,6,7,8,9].slice(page * cardsPerPage, (page + 1) * cardsPerPage);
  return (
    <div style={{height:"1000px"}}>
         <Alert key={"primary1"} variant={"primary"} show={visible} >
        Question Posted
      </Alert>

    <h1 style={{color:"yellow", padding:"50px"}}>Add Questions</h1> 
    {cardsToRender.map((item, i)=>(
    <Card 
    key={item + "+"+ i}
    style={{
        
      width: "80%",
      textAlign: "left",
      padding: "20px",
      margin: "auto",
      borderRadius: "20px",
      backgroundColor: "#FDFF16",
    }}
  >
    <h1 style={{color:"#6B199F"}}>{page + 1}/10</h1>
    <div style={{border:"20px solid #6B199F", borderRadius:"20px", padding:"80px"}}>
       <Form>
      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Difficulty</Form.Label>
        <Form.Control onChange={handleRegisterChange} name="difficulty" type="number" placeholder="Enter Difficulty Number" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Question</Form.Label>
        <Form.Control onChange={handleRegisterChange} name="text"  type="text" placeholder="Enter Question" />
      </Form.Group>
   <div style={{display:"flex"}}>
      <Form.Group className="mb-2" controlId="formBasicText" style={{padding:"30px"}}>
        <Form.Label>Option 1</Form.Label>
        <Form.Control onChange={handleRegisterChange} name="options1"  type="text" placeholder="Enter Option 1" />
      </Form.Group>     <Form.Group className="mb-2" controlId="formBasicText" style={{padding:"30px"}}>
        <Form.Label>Option 2</Form.Label>
        <Form.Control onChange={handleRegisterChange} name="options2"  type="text" placeholder="Enter Option 2" />
      </Form.Group>     <Form.Group className="mb-2" controlId="formBasicText" style={{padding:"30px"}}>
        <Form.Label>Option 3</Form.Label>
        <Form.Control onChange={handleRegisterChange} name="options3"  type="text" placeholder="Enter Option 3" />
      </Form.Group>     <Form.Group className="mb-2" controlId="formBasicText" style={{padding:"30px"}}>
        <Form.Label>Option 4</Form.Label>
        <Form.Control onChange={handleRegisterChange} name="options4"  type="text" placeholder="Enter Option 4" />
      </Form.Group>
      </div>
      <Form.Group className="mb-3" controlId="formBasicText">
      <Form.Label>Correct Answer</Form.Label>
      <Form.Check 
          onChange={handleRegisterChange} name="correct1" 
          type={'checkbox'}
          id={`default-checkbox`}
          label={`1`}
          value={1}
        />
          <Form.Check 
          onChange={handleRegisterChange} name="correct2" 
          type={'checkbox'}
          id={`default-checkbox`}
          label={`2`}
          value={2}
        />  <Form.Check 
        onChange={handleRegisterChange} name="correct3" 
        type={'checkbox'}
        id={`default-checkbox`}
        label={`3`}
        value={3}
      />  <Form.Check 
      onChange={handleRegisterChange} name="correct4" 
      type={'checkbox'}
      id={`default-checkbox`}
      label={`4`}
      value={4}
    />

      </Form.Group>
    
        <Button variant="primary" style={{backgroundColor:"#6B199F", color:"yellow"}} onClick={handleSubmit}>
        Submit
      </Button>

    </Form>
    </div>
  </Card>
    ))} 
     <h3>Total Question: {page}</h3>
      {page+ 1== 11?<Button onClick={handlePost}>
        Post Questions
      </Button>:""}
   
  
  </div>
  )
}

export default AdminPanel