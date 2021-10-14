import axios from "axios";
import React, { Component } from "react";

class CheckPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      errorMessage: "",
      email: localStorage.getItem("ApplixID"),
      nickname: "",
    };
  }

  handleKeyevent = (e) => {
    if (e.key === "Enter") {
      this.handlePassword(e);
    }
  };

  handlePasswordCheck = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handlePassword = async () => {
    console.log(
      "현재이메일:",
      this.state.email,
      "패스워드:",
      this.state.password
    );

    const saveToken = document.cookie.replaceAll("=", "; ").split("; ");
    axios.defaults.headers.common["Authorization"] = `Bearer ${saveToken[1]}`;

    await axios
      // .post("서버 주소/login", userData)
      .post("http://3.35.208.49:5000/mypage/checkpassword", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            email: res.data.email,
            password: res.data.password,
            nickname: res.data.nickName,
          });
          document.location.href = "/modifyInfo";
        }
      })
      .catch((error) => {
        // console.log("에러", error.response.status);
        if (error.response) {
          // 404 : not found user
          this.setState({
            errorMessage: "찾을 수 없는 유저입니다",
          });
        } else if (error.request) {
          // 500 : server error
          this.setState({
            errorMessage: "서버로부터 응답을 받을 수 없습니다.",
          });
        } else {
          console.log("error", error.message);
        }
      });
  };

  render() {
    const { handlePassword, handlePasswordCheck, handleKeyevent } = this;
    const { email, password, nickname, errorMessage } = this.state;
    return (
      <div className="check_password_wrap">
        <div className="signup password">
          <span className="span">password</span>
          <input
            className="input input_password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handlePasswordCheck}
            onKeyPress={handleKeyevent}
          ></input>
        </div>

        <p className="error">{errorMessage}</p>

        <button
          className="check_btn"
          onClick={handlePassword}
          email={email}
          password={password}
          nickname={nickname}
        >
          확인
        </button>
      </div>
    );
  }
}

export default CheckPassword;
