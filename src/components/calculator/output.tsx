import { useCalculator } from '../../stores/calculator.store'
import { Operators } from '../../types/button.enum'

export default () => {
  const {
    output: { digit, operator, display },
  } = useCalculator()

  return (
    <div className='screen'>
      <span className='operator'>
        {operator === Operators.NULL_OP ? '' : operator}
      </span>
      <span className='value'>{display}</span>
    </div>
  )
}
