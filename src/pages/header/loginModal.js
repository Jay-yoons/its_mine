import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function LoginModal(props) {
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [warnning, setWarnning] = useState(false);
  const [findMode, setFindMode] = useState(false);
  const [confirmEmail, setconfirmEmail] = useState(false);
  const [confirmPhone, setconfirmPhone] = useState(false)
  const navigate = useNavigate();
  const login = () => {
    axios.post('http://34.64.176.187:8090/member/signin', {mem_id: loginId, mem_pass: loginPw}, {"Content-Type": 'application/json'})
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {console.log(err)})
  }

  

  

  return (
    <div>
    <div className="modalOut" />
    <div className="loginModal">

      {
        findMode 
        ? 
        <button className="backBtn" onClick={() => {setFindMode(false)}}>
          <img className="backBtnIcon" src={process.env.PUBLIC_URL + '/assets/backBtnIcon.svg'} />
        </button>
        :
        null
      }

      {
        confirmEmail
        ?
        <button className="backBtn" onClick={() => {setconfirmEmail(false)}}>
          <img className="backBtnIcon" src={process.env.PUBLIC_URL + '/assets/backBtnIcon.svg'} />
        </button>
        :
        null
      }

      {
        confirmPhone
        ?
        <button className="backBtn" onClick={() => {setconfirmPhone(false)}}>
          <img className="backBtnIcon" src={process.env.PUBLIC_URL + '/assets/backBtnIcon.svg'} />
        </button>
        :
        null
      }
      

      <button className="closeBtn" onClick={() => {props.setLoginModal(false)}}>
        <img className="closeBtnIcon" src={process.env.PUBLIC_URL + '/assets/exitIcon.svg'} />
      </button>
      
      {
        confirmEmail ? (
          <div className="confirmEmailModal">
            이메일 인증
            <div className="userEmail">
              이메일
              <div className="email-container">
              {/* 이메일 입력 필드 */}
              <input type="text" placeholder="이메일" />
              <span> @ </span>
              <select>
                <option>example.com</option>
              </select>
              <button className="btn">인증번호 받기</button> 
              <div className="email-container">
                {/* 인증번호 입력 필드 */}
                <input type="text" placeholder="인증번호" />
                <button className="btn">인증</button>
              </div>
            </div>
            </div>
          </div>
        ) : (
          confirmPhone ? (
            // 전화번호 모달 내용
            <div className="confirmPhoneModal">
              전화번호 인증
              <div className="userPhone">전화번호</div>
              <div className="input-container">
                <input type="tel" placeholder="전화번호" />
              </div>
              <button className="btn">인증번호 받기</button> 
              <div className="input-container">
                {/* 인증번호 입력 필드 */}
                <input type="text" placeholder="인증번호" />
                <button className="btn">인증</button>
              </div>
            </div>
          ) : (
          
          findMode
          ?
          <div className="find">
            <div className="confirmBtns">
            <div className="confirmBtnBox">
              <button onClick={() => {setconfirmPhone(true)}}>
                <img src={process.env.PUBLIC_URL + '/assets/telephone.svg'} />
              </button>
              <div className="confirmWay">전화번호 인증</div>
            </div>

              <div className="confirmBtnBox">
                <button onClick={() => {setconfirmEmail(true)}}> {/* 이메일 모달 열기 */}
                  <img src={process.env.PUBLIC_URL + '/assets/messege.svg'} />
                </button>
                <div className="confirmWay">이메일 인증</div>
              </div>
              {/* ... (전화번호 인증 버튼 등) ... */}
            </div>
          </div>
          : 
          <div className="login">
          <h2 className="loginTitle">로그인</h2>
          {warnning ? <div className="warnning">아이디 또는 비밀번호를 잘못 입력하였습니다.</div> : <div className="hidedWarnning"></div>}
          <input placeholder="아이디" className="loginInput" value={loginId} onChange={(e) => {setLoginId(e.target.value)}}></input>
          <input type="password" placeholder="비밀번호" className="loginInput" value={loginPw} onChange={(e) => {setLoginPw(e.target.value)}}></input>
          <div className="saveId">
            <input type="checkbox" className="checkbox"></input>
            <span> 아이디 저장</span>
          </div>
          <button className="loginBtn" onClick={login}>로그인</button>
          <button className="findBtn" onClick={() => {setFindMode(true)}}>아이디 / 비밀번호 찾기</button>
          <div className="RUMember">
            <span>아직 회원이 아니신가요?</span>
            <button onClick={() => {navigate('/signin')}}>회원가입</button>
          </div>
            {/* <span>|</span>
            <button onClick={() => {navigate('/findIdPw')}}>비밀번호 찾기</button>
            <span>|</span>
            <button onClick={() => {navigate('/signin')}}>회원가입</button> */}
        </div>
          )
        )
      }
      
      
      </div>
    </div>
  )
}

export default LoginModal;