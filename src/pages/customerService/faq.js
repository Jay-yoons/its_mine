import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FAQData from "../../FAQData";

const categoryIconGroups = {
  계정: "account-icon",
  결제: "payment-icon",
  '영화 등록 문의': "movie-icon",
  오류: "error-icon",
};

function FAQ() {
  const FAQCategorys = ['계정', '결제', '영화 등록 문의', '오류'];
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [selectedFAQ, setSelectedFAQ] = useState();

  const navigate = useNavigate();

  const FAQByCategory = FAQCategorys.map(category => {
    return FAQData.filter(FAQ => FAQ.category === category);
  });

  const toggleCategory = (idx) => {
    if (selectedCategory === idx) {
      setSelectedCategory(-1); // 같은 카테고리를 두 번 클릭하면 닫음
    } else {
      setSelectedCategory(idx); // 다른 카테고리를 클릭하면 해당 카테고리 열림
    }
  };

  return (
    <div className="FAQ">
      <h1>고객센터</h1>
      <div className="FAQBox">
        <div className="FAQCategorys">
          {FAQCategorys.map((category, idx) => (
            <div key={category}>
              <button
                className="categoryBtn"
                onClick={() => toggleCategory(idx)}
              >
                {category}
                {/* <img
                  src={`\assets\open.png`}
                  className="categoryIcon"
                /> */}
              </button>
              {selectedCategory === idx &&
                FAQByCategory[idx].map((FAQ) => (
                  <button
                    className="FAQBtn"
                    key={FAQ.title}
                    onClick={() => setSelectedFAQ(FAQ)}
                  >
                    {FAQ.title}
                  </button>
                ))}
            </div>
          ))}
        </div>
        <div className="FAQContent">
          {selectedFAQ ? (
            <div>
              <h2>{selectedFAQ.title}</h2>
              <div className="content">{selectedFAQ.content}</div>
            </div>
          ) : (
            <div className="FAQComment">
              FAQ 카테고리에서 문의하실 내용을 선택해주세요.
            </div>
          )}
        </div>
      </div>
      <button
        className="inquiryBtn"
        onClick={() => {
          navigate("/customerService/inquiry");
        }}
      >
        1대1 문의
      </button>
    </div>
  );
}

export default FAQ;