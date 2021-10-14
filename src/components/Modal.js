import React from "react";

function Modal({ isModalopen, errorValue, setisModalOpen }) {
  return (
    <div className={isModalopen ? "Modalcontent show" : "Modalcontent"}>
      <div className="Modal">
        {errorValue === "로그인 후 시도해주세요!" ? (
          <>
            <h2>🏷 로그인하면 이용할 수 있어요!</h2>
            <p>{errorValue || "관리자에게 문의하세요"}</p>
            <button
              className="moveLogin"
              onClick={(e) => {
                e.preventDefault()((document.location.href = "/login"));
              }}
            >
              로그인하러가기
            </button>
            <button className="movePrev" onClick={setisModalOpen}>
              이전 화면 돌아가기
            </button>
          </>
        ) : (
          <>
            <h2>😱 앗! 문제가 생겼어요!😱</h2>
            <p>
              {errorValue.replace(/<br>/gi, "\n") || "관리자에게 문의하세요"}
            </p>
            <button onClick={setisModalOpen}>X</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
