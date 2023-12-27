import { useState } from "react"
import Inputs from "../../components/inputs"

function Upload() {

  const [inputs, setInputs] = useState({
    video: {name: '동영상(MP4)', isPlural: false, isInput: true, type: 'file', addDataName: 'video', inputValue: ''},
    poster: {name: '영화 포스터(썸네일)', isPlural: false, isInput: true, type: 'file', addDataName: 'poster', inputValue: ''},
    subtitle: {name: '자막', isPlural: false, isInput: true, type: 'file', addDataName: 'subtitle', inputValue: ''},
    title: {name: '영화 제목', isPlural: false, isInput: true, type: 'default', addDataName: 'title', inputValue: ''},
    summary: {name: '줄거리', isPlural: false, isInput: false, type: 'textarea', addDataName: 'summary', inputValue: ''},
    directors: {name: '감독', isPlural: true, isInput: true, type: 'default', addDataName: 'directors', inputValue: ''},
    scenarios: {name: '각본', isPlural: true, isInput: true, type: 'default', addDataName: 'scenarios', inputValue: ''},
    actors: {name: '출연진', isPlural: true, isInput: true, type: 'default', addDataName: 'actors', inputValue: ''},
    genres: {name: '장르', isPlural: true, isInput: false, type: 'select', addDataName: 'genres', inputValue: '', selectMenus: ['로맨스', '코미디', '액션', '느와르', '스릴러', '공포', '드라마', '판타지', 'SF']},
    rating: {name: '관람등급', isPlural: false, isInput: false, type:'select', addDataName: 'rating', inputValue: '', selectMenus: ['전체관람가', '12세이상 관람가', '15세이상 관람가', '청소년 관람불가']},
    specialNote: {name: '특이사항', isPlural: false, isInput: false, type: 'textarea', addDataName: 'specialNote', inputValue: ''},
  })

  const [addedDatas, setAddedDatas] = useState({
    video: '',
    poster: '',
    subtitle: '',
    title: '',
    summary: '',
    directors: [],
    scenarios: [],
    actors: [],
    genres: [],
    rating: '',
    specialNote: ''
  })

  return (
    <div className="upload">
      <h1>영화 등록 신청</h1>
      <Inputs inputs={inputs} setInputs={setInputs} addedDatas={addedDatas} setAddedDatas={setAddedDatas} />
      <button className="uploadBtn" onClick={() => {console.log(addedDatas)}}>영화 등록 신청</button>
    </div>
  )
}

export default Upload;