import React, {useState} from "react"
import Start from "./Start"
import Question from "./Question"

export default function App() {

  const [startPage, setStartPage] = useState(true)

  function begin() {
    setStartPage(prev => !prev)
  }

  return (
    <div>
      {startPage ? <Start begin={begin} /> : <Question />}
    </div>   
  )
}
