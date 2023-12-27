import { useNavigate } from "react-router-dom";


function SelectMenu() {
  const navigate = useNavigate();
  return(
    <div className="selectMenu">
      <h1>영화 신청</h1>
      <div className="Btns">
        <div>
          <button onClick={() => {navigate("/requestMovie/request")}}>
            <img className="requestImg" src={process.env.PUBLIC_URL + "/assets/영화 요청.png"} />
            영화 요청
            <p className="comment">일반 사용자분들이 보고싶은 영화가 있을 때 이용해주세요</p>
          </button>
          
        </div>

        <div>
          <button onClick={() => {navigate("/requestMovie/upload")}}>
            <img className="requestImg" src={process.env.PUBLIC_URL + "/assets/영화 신청.png"} />
            영화 등록 신청
            <p className="comment">영화 제작자 분들이 자신의 영화를 등록하고 싶을 때 이용해주세요</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectMenu;