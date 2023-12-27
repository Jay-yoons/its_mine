import { useNavigate } from "react-router-dom";

function MenuModal(props) {
  const navigate = useNavigate();
  return (
    <div>
    <div className="menuModalOut" onClick={() => props.setMenuModal(false)}></div>
    <div className="menuModal">
      <button onClick={() => {navigate('/account')}}>계정</button>
      <button onClick={() => {navigate('/keep')}}>찜목록</button>
      <button onClick={() => {navigate('/requestMovie')}}>영화 신청</button>
      <button onClick={() => {navigate('/customerService')}}>고객센터</button>
      <button onClick={() => {navigate('/notice')}}>공지</button>
      <button onClick={() => {navigate('/setup')}}>설정</button>
      <button onClick={() => {props.setLoginModal(true)}}>로그인</button>
    </div>
    </div>
  )
}

export default MenuModal;