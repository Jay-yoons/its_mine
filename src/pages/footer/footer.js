import { useNavigate, useLocation } from "react-router-dom";

function Footer() {
  const locationNow = useLocation();
  if(locationNow.pathname.includes('player')) return null;
  
  return(
    <footer>
      <div className="menu">
        <span>고객센터</span>
        <span>후원</span>
        <span>개인정보</span>
        <span>법적고지</span>
        <span>about us</span>
        <span>문의하기</span>
        <span>대학 한눈에보기</span>
      </div>
      <pre>
      <br /><br />
      언더그라운드    통신판매법 신고번호 : 123456    전화번호:01062740069<br /><br />
      대표: 문지욱<br /><br />
      이메일주소: sallormoon917@naver.com<br /><br />
      주소: 충북 제천시 한수면 봉화재길 517<br /><br />
      사업자 등록 번호: 123456<br /><br />
      클라우드 호스팅: Amazon Web Sevices Inc.<br /><br />
      공정거래위원회 웹사이트: 12356789<br /><br />
      </pre>
    </footer>
  )
}

export default Footer;