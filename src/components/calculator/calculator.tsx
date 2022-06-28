export default () => {
  // 7	8	9	+
  // 4	5	6	-
  // 1	2	3	*
  // AC .	=	/

  return (
    <div className='container'>
      <div className='screen'>
        <span className='operator'></span>
        <span className='current-value'>12312312312312312312</span>
      </div>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>+</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>-</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>AC</button>
      <button>.</button>
      <button>=</button>
      <button>/</button>
    </div>
  )
}
