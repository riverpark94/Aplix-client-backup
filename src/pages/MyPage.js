import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import movieIcon from "../img/movie.svg";
import pencil from "../img/pencil.svg";
import posts from "../img/posts.svg";

class MyPage extends Component {
  state = {
    refreshnickname: null,
  };

  componentDidMount() {
    const saveToken = document.cookie.replaceAll("=", "; ").split("; ");
    console.log("마이페이지", saveToken);
    if (saveToken[1]) {
      // 브라우저에 쿠키가 저장되어있다면 헤더값을 현재 로그인한 인증헤더로 유지한다.
      const saveToken = document.cookie.split("=");
      axios.defaults.headers.common["Authorization"] = `Bearer ${saveToken[1]}`;
    }

    if (saveToken[3]) {
      this.setState({
        nickname: saveToken[3],
      });
    } else {
      this.setState({
        nickname: "닉정보없음",
      });
    }
  }

  render() {
    const { nickname } = this.props;
    // console.log(nickname)
    return (
      <div className="mypage_wrap">
        <div className="info">
          <p className="welcome">
            <span>{nickname}</span> 님 환영합니다.
          </p>
        </div>

        <div className="mypage_list">
          <div className="list">
            <Link to="/board">
              <img src={posts} alt="icon" />
              <p>내가 쓴 게시글 목록</p>
            </Link>
          </div>
          <div className="list">
            <Link to="/movielist">
              <img src={movieIcon} alt="icon" />
              <p>내가 찜한 영화 목록</p>
            </Link>
          </div>
          <div className="list">
            <Link to="/mypage/checkpassword">
              <img src={pencil} alt="icon" />
              <p>회원정보변경</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default MyPage;
