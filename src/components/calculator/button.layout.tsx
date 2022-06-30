import { Fragment, MouseEvent } from 'react'
import {
  calculatorKeys,
  Commands,
  Digits,
  Operators,
} from '../../types/button.enum'
import Button from './button'
import { useCalculator } from '../../stores/calculator.store'
import { keyChecker } from '../../types/calculator.interface'

export default () => {
  return (
    <Fragment>
      <Button buttonKey={Digits.SEVEN} />
      <Button buttonKey={Digits.EIGHT} />
      <Button buttonKey={Digits.NINE} />
      <Button buttonKey={Operators.PLUS} />
      <Button buttonKey={Digits.FOUR} />
      <Button buttonKey={Digits.FIVE} />
      <Button buttonKey={Digits.SIX} />
      <Button buttonKey={Operators.MINUS} />
      <Button buttonKey={Digits.ONE} />
      <Button buttonKey={Digits.TWO} />
      <Button buttonKey={Digits.THREE} />
      <Button buttonKey={Operators.MULTIPLY} />
      <Button buttonKey={Commands.CLEAR} />
      <Button buttonKey={Digits.ZERO} />
      <Button buttonKey={Commands.EVALUATE} />
      <Button buttonKey={Operators.DIVIDE} />
    </Fragment>
  )
}
