import { MouseEvent } from 'react'
import { useCalculator } from '../../stores/calculator.store'
import { calculatorKeys } from '../../types/button.enum'

interface ButtonProps {
  buttonKey: calculatorKeys
}

export default function ({ buttonKey }: ButtonProps) {
  const { setKey } = useCalculator()

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    setKey(buttonKey)
  }
  return <button onClick={clickHandler}>{buttonKey}</button>
}
