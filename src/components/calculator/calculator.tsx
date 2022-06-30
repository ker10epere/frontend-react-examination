import Output from './output'

import ButtonLayout from './button.layout'
import { CalculatorProvider } from '../../stores/calculator.store'

export default () => {
  // 7	8	9	+
  // 4	5	6	-
  // 1	2	3	*
  // AC .	=	/

  return (
    <div className='container'>
      <CalculatorProvider>
        <Output />
        <ButtonLayout />
      </CalculatorProvider>
    </div>
  )
}
