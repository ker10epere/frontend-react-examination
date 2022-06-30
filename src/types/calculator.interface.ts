import { Commands, Digits, Operators } from './button.enum'
import { Dispatch, SetStateAction } from 'react'

export type CalculatorState<T> = [T, Dispatch<SetStateAction<T>>]

export type CommandState = CalculatorState<Commands>
export type DigitState = CalculatorState<Digits>
export type OperatorState = CalculatorState<Operators>
export type DisplayState = CalculatorState<string>

export interface UseCalculatorState {
  useCommand: () => CommandState
  useDigit: () => DigitState
  useOperator: () => OperatorState
  useDisplay: () => DisplayState
  prevValue: React.MutableRefObject<number | null>
}

export interface Calculator {
  useCommand?: () => CommandState
  useDigit?: () => DigitState
  useOperator?: () => OperatorState
  useDisplay?: () => DisplayState
  prevValue?: React.MutableRefObject<number | null>
}

export const keyChecker = <U>(
  buttonKey: unknown,
  enumType: U
): buttonKey is U => {
  return Object.values(enumType).includes(buttonKey as U)
}
