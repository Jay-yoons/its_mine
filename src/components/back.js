import { useLocation, useNavigate } from "react-router-dom"

function Back() {
  const navigate = useNavigate();
  const locationNow = useLocation();

  if(locationNow.pathname === '/' || locationNow.pathname.includes('player')) return null;
  
  return(
    <button className="backButton" onClick={() => {navigate(-1)}}>
      <img src={process.env.PUBLIC_URL + '/assets/backBtnIcon.png'}></img>
    </button>
  )
}

export default Back;