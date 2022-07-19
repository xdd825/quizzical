import React, {useState, useEffect} from "react"
import Confetti from 'react-confetti'

// fetch data from opentdb api
// then set in to quizArray

export default function Question() {

    const [quizArray, setQuizArray] = useState([])
    const [endGame, setEndGame] = useState(false)
    const formatQuestionArray = []
    const selectOptionArray = {"section-0": "", "section-1": "", "section-2": "", "section-3": "", "section-4": ""}
    const [count, setCount] = useState(0)

    useEffect(() => {
        async function getQuestion() {
            const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=base64")
            const data = await response.json()
            setQuizArray(data.results)
        }
        getQuestion()
    }, [])

    function b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
    }

    function formatQuestion() {
        quizArray.map((quiz) => {
            formatQuestionArray.push({
                "question": b64DecodeUnicode(quiz.question),
                "correctAnswer": b64DecodeUnicode(quiz.correct_answer),
                "option1": b64DecodeUnicode(quiz.incorrect_answers[0]),
                "option2": b64DecodeUnicode(quiz.incorrect_answers[1]),
                "option3": b64DecodeUnicode(quiz.incorrect_answers[2])
            })
        })
        return formatQuestionArray
    }

    formatQuestion()

    console.log(formatQuestionArray)

    function getSelectOption(event) {
        selectOptionArray[event.target.name] = event.target.value
    }

    function randomSort(x) {
        const array = x;
        const newArray = [];
        for (let i = 0; i < 4; i++) {
          let randomNumber = Math.floor(Math.random() * (4 - i));
          
          newArray.push(array[randomNumber])
          
          array.splice(randomNumber, 1)
          
        }
        return newArray
      }

    // console.log(document.querySelector('input[type="radio"]:checked').style.backgroundColor)

    function checkAnswer() {
        let sum = 0;
        for (let i = 0; i < formatQuestionArray.length; i++) {
            if (selectOptionArray[`section-${i}`] == formatQuestionArray[i].correctAnswer) {
                sum += 1;
                // document.querySelector('input[type="radio"]:checked + label ').style.backgroundColor = "#94D7A2"
            }
        }
        console.log(sum)
        setEndGame(true)
        setCount(sum)
    }

    function reStart() {
        for (let i = 0; i < 5; i++) {
            document.getElementsByName(`section-${i}`).checked
        }
        setEndGame(false)
        setCount(0)
    }

    const renderQuestion = formatQuestionArray.map((item, index)=> {
        const itemArray = randomSort([item.correctAnswer, item.option1, item.option2, item.option3])
        return (
            <div key={index} className="question--section">
                <h2>{item.question}</h2>
                <div className="radio-toolbar">
                    <input type="radio" id={itemArray[0]} name={`section-${index}`} onChange={getSelectOption} value={itemArray[0]} />
                    <label htmlFor={`option1-${index}`}>{itemArray[0]}</label>

                    <input type="radio" id={itemArray[1]} name={`section-${index}`} onChange={getSelectOption} value={itemArray[1]} />
                    <label htmlFor={`option2-${index}`}>{itemArray[1]}</label>

                    <input type="radio" id={itemArray[2]} name={`section-${index}`} onChange={getSelectOption} value={itemArray[2]} />
                    <label htmlFor={`option3-${index}`}>{itemArray[2]}</label> 

                    <input type="radio" id={itemArray[3]} name={`section-${index}`} onChange={getSelectOption} value={itemArray[3]} />
                    <label htmlFor={`option4-${index}`}>{itemArray[3]}</label> 
                </div>
                <hr />
            </div>
        )
    })


    return (
        <div className="question--page">
            {renderQuestion}
            {
                endGame 
                ? (
                    <div className="endGame">
                        <p>You scored {count}/5 correct answers</p>
                        <button className="btn--checkAnswer" onClick={reStart}>Play again</button>
                        {count === 5 &&<Confetti /> } 
                    </div> 
                )
                : <button className="btn--checkAnswer" onClick={checkAnswer}>Check answers</button>
            }
        </div>
    )
}