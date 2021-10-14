import React from "react";
import "./Logout.css";

function Logout({ isModalopen, setisModalClose }) {
  document.addEventListener("click", setisModalClose, true);
  return (
    <div className={isModalopen ? "logoutwrap show" : "logoutwrap"}>
      <div className="logoutmodal">
        <h3>로그아웃이 성공적으로 진행되었습니다!</h3>
        <div>다음에 만나요!</div>
        <button onClick={setisModalClose}>X</button>
      </div>
    </div>
  );
}

export default Logout;
