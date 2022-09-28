import {useState} from "react"
import GuessGrid from "./components/GuessGrid"

import "./App.css"

function App() {
  const GUESS_TIMES = 6
  const CORRECT_ANSWER = "react".split("")
  const [isGameOver, setGameOver] = useState(false)

  const renderGuessGrid = () => {
    const guessGrids = []
    for (let i = 0; i < GUESS_TIMES; i += 1) {
      guessGrids.push(
        <div className="GuessGrid__wrapper" key={`guess-grid-wrapper-${i}`}>
          <GuessGrid answer={CORRECT_ANSWER} setGameOver={setGameOver} />
        </div>
      )
    }
    return guessGrids
  }

  return (
    <div className="GuessGame">
      {isGameOver ? (
        <div className="GuessGame__answer-found">{`Great! You have found the right answer: ${CORRECT_ANSWER.join(
          ""
        )}`}</div>
      ) : (
        renderGuessGrid()
      )}
    </div>
  )
}

export default App
