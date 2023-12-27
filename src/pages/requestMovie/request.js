import { useState } from "react"
import Inputs from "../../components/inputs"

function Request() {

  const [inputs, setInputs] = useState({
    title: {name: '제목', isPlural: false, isInput: true, type: 'default', addDataName: 'title', inputValue: ''},
    directors: {name: '감독', isPlural: true, isInput: true, type: 'default', addDataName: 'directors', inputValue: ''}
  })

  const [addedDatas, setAddedDatas] = useState({
    title: '',
    directors: []
  })

  return (
    <div className="upload">
      <h1>영화 요청</h1>
      <Inputs inputs={inputs} setInputs={setInputs} addedDatas={addedDatas} setAddedDatas={setAddedDatas} />
      <button className="uploadBtn" onClick={() => console.log(addedDatas)}>요청</button>
    </div>
  )
}

export default Request;