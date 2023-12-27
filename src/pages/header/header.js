import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import LoginModal from "./loginModal";
import MenuModal from "./menuModal";
import SearchModal from "./searchModal";
// import "../style.css"
// import userData from "../../userData";


function Header(props){

  const locationNow = useLocation();

  const navigate = useNavigate();

  if(locationNow.pathname.includes('player')) return null;
  
  return(
    <header>
      <button className="logo" onClick={() => {navigate('/')}} >
        <img className="logoIcon" src={process.env.PUBLIC_URL + '/assets/logoIcon.svg'} />  
      </button>
      <nav>
          {
            props.searchModal ?
            null:
            <button className="search" onClick={() => {props.setSearchModal(true)}}>
              <img className='searchIcon' src={process.env.PUBLIC_URL + '/assets/searchIcon.svg'}></img>
            </button>
          }
          <button className="menu" onClick={() => {props.setMenuModal(!props.menuModal)}}>
            <img className='menuIcon' src={process.env.PUBLIC_URL + '/assets/menuIcon.svg'}></img>
          </button>
        </nav>
      {props.searchModal ? <SearchModal setSearchModal={props.setSearchModal}/> : null}
      {props.menuModal ? <MenuModal setMenuModal={props.setMenuModal} setLoginModal={props.setLoginModal}/> : null}
      {props.loginModal ? <LoginModal setLoginModal={props.setLoginModal}/> : null}
    </header>
  )
}

export default Header;