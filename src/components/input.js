function Input(props) {

  return(
    <div className="inputBox">
      <span className="inputName">{props.inputName}</span>
      <input type={props.inputType} value={props.inputValue} onChange={(e) => {props.inputValue(e.target.value)}} />
    </div>
  )
}

export default Input;