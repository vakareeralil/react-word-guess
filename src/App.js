import {useCallback, useState} from "react"
import GuessGrid from "./components/GuessGrid"

import "./App.css"

const GUESS_TIMES = 6
const CORRECT_ANSWER = "react".split("")

function App() {
  const [isWordGuessed, setIsWordGuessed] = useState(false)
  const [completedGridCount, setCompletedGridCount] = useState(0)

  const markGridComplete = useCallback(() => {
    setCompletedGridCount((previousValue) => previousValue + 1)
  }, [])

  const renderGuessGrid = () => {
    const guessGrids = []
    for (let i = 0; i < GUESS_TIMES; i += 1) {
      guessGrids.push(
        <div className="GuessGrid__wrapper" key={`guess-grid-wrapper-${i}`}>
          <GuessGrid
            answer={CORRECT_ANSWER}
            setIsWordGuessed={setIsWordGuessed}
            gridIndex={i}
            handleGridComplete={markGridComplete}
          />
        </div>
      )
    }
    return guessGrids
  }
  return (
    <main className="GuessGame">
      <h1 className="GuessGame__header">Guess The Word</h1>
      <section>
        {isWordGuessed ? (
          <div className="GuessGame__answer-found">{`Great! You have found the right answer: ${CORRECT_ANSWER.join(
            ""
          )}`}</div>
        ) : completedGridCount < GUESS_TIMES ? (
          renderGuessGrid()
        ) : (
          <div>Sorry! You failed to guess the right word</div>
        )}
      </section>
    </main>
  )
}

export default App
