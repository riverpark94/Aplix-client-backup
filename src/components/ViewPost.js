import React from "react";
import { Link } from "react-router-dom";

function ViewPost(props) {
  console.log(props);
  function goBoard() {
    document.location.href = "/board";
  }

  return (
    <div className="post_wrap">
      <table className="post">
        <tbody>
          <tr>
            <td className="item">제목</td>
            <td>{}</td>
          </tr>
          <tr>
            <td className="item">장르</td>
            <td>1</td>
          </tr>
          <tr>
            <td className="item">닉네임</td>
            <td className="post_nickname">1</td>
          </tr>
          <tr>
            <td className="item">내용</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>

      <div className="post_button_wrap">
        <button className="new_post_btn" onClick={goBoard}>목록으로</button>
      </div>
    </div>
  );
}

// 추후에 수정할 것
// gener -> genre
// UserId -> nickName


export default ViewPost;
