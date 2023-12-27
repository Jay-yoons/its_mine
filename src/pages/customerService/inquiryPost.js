import { useState } from "react"

function InquiryPost() {

  const [inquiryTitle, setInquiryTitle] = useState('')
  const [inquiryCategory, setInquiryCategory] = useState('선택하기')
  const [inquiryContent, setInquiryContent] = useState('')

  const post = () =>{
    if (inquiryCategory === '선택하기') alert('분류를 선택해주세요.');
    else console.log(inquiryTitle, inquiryCategory, inquiryContent);
  }

  return(
    <div className="inquiryPost">
      <div className="inputs">
        <div className="inputBox">
          <span className="inputName">제목</span>
          <input value={inquiryTitle} onChange={(e) => {setInquiryTitle(e.target.value)}}></input>
        </div>
        <div className="inputBox">
          <span className="inputName">분류</span>
          <select value={inquiryCategory} onChange={(e) => {setInquiryCategory(e.target.value)}}>
            <option key='선택하기' value='선택하기'>선택하기</option>
            <option key='계정' value='계정'>
              계정
            </option>
            <option key='결제' value='결제'>결제</option>
            <option key='영화 등록 문의' value='영화 등록 문의'>영화 등록 문의</option>
            <option key='오류' value='오류'>오류</option>
          </select>
        </div>
        <div className="inputBox">
          <textarea placeholder="1대1 문의 내용을 입력해주세요" value={inquiryContent} onChange={(e) => {setInquiryContent(e.target.value)}}></textarea>
        </div>
      </div>
      <button className="postBtn" onClick={post}>1대1 문의 등록</button>
    </div>
  )
}

export default InquiryPost;