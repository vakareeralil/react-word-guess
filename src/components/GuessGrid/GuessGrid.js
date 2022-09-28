import React, {useState, useRef, useEffect} from "react"
import "./GuessGrid.css"

const GRID_SIZE = 5

const GuessGrid = ({answer, setIsWordGuessed, handleGridComplete}) => {
  const [currentWord, setCurrentWord] = useState("")
  const inputRefs = useRef([])
  const [result, setResult] = useState([])
  const updateWord = (value, index) => {
    setCurrentWord((previousState) => {
      return `${previousState}${value}`
    })
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
          value={currentWord[i] || ""}
          className={computeClasses(i)}
          onChange={(e) => updateWord(e.target.value, i)}
          disabled={i < currentWord.length}
        />
      )
    }
    return inputArray
  }

  useEffect(
    function onGridFill() {
      const currentWordLength = currentWord.length

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
          setIsWordGuessed(true)
        }
        return result
      }

      if (currentWordLength === GRID_SIZE) {
        setResult(checkGridValue(currentWord))
        handleGridComplete()
      } else {
        inputRefs.current[currentWordLength].focus()
      }
    },
    [answer, currentWord, handleGridComplete, setIsWordGuessed]
  )

  return formGrid()
}

export default GuessGrid
