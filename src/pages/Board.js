import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import BoardItem from "../components/BoardItem";
import NewPost from "./NewPost";
import Modal from "../components/Modal";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_data: [],
      nickname: this.props.nickname,
      errorValue: "",
    };
  }

  componentDidMount() {
    const saveToken = document.cookie.replaceAll("=", "; ").split("; ");

    if (saveToken[1]) {
      // 브라우저에 쿠키가 저장되어있다면 헤더값을 현재 로그인한 인증헤더로 유지한다.
      axios.defaults.headers.common["Authorization"] = `Bearer ${saveToken[1]}`;
    }

    axios
      .get("http://3.35.208.49:5000/board")
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            post_data: res.data,
          });
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
  }

  newPost = (e) => {
    e.preventDefault();
    return <NewPost nickname={this.props.nickname} />;
  };

  handleBoardModal() {}

  render() {
    const { post_data, errorValue } = this.state;
    let { handleBoardView, isLogin, isModalopen, setisModalOpen } = this.props;

    isModalopen = true;

    return (
      <div className="board_wrap">
        {isLogin ? (
          <>
            <table className="board">
              <tbody>
                <tr className="board_title">
                  <th className="no">번호</th>
                  <th className="genre">장르</th>
                  <th className="title">제목</th>
                  <th className="writer">등록일</th>
                  <th className="write_date">수정일</th>
                </tr>
                {post_data.map((el) => (
                  <BoardItem
                    key={el.id}
                    post_data={el}
                    handleBoardView={handleBoardView}
                  />
                ))}
              </tbody>
            </table>

            <div className="board_button_wrap">
              <button className="new_post_btn prev_btn">이전 목록</button>
              <button className="new_post_btn" onClick={this.newPost}>
                <Link to="/newpost">글쓰기</Link>
              </button>
              <button className="new_post_btn next_btn">다음 목록</button>
            </div>
          </>
        ) : (
          <>
            <Modal
              errorValue={errorValue}
              isModalopen={isModalopen}
              setisModalOpen={setisModalOpen}
            />
          </>
        )}
      </div>
    );
  }
}

export default Board;
