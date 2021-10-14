import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ModifyPost from "./ModifyPost";

class ViewPost extends Component {
  //글수정하기 및 글삭제하기를 보낼 때, 해당 post id를 보내줘야 함.
  //userid인지 확인하기

  // componentDidMount() {
  //   axios
  //     .get("http://3.35.208.49:5000/board/openpost", {
  //       params: {
  //         id: this.props.currentPost.id
  //       }
  //     })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log(res.data)
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.request) {
  //         // 500 : server error
  //         this.setState({
  //           errorValue: "로그인 후 시도해주세요!",
  //         });
  //       }
  //     });
  // }

  modifyPost = (e) => {
    e.preventDefault();
    console.log(this.props)
    return (
      <ModifyPost currentPost={this.props.currentPost} />
    );
  };

  deletePost = (e) => {
    e.preventDefault();
    axios
      .get("http://3.35.208.49:5000/board/deletepost", {
        params: {
          id: this.props.currentPost.id
        }
      })
      .then((res) => {
        if (res.status === 200) {
          document.location.href = "/board";
        }
      })
      .catch((error) => {
        if (error.request) {
          // 500 : server error
          this.setState({
            errorValue: "로그인 후 시도해주세요!",
          });
        }
      });
  };

  render() {
    // console.log("View", this.props);
    return (
      <div className="post_wrap">
        <table className="post">
          <tbody>
            <tr>
              <td className="post_item">글 제목</td>
              <td className="post_title" colSpan="3">
                {this.props.currentPost.title}
              </td>
            </tr>

            <tr>
              <td className="post_item">장르</td>
              <td className="post_value">{this.props.currentPost.genre}</td>
              <td className="post_item">닉네임</td>
              <td className="post_value"></td>
            </tr>

            <tr>
              <td className="post_item">내용</td>
              <td className="post_text" colSpan="3">
                {this.props.currentPost.contents}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="view_button_wrap">
          <button className="modify_post_btn" onClick={this.modifyPost}>
            <Link to="/modifypost">글 수정하기</Link>
          </button>
          <button className="new_post_btn">
            <Link to="/board">목록으로</Link>
          </button>
          <button className="remove_post_btn" onClick={this.deletePost}>글 삭제하기</button>
        </div>
      </div>
    );
  }
}

export default ViewPost;

// import React from "react";

// function ViewPost(props) {
//   console.log("View", props);

//   return (
//     <div className="post_wrap">
//       <table className="post">
//         <tbody>
//           <tr>
//             <td className="item">제목</td>
//             <td>임시 테스트</td>
//           </tr>
//           <tr>
//             <td className="item">장르</td>
//             <td>1</td>
//           </tr>
//           <tr>
//             <td className="item">닉네임</td>
//             <td className="post_nickname">1</td>
//           </tr>
//           <tr>
//             <td className="item">내용</td>
//             <td>1</td>
//           </tr>
//         </tbody>
//       </table>

//       <div className="post_button_wrap">
//         <button
//           className="new_post_btn"
//           onClick={() => (document.location.href = "/board")}
//         >
//           목록으로
//         </button>
//       </div>
//     </div>
//   );
// }
