import { useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import inquiryData from "../../inquiryData";
import FAQ from "./faq";
import InquiryDetail from "./inquiryDetail";
import Inquiry from "./inquiry";
import InquiryPost from "../../inquiryPost";

function CustomerService(){
  
  return(
    <div className="customerService">
    <Routes>
      <Route path="/" element={<FAQ />} />
      <Route path={"/inquiry/*"} element={<Inquiry />} />
      {/* <Route path={"/inquiryPost/*"} element={<InquiryPost />} /> */}
    </Routes>
    </div>
  )
}



// function Inquiry() {
//   const data = inquiryData.sort((a, b) => b.no - a.no);
//   const inquiries = [];
//   const pages = [];
//   const [currPage, setCurrPage] = useState(1);
//   const totalPages = Math.ceil(data.length/10);
  
//   for (let i=0; i<totalPages; i++) {
//     inquiries[i] = data.filter((inquiry, idx) => idx>=i*10 && idx<i*10+10);
//     pages[i] = i+1;
//   }

//   return(
//     <div className="inquiry">
//     <h1>1대1 문의</h1>
//       <Routes>
//         <Route path="/" element={<InquiryList inquiries={inquiries} pages={pages} currPage={currPage} setCurrPage={setCurrPage}/>} />
//         <Route path={"/:id"} element={<InquiryDetail data={data} />} />
//         <Route path="/post" element={<InquiryPost />} />
//       </Routes>
//     </div>
//   )
// }

export default CustomerService;