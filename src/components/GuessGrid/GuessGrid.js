import React, {useState, useRef} from "react"
import "./GuessGrid.css"

const GuessGrid = ({answer, setGameOver}) => {
  const GRID_SIZE = 5
  const [currentWord, setCurrentWord] = useState("")
  const inputRefs = useRef([])
  const [result, setResult] = useState([])
  const updateWord = (value, index) => {
    setCurrentWord((previousState) => {
      const newWord = `${previousState}${value}`
      if (newWord.length === GRID_SIZE) {
        setResult(checkGridValue(newWord))
      } else {
        inputRefs.current[index + 1].focus()
      }
      return newWord
    }).then(() => {})
  }

  const checkGridValue = (value) => {
    const valueArray = value.toLowerCase().split("")
    const result = []
    for (let i = 0; i < valueArray.length; i += 1) {
      const entry = valueArray[i]
      if (entry === answer[i].toLowerCase()) {
        result[i] = 1
      } else {
        if (answer.indexOf(entry) === -1) {
          result[i] = 0
        } else {
          result[i] = 2
        }
      }
    }
    if (result.every((value) => value === 1)) {
      setGameOver(true)
    }
    return result
  }

  const computeClasses = (index) => {
    const defaultClass = "GuessGrid__input"

    if (result[index] === 1) {
      return `${defaultClass} ${defaultClass}--success`
    } else if (result[index] === 2) {
      return `${defaultClass} ${defaultClass}--misplaced`
    } else if (result[index] === 0) {
      return `${defaultClass} ${defaultClass}--error`
    } else {
      return defaultClass
    }
  }

  const formGrid = () => {
    const inputArray = []
    for (let i = 0; i < GRID_SIZE; i += 1) {
      inputArray.push(
        <input
          key={`guess-grid-input-${i}`}
          ref={(ref) => inputRefs.current.push(ref)}
          type="text"
          value={currentWord[i]}
          className={computeClasses(i)}
          onChange={(e) => updateWord(e.target.value, i)}
          disabled={i < currentWord.length}
        />
      )
    }
    return inputArray
  }

  return formGrid()
}

export default GuessGrid