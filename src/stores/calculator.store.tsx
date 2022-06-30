import {
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react'
import {
  calculatorKeys,
  Commands,
  Digits,
  Operators,
} from '../types/button.enum'
import {
  Calculator,
  CommandState,
  DigitState,
  DisplayState,
  keyChecker,
  OperatorState,
  UseCalculatorState,
} from '../types/calculator.interface'

interface UseCalculator {
  output: Output
  setKey: (key: calculatorKeys) => void
}

interface Output {
  digit: Digits
  operator: Operators
  command: Commands
  display: string
}

interface CalculatorVars {
  key: string
  digit?: Digits
  operator?: Operators
  command?: Commands
  display?: string
  prevValue?: React.MutableRefObject<number | null>
}

const CalculatorContext = createContext<Calculator | undefined>(undefined)

const CalculatorProvider = ({ children }: PropsWithChildren) => {
  const prevValue = useRef<number | null>(null)
  const commandState = useState(Commands.CLEAR)
  const digitState = useState(Digits.ZERO)
  const operatorState = useState(Operators.NULL_OP)
  const displayState = useState('0')

  return (
    <CalculatorContext.Provider
      value={{
        useCommand: (): CommandState => commandState,
        useDigit: (): DigitState => digitState,
        useOperator: (): OperatorState => operatorState,
        useDisplay: (): DisplayState => displayState,
        prevValue,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  )
}

const useCalculator = (): UseCalculator => {
  const ctx = useContext(CalculatorContext)
  if (typeof ctx === 'undefined') throw new Error('context undefined')

  const { useCommand, useDigit, useOperator, useDisplay, prevValue } = ctx

  if (typeof useDigit === 'undefined') throw new Error('useDigit undefined')
  if (typeof useOperator === 'undefined')
    throw new Error('useOperator undefined')
  if (typeof useCommand === 'undefined') throw new Error('useCommand undefined')
  if (typeof useDisplay === 'undefined') throw new Error('useDisplay undefined')
  if (typeof prevValue === 'undefined') throw new Error('prevValue undefined')

  return {
    output: output({
      useCommand,
      useDigit,
      useOperator,
      useDisplay,
      prevValue,
    }),
    setKey: keySetter({
      useCommand,
      useDigit,
      useOperator,
      useDisplay: useDisplay,
      prevValue,
    }),
  }
}

const output = ({
  useDigit,
  useOperator,
  useCommand,
  useDisplay,
}: UseCalculatorState): Output => {
  const [digit] = useDigit()
  const [operator] = useOperator()
  const [command] = useCommand()
  const [display] = useDisplay()
  return {
    digit,
    operator,
    command,
    display,
  }
}

const keySetter =
  ({
    useOperator,
    useDisplay,
    prevValue,
  }: UseCalculatorState): ((key: calculatorKeys) => void) =>
  (key: calculatorKeys) => {
    const [operator, setOperator] = useOperator()
    const [display, setDisplay] = useDisplay()

    if (keyChecker(key, Digits)) {
      digitHandler(setDisplay, { display, key })
    } else if (keyChecker(key, Commands)) {
      commandHandler(setOperator, setDisplay, {
        key,
        prevValue,
        operator,
        display,
      })
    } else if (keyChecker(key, Operators)) {
      operatorHandler(setOperator, setDisplay, { display, key, prevValue })
    }
  }

const commandHandler = (
  setOperator: React.Dispatch<React.SetStateAction<Operators>>,
  setDisplay: React.Dispatch<React.SetStateAction<string>>,
  { display, key, prevValue, operator }: CalculatorVars
) => {
  if (typeof display === 'undefined') throw new Error('display undefined')
  if (typeof prevValue === 'undefined') throw new Error('prevValue undefined')
  if (typeof operator === 'undefined') throw new Error('operator undefined')

  const command = key as Commands

  switch (command) {
    case Commands.CLEAR:
      prevValue.current = null
      setOperator(Operators.NULL_OP)
      setDisplay(Digits.ZERO)
      break
    case Commands.EVALUATE:
      const prevValueContainer = prevValue.current
      if (prevValueContainer === null) {
        setOperator(Operators.NULL_OP)
        return
      }

      setOperator(Operators.NULL_OP)
      setDisplay((prev) => {
        const values = `${operatorEvaluator(
          operator,
          prevValueContainer,
          parseInt(prev)
        )}`.substring(0, 13)

        const indexOfDecimal = values.indexOf('.')

        if (indexOfDecimal !== -1 && values.length > 13) {
          const twoPrecisionIndex = indexOfDecimal + 2
          return values.substring(0, twoPrecisionIndex)
        }

        if (values.length > 13) {
          return NaN.toString()
        }
        return values
      })
      prevValue.current = null
      break
  }
}

const operatorHandler = (
  setOperator: React.Dispatch<React.SetStateAction<Operators>>,
  setDisplay: React.Dispatch<React.SetStateAction<string>>,
  { display, key, prevValue }: CalculatorVars
) => {
  if (typeof prevValue === 'undefined') throw new Error('display undefined')

  if (typeof display === 'undefined') throw new Error('display undefined')

  const operator = key as Operators

  console.log(prevValue.current, operator, display)
  if (prevValue.current === null) {
    prevValue.current = parseInt(display)
    setOperator((): Operators => operator)
    setDisplay(() => Digits.ZERO)
  } else {
    prevValue.current = operatorEvaluator(
      operator,
      prevValue.current,
      parseInt(display)
    )
    setOperator((): Operators => operator)
    setDisplay(() => Digits.ZERO)
  }
}

const operatorEvaluator = (
  operator: Operators,
  a: number,
  b: number
): number => {
  switch (operator) {
    case Operators.PLUS:
      return a + b
    case Operators.MINUS:
      return a - b
    case Operators.MULTIPLY:
      return a * b
    case Operators.DIVIDE:
      return a / b
    case Operators.NULL_OP:
      return NaN
  }
}

const digitHandler = (
  setDisplay: React.Dispatch<React.SetStateAction<string>>,
  { display, key }: CalculatorVars
) => {
  if (typeof display === 'undefined') throw new Error('display undefined')
  displayHandler(setDisplay, { display, key })
}

const displayHandler = (
  setDisplay: React.Dispatch<React.SetStateAction<string>>,
  { display, key }: CalculatorVars
) => {
  if (typeof display === 'undefined') throw new Error('display undefined')

  if (display === Digits.ZERO) return setDisplay(key)

  if (display.length >= 14) return

  if (isNaN(parseInt(display))) return
  setDisplay((prev) => {
    return `${prev}${key}`
  })
}

export { useCalculator, CalculatorProvider }
