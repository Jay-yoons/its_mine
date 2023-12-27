import { useParams } from "react-router-dom";

function InquiryDetail(props) {
  
  const n = parseInt(useParams().id);
  const inquiry = props.data.filter((inquiry) => inquiry.no===n);
  return(
    <div className="inquiryDetail">
      <h2>{inquiry[0].title}</h2>
      <div className="content">{inquiry[0].content}</div>
    </div>
  )
}

export default InquiryDetail;