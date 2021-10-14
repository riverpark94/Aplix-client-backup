import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const moviegerne = [
  "드라마",
  "판타지",
  "서부",
  "공포",
  "로맨스",
  "모험",
  "스릴러",
  "느와르",
  "컬트",
  "다큐멘터리",
  "코미디",
  "가족",
  "미스터리",
  "전쟁",
  "애니메이션",
  "범죄",
  "뮤지컬",
  "SF",
];

class NewPost extends Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
      post_title: "",
      post_genre: "",
      post_content: "",
      nickname: this.props.nickname,
    };
  }

  handleTitleChange = (e) => {
    this.setState({
      post_title: e.target.value,
    });
  };

  handleGenreChange = (e) => {
    this.setState({
      post_genre: e.target.value,
    });
  };

  handleContentChange = (e) => {
    this.setState({
      post_content: e.target.value,
    });
  };

  goBoard = () => {
    const { post_title, post_genre, post_content } = this.state;
    const postData = {
      title: post_title,
      genre: post_genre,
      contents: post_content,
    };
    console.log("새글쓰기", axios.defaults.headers.common.Authorization);
    axios
      .post("http://3.35.208.49:5000/board/newpost", postData)
      .then((res) => {
        console.log(res.data);
        document.location.href = "/board";
      })
      .catch((error) => {
        if (error.response) {
          // 422 : 모든 칸  >> 서버에서 안 오고 있음
          alert("모든 칸을 입력해주세요");
        } else if (error.request) {
          // 500 : server error
          console.log(error);
        }
      });
  };

  render() {
    const {
      handleTitleChange,
      handleGenreChange,
      handleContentChange,
      goBoard,
    } = this;
    return (
      <div className="post_wrap">
        <table className="post">
          <tbody>
            <tr>
              <td className="post_item">글 제목</td>
              <td className="post_title" colSpan="3">
                <input onChange={handleTitleChange.bind(this)}></input>
              </td>
            </tr>

            <tr>
              <td className="post_item">장르</td>
              <td className="post_value">
                <select defaultValue="" onChange={handleGenreChange.bind(this)}>
                  <option disabled hidden value=""></option>
                  {moviegerne.map((ele) => (
                    <option value={ele} key={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              </td>
              <td className="post_item">닉네임</td>
              <td className="post_value">{this.props.nickname}</td>
            </tr>

            <tr>
              <td className="post_item">내용</td>
              <td className="post_text" colSpan="3">
                <textarea onChange={handleContentChange.bind(this)}></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="post_button_wrap">
          <button className="new_post_btn">
            <Link to="/board">목록으로</Link>
          </button>

          <button className="new_post_btn" onClick={goBoard}>
            작성완료
          </button>
        </div>
      </div>
    );
  }
}

export default NewPost;
