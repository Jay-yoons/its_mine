import { Route, Routes, useNavigate } from "react-router-dom";
import SelectMenu from "./selectMenu";
import Request from "./request";
import Upload from "./upload";

function RequestMovie() {
  
  return(
    <div className="requestMovie">
      <Routes>
        <Route path="/" element={<SelectMenu />} />
        <Route path="/request" element={<Request />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  )
}


export default RequestMovie;