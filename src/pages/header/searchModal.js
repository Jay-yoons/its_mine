import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchModal(props) {
  let recentWords = JSON.parse(localStorage.getItem('recentWords')) || [];
  const recommenedWords = ['인기검색어1','인기검색어2','인기검색어3','인기검색어4','인기검색어5','인기검색어6'];
  
  const initialRecentWords = JSON.parse(localStorage.getItem('recentWords')) || [];

  const addRecentWord = (word) => {
    const updatedRecentWords = [...new Set([word, ...initialRecentWords])].slice(0, 6);
    localStorage.setItem('recentWords', JSON.stringify(updatedRecentWords));
  };
  
  const removeWord = (word) => {
    const updatedRecentWords = recentWords.filter((w) => w !== word);
    localStorage.setItem('recentWords', JSON.stringify(updatedRecentWords));
  };

  const clearWords = () => {
    localStorage.removeItem('recentWords');
    recentWords = [];
  }

  const [wordsShowMode, setWordsShowMode] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);
  const [searchWord, setSearchWord] = useState(''); 

  const navigate = useNavigate();
  const search = (link) => {
    if (searchWord.split(' ').join('')){
      removeWord(searchWord);
      addRecentWord(searchWord);
      navigate(link);
      props.setSearchModal(false);
    }
    else alert("검색어를 입력해주세요");   
  }
  
  // const searchCounts = {}

  // useEffect(() => {
  //   recentWords.forEach((word) => {
  //     searchCounts[word] = (searchCounts[word] || 0) + 1;
  //   });
  // }, [recentWords]);

  // const getPopularWords = () => {
  //   const sortedWords = Object.keys(searchCounts).sort((a, b) => searchCounts[b] - searchCounts[a]);
  //   return sortedWords;
  // };

  const enterKey = (e) => {
    if(e.key === 'Enter'){
      search('/search/'+searchWord)
    };
  }

  return (
    <div>
      <div className="modalOut" onClick={() => props.setSearchModal(false)}></div>
      <div className="searchModal">
        <div className="searchInput">
        <input className="searchText" onChange={(e) => {setSearchWord(e.target.value)}} onKeyUp={enterKey} autoFocus/>
        <button className="searchBtn" onClick={() => {search('/search/'+searchWord)}}>
          <img className='searchBtnIcon' src={process.env.PUBLIC_URL + '/assets/searchIcon.svg'} />
        </button>
        </div>
        <div className="words">
        <div className="wordsBtns">
          <button className={wordsShowMode ? "selectedBtn" : "RecentWordsBtn"} onClick={() => {setWordsShowMode(true)}}>최근검색어</button>
          <button className={wordsShowMode ? "recommenedWordsBtn" : "selectedBtn"} onClick={() => {setWordsShowMode(false)}}>인기검색어</button>
        </div>
          {modalOpen && (
            <div className="wordList">
              {
                wordsShowMode ?
                recentWords.map((recentWord) => {
                return (
                    <div className="word" key={recentWord}>{recentWord}<button onClick={() => removeWord(recentWord)}>x</button></div>
                )
                }):
                recommenedWords.map((recommenedWord) => {
                  return (
                      <div className="word">{recommenedWord}</div>
                  )
                })
              }
              <button className="clearWords" onClick={clearWords}>검색기록 모두 삭제</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal;