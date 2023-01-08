import React, { useState ,useRef} from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import * as d3 from 'd3';
import Card from "react-bootstrap/Card";
import Bug from "../assets/bug.png";
import ScoresGraph from "./Graph";
import { useEffect } from "react";
function Quiz({questionData, setQuestion}) {
  const [results, setResults] = useState([
    { correct: true }, // correct answer, score +5
    { correct: false }, // incorrect answer, score -2
    { correct: true }, // correct answer, score +5
    { correct: true }, // correct answer, score +5
    { correct: false }, // incorrect answer, score -2
  ]);
  const containerRef = useRef(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(4);
  const [showScore, setShowScore] = useState(false);
  const [isCorrect, setisCorrect] = useState();
 
  const [score, setScore] = useState(0);
  const [answerSelected, setAnswerSelected] = useState([])
  const [count, setCount] = useState(1);

  // const [questions, setQuestion] = useState([])
  
  

    useEffect( ()=>{

      getData()
      
      },[])
      
const getData = ()=>{
  fetch('https://itchy-teddy-goat.cyclic.app/quizzes/random')
  .then((response) => response.json())
  .then((data) => {
    console.log(data, 'Dfijdhiedhgi');
    setQuestion(data);
  })
  .catch((err) => {});
}

  const handleAnswerChange = (e) =>{
    let arr = answerSelected;
    arr.push(Number(e.target.value))
  setAnswerSelected(arr);

  }

  const playAgain = ()=>{
    setCurrentQuestion(4);
        setAnswerSelected([]);
        setScore(0)
        setCount(1)
    setShowScore(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(answerSelected, " dc", count, currentQuestion)
    let correctornot = false;

    if (count == 11){
        
        setShowScore(true)
    }
    
  
    if (answerSelected){
        for (let k = 0; k < answerSelected.length; k++){
          console.log("printing")
            if (questionData[currentQuestion].correct.includes(answerSelected[k])){
                setScore(score + 5);
                correctornot=true
            }else {
                setScore(score - 2);
                correctornot=false;
                if(currentQuestion == 0){
                  setShowScore(true)
                }
            }
        }
    }


let k = 0;
if (correctornot){
 k = currentQuestion;
 k = k + 1;


}else {
  k =  currentQuestion;
  k = k - 1;
}

 
    setCount(()=>{
        return count + 1
    })
    setAnswerSelected([])
    setCurrentQuestion(k)
          
    
    // // Make a POST request to the backend to save the quiz answers
    // axios
    //   .post(`/api/quizzes/${props.match.params.id}` / answers, {
    //     answers: quiz.questions.map((question) => question.answer),
    //   })
    //   .then(() => {
    //     props.history.push("/quizzes");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

//   useEffect(()=>{
//     if (!results) {
//       return;
//     }

//     const data = results.map((result, index) => ({
//       attempt: index + 1,
//       score: result.correct ? 5 : -2,
//     }));
//     const margin = { top: 20, right: 20, bottom: 30, left: 50 };
//   const width = 960 - margin.left - margin.right;
//   const height = 500 - margin.top - margin.bottom;

//   const x = d3.scaleLinear().rangeRound([0, width]);
//   const y = d3.scaleLinear().rangeRound([height, 0]);
  
//   const line = d3.line()
//     .x(d => x(d.attempt))
//     .y(d => y(d.score));

//   const svg = d3.select(containerRef.current)
//     .append('svg')
//       .attr('width', width + margin.left + margin.right)
//       .attr('height', height + margin.top + margin.bottom)
//     .append('g')
//       .attr('transform', `translate(${margin.left},${margin.top})`);

//   x.domain(d3.extent(data, d => d.attempt));
//   y.domain(d3.extent(data, d => d.score));

// svg.append('g')
//   .attr('transform', `translate(0,${height})`)
//   .call(d3.axisBottom(x))
//   .select('.domain')
//   .remove();

// svg.append('g')
//   .call(d3.axisLeft(y))
//   .append('text')
//     .attr('fill', '#000')
//     .attr('transform', 'rotate(-90)')
//     .attr('y', 6)
//     .attr('dy', '0.71em')
//     .attr('text-anchor', 'end')
//     .text('Score');

// svg.append('path')
//   .datum(data)
//   .attr('fill', 'none')
//   .attr('stroke', 'steelblue')
//   .attr('stroke-linejoin', 'round')
//   .attr('stroke-linecap', 'round')
//   .attr('stroke-width', 1.5)
//   .attr('d', line);
//   },[])
  
console.log("current score: " , score)
  //   const handleAnswerChange = (e, index) => {
  //     const newQuestions = [...quiz.questions];
  //     newQuestions[index].answer = e.target.value;
  //     setQuiz({ ...quiz, questions: newQuestions });
  //   };
  const handleAnswerOptionClick = (isCorrect) => {
  
  };
  console.log(questionData, " line 232")
  return (
    showScore ? (
        <div className='score-section' style={{margin:"auto", textAlign:"center",    alignItems: "center",
        justifyContent: "center",}}>
             <div style={{ marginTop: "100px" }}>
        <img src={Bug} alt="bug" />
      </div >
      <div style={ { borderRadius:"20px", margin:"auto", textAlign:"center",    alignItems: "center",
        justifyContent: "center",width:"400px", backgroundColor:"yellow", }}>
            <p style={{padding:"30px", fontSize:"30px", fontWeight:"bold", fontFamily:"cursive" , color:"#8620B7"}}>Your score was : {score}</p>
            </div>
         
            <Button style={{backgroundColor:"yellow", color:"#8620B7"}} onClick={playAgain}>Play Again</Button>
           
        </div>
    ) :
    <div>
    {questionData.length > 1?
      <div style={{ display: "flex", height:"fit-content" }}>
      <div>
      <div style={{ marginTop: "100px" }}>
        <img src={Bug} alt="bug" />
      </div>
      {/* <div style={{width:"50px", height:"50px"}} ref={containerRef}></div> */}
      </div>

      <Card
        style={{
          width: "50%",
          textAlign: "left",
          padding: "50px",
          margin: "10%",
          borderRadius: "20px",
          border: "10px solid yellow",
          color: "yellow",
          backgroundColor: "#8620B7",
          alignItems: "center",
          textAlign: "left",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "180px",
            border: "5px solid #8620B7",
            backgroundColor: "yellow",
            position: "absolute",
            top: "-20%",
            color: "black",
            textAlign: "center",
          }}
        >
          <p
            style={{ fontSize: "30px", fontWeight: "bold", paddingTop: "20px", color:"#8620B7" }}
          >
            {count}/{10}
          </p>
        </div>

        <Container style={{ textAlign: "center" }}>
          <Row className="justify-content-md-center">
            <Col md="auto" style={{ textAlign: "left" }}>
              <Form  style={{ textAlign: "left" , alignContent:"center", alignItems:"center",}}>
                {showScore ? (
                  <div style={{height:"500px", width:"500px"}}>
                    You scored {score} out of {questionData.length}
                  </div>
                ) : (
                  <>
                  <div>
                    <span> <p>Difficulty Level : <span style={{fontWeight:"bold"}}>{questionData[currentQuestion].difficulty}</span></p></span>
                 
                  </div>
                    <div style={{ width: "100%" }}>
                      <p
                        style={{
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: "25px",
                          color: "yellow",
                          textShadow: "10px",
                        }}
                      >
                        {questionData[currentQuestion].text}
                      </p>
                    </div>
                    <div>
                      {questionData[currentQuestion].options.map((option, i) => (
                        <div  
                        key={questionData[currentQuestion].text + "_" + i}
                        style={{
                             
                            fontSize: "25px",
                            color: "yellow",
                            textShadow: "10px",
                          }}>
                          <label
                          
                          
                          >
                            
                          </label>
                            <input
                           
                              type="checkbox"
                              style={{margin:"10px", cursor:"pointer"}}
                             
                              value={i}
                              onChange={(event) => handleAnswerChange(event)}
                           
                            />
                            {option}
                            </div>

                        
                      ))}
                    </div>
                    </>
                )}
           
    <div style={{width:"100%",  margin:"auto", alignItems:"center",  display: "flex"}}>
  <Button style={{margin:"auto" , backgroundColor:"yellow", color:"#8620B7" , fontSize:"30px", fontWeight:"bold", marginTop:"20px", borderRadius:"30px"}} onClick={handleSubmit}>Submit</Button>
</div>
         
                 
              </Form>
           
            </Col>
          </Row>
        </Container>
      </Card>
    </div>:""}
    </div>
  );
}

export default Quiz;
