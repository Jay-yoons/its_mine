import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
// import noticeData from "../../noticeData"
import axios from "axios";
import PostList from "../../components/postList";

function Inquiry(props) {
  const elements = {title: 'inquiryName', content: 'inquiryContent', createdDate: 'inquiryDate'};
  
  // for (let i=0; i<totalPages; i++) {
  //   notices[i] = data.filter((notice, idx) => idx>=i*10 && idx<i*10+10);
  //   pages[i] = i+1;
  // }

  return(
    <div>
      <Routes>
        <Route path="/" element={<PostList elements={elements} api={'inquiry'} />} />
        {/* <Route path={"/:id"} element={<NoticeDetail  />} /> */}
      </Routes>
    </div>
  )
}

export default Inquiry;