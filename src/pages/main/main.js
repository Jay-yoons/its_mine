import { useEffect, useState, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

function Main(props){
  
  // useEffect(() => {
  //   const escKey = (e) => {
  //     if(e.keyCode === 27){
  //       setDetailModal(-1);
  //     }
  //   };
  //   window.addEventListener("keyup", escKey);
  //   return () => window.removeEventListener("keydown", escKey);
  // },[])
  
  return(
    <div className="home">
      <Hero></Hero>
      <ul className='movieLists'>
        {props.tags.map((tag) => {
          return(
            <MovieLists key={tag.id} tag={tag} movies={props.movies} setDetailModal={props.setDetailModal} />
          )
        })}
      </ul>
      {props.detailModal != -1 ? <DetailModal movie={props.movies.filter((movie) => movie.id == props.detailModal)} setDetailModal={props.setDetailModal} />: null}
      {/* <div className='gradiant' /> */}
    </div>
  )
}

function Hero() {
  return(
    <div className="hero">
      <img className="heroImg" src={process.env.PUBLIC_URL + "/assets/heroImg.png"}></img>
      {/* <button className="heroBtn">자세히 보기</button> */}
    </div>
  )
}

function MovieLists(props) {
  
  const [scrolled, setScrolled] = useState(0);
  const ref = useRef();
  const navigate = useNavigate();
  const tagMovies = [];

    props.tag.movieIds.map((movieId) => {
      var pushMovie = props.movies.find((movie) => movie.id == movieId);
      if (pushMovie !== undefined) tagMovies.push(pushMovie);
    })
  
  
    useEffect(() => {
      ref.current.removeEventListener('scroll', onCheckScroll);
      ref.current.addEventListener('scroll', onCheckScroll);
    },[]);

    const onCheckScroll = () => {
      const x = ref.current.scrollLeft;
      const maxX = ref.current.scrollWidth- ref.current.clientWidth-25;
      
      // console.log(scrollWidth);
      // console.log(x+clientWidth);
      // console.log(scrollWidth);
      if (x > 0 && x < 110) {
        setScrolled(1)
      }
      else if (x >= 110 && x < maxX) {
        setScrolled(2);
      }
      else if (x >= maxX) {
        setScrolled(3);
      }
      else {
        setScrolled(0);
      }
    }

  return(
    <div>
      <ul className="movieList">
      {scrolled > 1 ? <ReducedTag tag={props.tag} /> : 
      <div className='voidReducedTag'>
        <div className='blank' />
        <div className='scrollBtn'>
          <img src={process.env.PUBLIC_URL + 'assets/scrollBtn.png'} />
        </div>
      </div>}
        <ul className="movieScroll" ref={ref}>
          {scrolled ? <button className='prevBtn' onClick={() => {
            ref.current.scrollBy({left:-500, behavior:'smooth'})
          }}>◀</button>: null}
        <div className='tag'>
          <div>
            <img src={process.env.PUBLIC_URL + props.tag.tagIcon} className='tagIcon'/>
          </div>
          <div className='tagName'>{props.tag.tagName.replace('학교','')}</div>
        </div> 
          <TagMovies movies={tagMovies} setDetailModal={props.setDetailModal} />

          {
            scrolled === 3 ?
            null:
          <button className="nextBtn" onClick={() => {
            ref.current.scrollBy({left:500, behavior:'smooth'})
          }}>▶</button>
          
          }
        </ul>
        
      </ul>
    </div>
  )
}

function ReducedTag(props) {
  return(
    <div className='reducedTag'>
      <img src={process.env.PUBLIC_URL + props.tag.tagIcon} className='tagIcon'/>
      <span className='tagName'>{props.tag.tagName.replace('학교','')}</span>
    </div>
  )
}

function TagMovies(props) {
  const navigate = useNavigate();
  return(
    <>
    {
    props.movies.map((movie) => {
      return(
        <li className='movie' key={movie.id}>
          <div className='layer' onClick={() => {navigate('/player/'+movie.id)}} />
          <img className="moviePoster" src={process.env.PUBLIC_URL + movie.posterImg} />
          <div className='movieInfo'>
            <div className='title'>{movie.title}</div>
            <div className='movieMenu'>
              <button>
                <img className='keepBtnIcon' src={process.env.PUBLIC_URL + "/assets/keepIcon.svg"} />
              </button>
              <button onClick={() => {props.setDetailModal(movie.id)}}>
                <img className='detailBtnIcon' src={process.env.PUBLIC_URL + "/assets/detailIcon.svg"} />
              </button>
            </div>
          </div>
        </li>
      )
    })
  }
  </>
  )
}

function DetailModal(props) {
  const navigate = useNavigate();
  const score = 88;
  const scoreInt = parseInt(score/20);
  const scoreDec = ((score%20)/20)*14 + "px";

  const stars = [1,2,3,4,5];

  return (
    <div>
      <div className='modalOut' onClick={() => {props.setDetailModal(-1)}}></div>
      <div className='detailModal'>
        <button className='closeBtn' onClick={() => {props.setDetailModal(-1)}}>
          <img className="closeBtnIcon" src={process.env.PUBLIC_URL + '/assets/exitIcon.svg'} />
        </button>
        <img className='detailImg' src={process.env.PUBLIC_URL + props.movie[0].posterImg} />
          <button className='playBtn' onClick={() => {navigate('/player/'+props.movie[0].id)}}>재생</button>
          <button className='keepBtn'>찜</button>
        <div className='detailInfo'>
          <div className='topInfo'>
            <h1 className='title'>{props.movie[0].title}</h1>
            <div className='rightInfo'>
              <div className='score'>
                <div className='fillScore'>
                  {
                    stars.map((star) => {
                      if (star <= scoreInt) return(<span className='starContainer'><span className='star'>★</span></span>)
                    })
                  }
                  <span className='starContainer' style={{width: scoreDec, overflow: "hidden"}}><span className='star'>★</span></span>
                </div>
                <div className='baseScore'>
                  {
                    stars.map((star) => {
                      return(<span className='starContainer'><span className='star'>★</span></span>)
                    })
                  }
                </div>
              </div>
              <div className='runningTime'>총 : 101분</div>
              <div className='hits'>조회수 : 854회</div>
            </div>
          </div>
          <div className='bodyInfo'>
            <div className='summary'>CHECK THIS OUT 나는 정 상 수백발백중 하는 명 사 수부산진구 유명가수일취월장 하며 성장 중내가 대표해 이 거리를누구도 막지 못해 내 지껄임을사양할게 너의 벌쓰 피처링은이건 나의 TRACK MY SWAG노린 RAP ATTACK난 계속해서 매섭게 쏘겠어죄 속에서 날 대속해 주신 주</div>
            <ul className='otherInfo'>
              <li>개봉일 : 2001년 1월 5일</li>
              <li>감독 : 장재영</li>
              <li>각본 : 장재영</li>
              <li>출연진 : 문지욱, 서태성, 장재영</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Main;