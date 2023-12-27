import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import formatDatetime from "../functions/parseDate";

function PostList(props) {

  const [listData, setListData] = useState(false);

  const [totalPage, setTotalPage] = useState(false) 
  
  const pages = [];
  const [currPage, setCurrPage] = useState(1);
  const [sortOption, setSortOption] = useState(null);

  const navigate = useNavigate();

  for(let i=0; i<totalPage; i++) { pages[i] = i+1; }

  // console.log(props.dataLength);

  const nextPage = () => { if (currPage !== pages[pages.length-1]) setCurrPage(currPage+1); }
  const prevPage = () => { if (currPage !== 1) setCurrPage(currPage-1); }

  useEffect(() => {

    axios.get('/api/'+props.api+'/getLength')
    .then((res) => {
      setTotalPage(Math.ceil(res.data[0].length/10));
      console.log(res.data)
    })

    const req = {page: currPage}
    axios.post('/api/'+props.api+'/getList', req, {"Content-Type": 'application/json'})
    .then((response) => {
      setListData(response.data);
    })
  }, [currPage])

  // useEffect(() => {
  //   setCurrPage(1);
  // }, [props.queryData]);

  return(
    <div className="postList">
      <h1>공지</h1>
      <button className="writeBtn" onClick={() => {navigate('/customerService/inquiry/inquiryPost')}}>글쓰기</button>
      <div className="listBox">
        <ul>
          <li>
            {/* <span className="no">No</span> */}
            <span className="title">제목</span>
            <span className="createdDate">등록일</span>
          </li>
          {
            listData ?
            listData.map((data) => {
              return (
                //<li onClick={() => {navigate('/customerService/inquiry/'+inquiry.no)}}>
                <li>
                  {/* <span className="no">{data.no}</span> */}
                  <span className="title">{data[props.elements.title]}</span>
                  <span className="createdDate">{formatDatetime(data[props.elements.createdDate])}</span>
                </li>
              )
            })
            :null  
          }
        </ul>
      </div>
      <div className="pages">
          <button onClick={() => {setCurrPage(1)}}>{'<<'}</button>
          <button onClick={prevPage}>{'<'}</button>
          {
            pages.map((page) => {
              return(
                <button key={page} className={page === currPage ? "currPageBtn" : "pageBtn"} onClick={() => {setCurrPage(page)}}>{page}</button>
              )
            })
          }
          <button onClick={nextPage}>{'>'}</button>
          <button onClick={() => {setCurrPage(pages[pages.length-1])}}>{'>>'}</button>
        </div>
    </div>
  )

}

export default PostList;
