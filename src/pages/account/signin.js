import { useState } from "react";

function Signin() {
  const [pwWarning, setPwWarning] = useState(''); // 비밀번호 경고 상태
  const [pw, setPw] = useState(''); // 비밀번호 상태

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPw(newPassword);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;
    passwordRegex.test(newPassword)
      ? setPwWarning('')
      : setPwWarning('조건에 일치하지 않습니다.');
  };

  return (
    <div className="signup">
      <h1 className="joinMember">회원가입</h1>z
      <div className="userInfo"> 
        <div className="userContent">이메일</div>
        <div className="input-container">
          {/* 이메일 입력 필드 */}
          <input type="text" placeholder="이메일" />
          <span>@</span>
          <select>
            <option>example.com</option>
          </select>
          <button className="btn">인증번호 받기</button> 
          <div className="input-container">
            {/* 인증번호 입력 필드 */}
            <input type="text" placeholder="인증번호" />
            <button className="btn">인증</button>
          </div>
        </div>
      </div>
      
      <div className="userInfo">
        <div className="userContent">아이디</div>
        <div className="input-container">
          {/* 아이디, 이름, 전화번호 입력 필드 */}
          <input type="text" placeholder="아이디" />
        </div>
      </div>

      <div className="userInfo">
        <div className="userContent">이름 </div>
        <div className="input-container">
          <input type="text" placeholder="이름" />
        </div>
      </div>
      
      <div className="userInfo">
        <div className="userContent">전화번호</div>
        <div className="input-container">
          <input type="tel" placeholder="전화번호" />
        </div>
      </div>
      
      <div className="userInfo">
        <div className="userContent">비밀번호</div>
        <div className="input-container">
            {/* 비밀번호 입력 필드 */}
            <input
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={handlePasswordChange}
            />
            <div className="warning">{pwWarning}</div>
          </div>
      </div>
      
      <div className="userInfo">
        <div className="userContent">비밀번호 확인</div>
        <div className="input-container">
          {/* 비밀번호 확인 입력 필드 */}
          <input type="password" placeholder="비밀번호 확인" />
        </div>
      </div>
      
      <div className="userInfo">
        <div className="userContent">수신동의</div>
        <div className="input-container">
           {/* 수신 동의 체크박스 */} 
          <input type="checkbox" id="smsAgree" />
          <label htmlFor="smsAgree">SMS 수신 동의</label>
          <input type="checkbox" id="emailAgree" />
          <label htmlFor="emailAgree">이메일 수신 동의</label>
        </div>
      </div>
      
      <div className="bottombtn">
        <button className="signup-btn">회원가입</button>
      </div>
      
    </div>
  );
}

export default Signin;