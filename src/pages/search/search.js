import { useNavigate, useParams } from "react-router-dom";
// import '.../App.scss'


function Search(props) {
  const {searchWord} = useParams();
  const navigate = useNavigate();

  const searchedMovies = [];

  props.movies.map((movie) => {
    if (movie.title.split(' ').join('').includes(searchWord.split(' ').join(''))) searchedMovies.push(movie);
  })

  return (
    <div className="search">
      <h1 className="searchWord">"{searchWord}"</h1>
      {
        searchedMovies.length === 0 ?
        <h2 className="comment">"{searchWord}"에 해당하는 영화가 없습니다...</h2>:
        null
      }

      <div className="searchedMovieList">
      {
        searchedMovies.map((searchedMovie) => {
          return(
            <div className="searchedMovie" onClick={() => {navigate('/player/'+searchedMovie.id)}}>
              <div className="searchedMovieImg">
                <img className='moviePoster' src={process.env.PUBLIC_URL + searchedMovie.posterImg} />
              </div>
              <div className="searchedMovieInfo">
                <div className="movieTitle">{searchedMovie.title}</div>
                <div className='summary'>{searchedMovie.summary}</div>
                <div className="moreInfo">
                  {searchedMovie.releaseDate}
                  <div className="views">조회수 : <div style={{color : 'white'}}>882</div> 회</div>
                  <div className="likes">조회수 : <div style={{color : 'white'}}>56</div> 개</div>
                </div>
              </div>   
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default Search;