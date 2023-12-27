import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import movieData from "../../movieData";
import axios from 'axios'

function Player(){

  const navigate = useNavigate();

  const [detailModal, setDetailModal] = useState(-1);

  const { id } = useParams();
  const movieTitle = movieData.map(movie => movie.title);     //제목
  const movieSummary = movieData.map(movie => movie.summary); //줄거리
  const movieDate = movieData.map(movie => movie.date);       //날짜
  const movieDirect = movieData.map(movie => movie.direct);   //감독?
  const movieScript = movieData.map(movie => movie.scirpt);   //각본
  const movieAct = movieData.map(movie => movie.act);         //배우

  const score = 97.5;
  const scoreInt = parseInt(score/20);
  const scoreDec = ((score%20)/20)*14 + "px";

  const stars = [1,2,3,4,5];

  const movieNum = useParams().id%2;

  const videoRef = useRef();
  
  const playerRef = useRef();
  
  const [playerState, setPlayerState] = useState({
    playing: false,     // 재생중인지
    muted: false,      // 음소거인지
    volume: 0.5,       // 볼륨크기
    playbackRate: 1.0, // 배속
    seeking: false,    // 재생바를 움직이고 있는지
    duration: 0,       // 전체 시간
  });

  const [fullScreen, setFullScreen] = useState(false);

  const [playbackRateModal, setPlaybackRateModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);

  const [volumeBtn, setVolumeBtn] = useState('/assets/volumeIcon.svg');
  const [playPauseBtn, setPlayPauseBtn] = useState('/assets/playBtnIcon.svg');

  const [controlHide, setControlHide] = useState(true);
  const [cursorHide, setCursorHide] = useState(false);
  const [hiding, setHiding] = useState(false);

  const [timeDisplay, setTimeDisplay] = useState("normal");

  
  const playbackRates = [0.25, 0.5, 0.75, 1.00, 1.25, 1.5, 1.75, 2.00]

  // var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
  //   (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
  //   (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
  //   (document.msFullscreenElement && document.msFullscreenElement !== null);

  const format = (seconds) => {
    if(isNaN(seconds)) return "00:00";
    console.log(seconds);
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());
    if (hh) return `${hh}:${pad(mm)}:${ss}`;
    else return `${mm}:${ss}`;
  }
  
  const pad = (string) => {
    return ("0"+string).slice(-2);
  }
  
  const [currentTime, setCurrentTime] = useState(0);
  const duration = videoRef && videoRef.current ? videoRef.current.getDuration() : 0;
  const totalDuration = format(duration);
  const elapsedTime = timeDisplay==="normal" ? format(currentTime) : `-${format(duration - currentTime)}`;
  
  const hideControlCursor = () => {
    setHiding(!hiding);
  };

  const closePlaybackRateModal = () => {
    setPlaybackRateModal(false);
    hideControlCursor();
  }

  const closeReportModal = () => {
    setReportModal(false);
    hideControlCursor();
  } 

  setInterval(() => {
    setCurrentTime(videoRef && videoRef.current ? videoRef.current.getCurrentTime() : 0);
  }, 200);
    
  const playPause = () => {
    setPlayPauseBtn(playerState.playing ? '/assets/playBtnIcon.svg' : '/assets/pauseBtnIcon.svg')
    setPlayerState({...playerState, playing: !playerState.playing});
    hideControlCursor();
  };
  
  const onSeekChange = (newValue) => {
    videoRef.current.seekTo(newValue/100, "fraction");
  };
  
  const seekMouseDown = () => {
    setPlayerState({...playerState, seeking: true});
  };
  
  const displayFormat = () => {
    setTimeDisplay(timeDisplay==="normal" ? "remaining" : "normal");
  };
  
  const backwardVideo = () => {
    let time = videoRef.current.getCurrentTime() <= 5 ? 0 : videoRef.current.getCurrentTime()-3;
    videoRef.current.seekTo(time);
    hideControlCursor();
  };
  
  const forwardVideo = () => {
    let time = videoRef.current.getCurrentTime() >= duration-5 ? duration-0.3 : videoRef.current.getCurrentTime()+3;
    videoRef.current.seekTo(time);
    hideControlCursor();
  };
  
  const mutedChange = () => {
    setVolumeBtn(playerState.muted ? '/assets/volumeIcon.svg' : '/assets/mutedVolume.png')
    setPlayerState({...playerState, muted: !playerState.muted})
  }
  
  const volumeChange = (newValue) => {
    if (newValue >= 1) newValue = 1;
    else if (newValue <= 0) newValue = 0;
    setPlayerState({
      ...playerState,
      volume: parseFloat(newValue),
    });
    hideControlCursor();
  };

  const playBackRateChange = (rate) => {
    setPlayerState({
      ...playerState,
      playbackRate: rate,
    });
    closePlaybackRateModal();
  };

  const openReport = () => {
    if (playerState.playing) playPause();
    closePlaybackRateModal();
    setReportModal(true);
  }

  const openFullscreen = () => {
    if (playerRef.current.requestFullscreen) playerRef.current.requestFullscreen();
    else if (playerRef.current.mozRequestFullScreen) playerRef.current.mozRequestFullScreen(); /* Firefox */
    else if (playerRef.current.webkitRequestFullscreen) playerRef.current.webkitRequestFullscreen(); /* Chrome, Safari, Opera */
    else if (playerRef.current.msRequestFullscreen) playerRef.current.msRequestFullscreen(); /* IE/Edge */
  }

  const closeFullscreen = () => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen(); /* Firefox */
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen(); /* Chrome, Safari, Opera */
    else if (document.msExitFullscreen) document.msExitFullscreen(); /* IE/Edge */
  }
  

  // const volumeSeekUp = (e, newValue) => {
  //   setPlayerState({
  //     ...playerState,
  //     volume: parseFloat(newValue / 100),
  //     muted: newValue === 0 ? true : false,
  //   });
  // };
  

  useEffect(() => {
    let timer = setTimeout(() => {
      if (!(playbackRateModal || reportModal)){
        setCursorHide(true);
        setControlHide(true);
      }
    },2000);
    return () => {
      setCursorHide(false);
      setControlHide(false);
      clearTimeout(timer);
    };
  },[hiding])

  useEffect(() => {
    const keyEvent = (e) => {
      if (e.keyCode === 32) playPause();
      else if (e.keyCode === 38) volumeChange(playerState.volume + 0.05);
      else if (e.keyCode === 40) volumeChange(playerState.volume - 0.05);
      else if (e.keyCode === 37) backwardVideo();
      else if (e.keyCode === 39) forwardVideo();
      else if (e.keyCode === 27) {
        closeReportModal();
        closePlaybackRateModal();
      }
    }; 
    
    const changeFullScreen = (e) => {
      setFullScreen(
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)
      );
    }

    window.addEventListener("keydown", keyEvent);
    document.addEventListener('fullscreenchange', changeFullScreen);
    
    return () => {
      window.removeEventListener("keydown", keyEvent);
      document.removeEventListener('fullscreenchange', changeFullScreen);
    }
  },[playerState]);

  const [liked, setLiked] = useState(false);
  
  const toggleLike = () => {
    setLiked(prevLiked => !prevLiked);
  };

  const [isMore, setIsMore] = useState(false);

  return(
    <div className="player">
      <div className="videoContainer" ref={playerRef}>
        <div className={cursorHide ? "cusorHidedPlayerLayer" : "playerLayer"} onMouseDown={hideControlCursor} onMouseMove={hideControlCursor} onClick={() => {playbackRateModal ? closePlaybackRateModal() : playPause()}} />
        <ReactPlayer 
          className="video"
          ref={videoRef}
          controls={false}
          width='100%'
          height='100%'
          url={process.env.PUBLIC_URL+'/assets/movie'+movieNum+'.mp4'}
          playing={playerState.playing}
          muted={playerState.muted}
          volume={playerState.volume}
          playbackRate={playerState.playbackRate}
          duration={playerState.duration}
          onPause={() => {setControlHide(false)}}
          loop={false}
          // played={playerState.played}
        />   
        {
        controlHide ?
        null
        :
        <div className="controls">

          <div className="topControls">
            <button className="backBtn" onClick={() => {navigate(-1)}}>
              <img className="backBtnIcon" src={process.env.PUBLIC_URL+"/assets/backBtnIcon.svg"} />
            </button>

            <button className="reportBtn" onClick={() => {openReport()}}>
              <img className="reportBtnIcon" src={process.env.PUBLIC_URL+"/assets/reportBtnIcon.svg"} />
            </button>
          </div>

          {
            reportModal ?
            <div>
              <div className="modalOut" onClick={closeReportModal}/>
              <div className="reportModal">
                <div className="reportComment">
                  어떤 문제를 겪고 계신가요?
                  <button className="reportCloseBtn" onClick={() => {}}>
                    <img className="closeBtnIcon" src={process.env.PUBLIC_URL + '/assets/exitIcon.svg'} />
                  </button>
                </div>
                <div className="reportAnswer">
                <div className="buffering">
                  <button className="reportPhoto" >
                    <img src = "/assets/changeIcon.svg"/>버퍼링 및 로딩
                  </button>
                  <div className="caption">영상이 흐리거나, 로딩이 지연되거나, 로딩이 되지 않습니다.</div>
                </div>
                <div className="subTitles">
                  <button>
                    <img src = "/assets/captionIcon.svg"/>자막 및 캡션
                  </button>
                  <div className="caption">자막이나 캡션이 제대로 작동하지 않습니다.</div>
                </div>
                <button>
                  음성 및 영상
                </button>
                <div className="caption">영상의 소리가 잘 안들리거나 영상이 잘 보이지 않습니다.</div>
                <button>
                  다른 문제  
                </button>
                <div className="caption">작품에 다른 문제가 있습니다.</div>
                </div>
              </div>
            </div>
            :null
          }

          <button className="centerPlayPauseBtn" onClick={playPause}>
            <img className="centerPlayPauseBtnIcon" src={process.env.PUBLIC_URL+playPauseBtn} />
          </button>
          
          <div className="bottomControls">
            <div className="timeControl">
              <input 
                className="timeSlider"
                type={"range"} 
                min={0}
                max={100}
                value={currentTime/duration * 100}
                onChange={(e) => {onSeekChange(e.target.value)}}
                onMouseDown={seekMouseDown}
                // onMouseUp={(e) => {seekMouseUp(e.target.value)}}
              />
            </div>
        
            <div className="bottom">
              <div className="leftControls">
                <div className="playPauseControl">
                  <button className="playPauseBtn" onClick={playPause}>
                    <img className="playPauseBtnIcon" src={process.env.PUBLIC_URL+playPauseBtn} />
                  </button>
                </div>

                <div className="backwardForwardControl">
                  <button className="backwardBtn" onClick={backwardVideo}>
                    <img className="backwardBtnIcon" src={process.env.PUBLIC_URL+"/assets/backwardBtnIcon.svg"} />
                  </button>
                  <button className="forwardBtn" onClick={forwardVideo}>
                    <img className="backwardBtnIcon" src={process.env.PUBLIC_URL+"/assets/forward.png"} />
                  </button>
                </div>

                <div className="muteControl">
                  <button className="muteBtn" onClick={mutedChange}>
                    <img className="muteBtnIcon" src={process.env.PUBLIC_URL+volumeBtn} />
                  </button>
                </div>

                <div className="volumeControl">
                  <input
                    className="volumeSlider"
                    type="range"
                    min={0}
                    max={1}
                    color="gray"
                    step={0.01}
                    value={playerState.volume}
                    onChange={(e) => {volumeChange(e.target.valueAsNumber)}}
                  />
                </div>
                <div className="timeInfo">
                  <span onClick={displayFormat}>{elapsedTime}</span>
                  <span> / </span>
                  <span>{totalDuration}</span>
                </div>
              </div>

              <div className="rightControls">
                <div className="playbackRateControl">
                  <button className="playbackRateControlBtn" onClick={() => {playbackRateModal ? closePlaybackRateModal() : setPlaybackRateModal(true)}}>재생속도</button>
                  {
                    playbackRateModal
                    ?
                    <div>
                      <div className="playbackRateModal">
                      {
                        playbackRates.map((playbackRate) => {
                        return(
                          <button onClick={()=>{playBackRateChange(playbackRate)}}>
                            <span className="playbackRateCheck">{(playbackRate===playerState.playbackRate ? '● ' : '')}</span>
                            x{playbackRate}
                          </button>
                        )
                      })}
                      </div>
                    </div>
                    :
                    null
                  }
                </div>
                <div className="fullScreenControl">
                  {fullScreen ?
                  <button className="closeFullScreenBtn" onClick={closeFullscreen}>
                    <img className="closeFullScreenBtnIcon" src={process.env.PUBLIC_URL+"/assets/fullScreen.png"} />
                    </button>:
                  <button className="openFullScreenBtn" onClick={openFullscreen}>
                    <img className="openFullScreenBtnIcon" src={process.env.PUBLIC_URL+"/assets/fullScreen.png"} />
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        }
      </div>

      <div className="playerdetail">
        <div className="playermain">
          <div className="leftInfo">
            <h1 className="movieTitle">
              {movieTitle[id]}
              <img className="payment" src = "/assets/월계수.svg"/>
            </h1>
            
          </div>
          
          <div className="rightInfo">
              <div className='playerFillScore'>
                {/* {
                  stars.map((별) => {
                    if (star <= scoreInt) return(<span className='playerContainer'><span className='playerStar'>★</span></span>)
                  })
                }
                  <span className='playerContainer' style={{width: scoreDec, overflow: "hidden"}}>
                    <span className='playerStar'>★</span>
                  </span>
                </div>
              <div className='playerBaseScore'>
                {
                  stars.map((별) => {
                    return(<span className='playerContainer'><span className='playerStar'>★</span></span>)
                  })
                  } */}
              </div>
          </div>
          
        </div>
        <div className="otherInfo" >
          <div className="summary">
            {movieSummary[id]}
          </div>
        </div>
        
        <div className="playerList">
          <div className="ListName">
              내가 찜한 콘텐츠
          </div>
          <div className="MovieLists">
            <div class="photo-container">
              <img src="/assets/posterImg1.svg" class="photo" />
              <div className="movieDetail">제목</div>
              <div class="description">감독</div>
            </div>

            <div class="photo-container">
              <img src="/assets/posterImg2.svg" class="photo" />
              <div className="movieDetail">제목</div>
              <div class="description">감독</div>
            </div>

            <div class="photo-container">
              <img src="/assets/posterImg3.svg" class="photo" />
              <div className="movieDetail">제목</div>
              <div class="description">감독</div>
            </div>

            <div class="photo-container">
              <img src="/assets/posterImg16.svg" class="photo" />
              <div className="movieDetail">제목</div>
              <div class="description">감독</div>
            </div>

            <div class="photo-container">
              <img src="/assets/posterImg19.svg" class="photo" />
              <div className="movieDetail">제목</div>
              <div class="description">감독</div>
            </div>
          </div>
        </div>

        <div className="playerList">
          <div className="ListName">
            관련영화
          </div>
          <div className="MovieLists">
            <div class="photo-container">
              <img src="/assets/posterImg12.svg" class="photo" />
              <div className="movieDetail">제목</div>
              <div class="description">감독</div>
            </div>

            <div class="photo-container">
              <img src="/assets/posterImg25.svg" class="photo" />
              <div className="movieDetail">제목</div>
              <div class="description">감독</div>
            </div>

            <div class="photo-container">
              <img src="/assets/posterImg23.svg" class="photo" />
              <div className="movieDetail">제목</div>
              <div class="description">감독</div>
            </div>

            <div class="photo-container">
              <img src="/assets/posterImg10.svg" class="photo" />
              <div className="movieDetail">제목</div>
              <div class="description">감독</div>
            </div>

            <div class="photo-container">
              <img src="/assets/posterImg9.svg" class="photo" />
              <div className="movieDetail">제목</div>
              <div class="description">감독</div>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Player;


// function MovieList() {
  
//   const sortedMovieData = movieData.sort((a, b) => a.title.localeCompare(b.title));

//   return (
//     <div className="MovieLists">
//       {sortedMovieData.map(movie => (
//         <div key={movie.id} className="photo-container">
//           <img src={movie.posterImg} alt={movie.title} className="photo" />
//           <p className="movieDetail">{movie.title}</p>
//           <p className="description">{movie.summary}</p>
//         </div>
//       ))}
//     </div>
//   );
// }


