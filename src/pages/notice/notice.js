import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import noticeData from "../../noticeData"
import axios from "axios";
import PostList from "../../components/postList";

function Notice() {
  // const notices = [];
  // const pages = [];
  // const [currPage, setCurrPage] = useState(1);
  // const totalPages = Math.ceil(dataLength/10);

  const elements = {title: 'noticeTitle', content: 'noticteContent', createdDate: 'createdDate'};
  
  // for (let i=0; i<totalPages; i++) {
  //   notices[i] = data.filter((notice, idx) => idx>=i*10 && idx<i*10+10);
  //   pages[i] = i+1;
  // }

  return(
    <div>
      <Routes>
        <Route path="/" element={<PostList elements={elements} api={'notice'} />} />
        <Route path={"/:id"} element={<NoticeDetail  />} />
      </Routes>
    </div>
  )
}

function NoticeList(props) {

  const navigate = useNavigate();
  const notices = props.notices;
  const pages = props.pages;

  const nextPage = () => {
    if (props.currPage !== pages[pages.length-1]) props.setCurrPage(props.currPage+1);
  }
  const prevPage = () => {
    if (props.currPage !== 1) props.setCurrPage(props.currPage-1);
  }

  

  return (
    <div className="noticeList">
      <div className="listBox">
        <ul>
          <li>
            <span className="no">No</span>
            <span className="title">제목</span>
          </li>
          {
            notices[props.currPage-1].map((notice) => {
              return (
                <li onClick={() => {navigate('/notice/'+notice.no)}}>
                  <span className="no">{notice.no}</span>
                  <span className="title">{notice.title}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className="pages">
        <button onClick={() => {props.setCurrPage(1)}}>{'<<'}</button>
        <button onClick={prevPage}>{'<'}</button>
        {
          pages.map((page) => {
            return(
              <button className={page === props.currPage ? "currPageBtn" : "pageBtn"} onClick={() => {props.setCurrPage(page)}}>{page}</button>
            )
          })
        }
        <button onClick={nextPage}>{'>'}</button>
        <button onClick={() => {props.setCurrPage(pages[pages.length-1])}}>{'>>'}</button>
      </div>

      {/* <List data={notices} pages={pages} currPage={props.currPage} setCurrPage={props.setCurrPage} /> */}
    </div>  
  )
}


function NoticeDetail(props) {
  
  const n = parseInt(useParams().id);
  const notice = props.data.filter((notice) => notice.no===n);
  return(
    <div className="noticeDetail">
      <h2>{notice[0].title}</h2>
      <div className="content">{notice[0].content}</div>
    </div>
  )
}

export default Notice;