import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Account(){

  const {email} = useParams();

  return(
    <div className="account">
      {/* 기본정보 */}
      <div className="totalInfo">
        <div className="title">
          <div className="text">기본 정보</div>
        </div>
        <div className="content">
          <div className="info">
            <span className="infoNameBox">계정 이메일</span>
            <span className="infoBox">saliormoon917@naver.com</span>
            <button>변경</button>
          </div>
          <div className="line"/>
          <div className="info">
            <span className="infoNameBox">비밀번호</span>
            <span className="infoBox">**************</span>
            <button>변경</button>
          </div>
          <div className="line"/>
          <div className="info">
            <span className="infoNameBox">전화번호</span>
            <span className="infoBox">010-6274-0069</span>
            <button>변경</button>
          </div>
          <div className="line"/>
          <div className="info">
            <span className="infoNameBox">알림 설정</span>
            <span className="infoCheckBox">
              <div className="sns"><input type={"checkbox"} /><div className="text">SNS 수신동의</div></div>
              <div className="e-mail"><input type={"checkbox"} /><div className="text">e-mail 수신동의</div></div>
            </span>
            <span className="btnBox">
            </span>
          </div>
        </div>
      </div>
      {/* 결제 정보 */}
      <div className="totalInfo">
        <div className="title">
          <div className="text">결제 정보</div>
        </div>
        <div className="content">
          <div className="info">
            <span className="infoNameBox">구매내역</span>
            <span className="infoBox">Underground 정식 구독</span>
            <button>변경</button>
          </div>
          <div className="line"/>
          <div className="info">
            <span className="infoNameBox">결제수단</span>
            <span className="infoBox">[농협/체크]5461-1***-****-****</span>
            <button>변경</button>
          </div>
          <div className="line"/>
          <div className="info">
            <span className="infoNameBox">예비 결제수단</span>
            <span className="infoBox"><button style={{ flexshrink: 0 }}>등록</button></span>
          </div>
          <div className="line"/>
          <div className="info">
            <span className="infoNameBox">결제일</span>
            <span className="infoBox">2023-03-02_11:52</span>
            <button>등록 해지신청</button>
          </div>
          <div className="more">
            <button>결제내역 상세 보기</button>
          </div>
        </div>
      </div>
      {/* 시청 데이터 */}
      <div className="totalInfo">
        <div className="title">
          <div className="text">시청 데이터</div>
        </div>
        <div className="content">
          <div className="info">
            <span className="infoNameBox">최근 신청목록</span>
            <span className="infoBox">
              <div>최근 시청 영화 1</div>
              <div>최근 시청 영화 2</div>
              <div>최근 시청 영화 3</div>
            </span>
            <button>전체 시청기록</button>
          </div>
          <div className="line"/>
          <div className="info">
            <span className="infoNameBox">누적 시청시간</span>
            <span className="infoBox">238시간 57분(상위 10%)</span>
          </div>
          <div className="line"/>
          <div className="info">
            <span className="infoNameBox">일별 시청 시간</span>
            <span className="infoBox">2023-03-02_11:52</span>
            <button>전체 시청시간</button>
          </div>
          <div className="line"/>
          <div className="info">
            <span className="infoNameBox">총 시청 편수</span>
            <span className="infoBox">76편</span>
            <img src="/assets/questionMarks.png" />
          </div>
          <div className="more">
            <button>장르별 시청 횟수 보기</button>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default Account;