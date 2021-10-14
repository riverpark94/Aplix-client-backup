import axios from "axios";
import React, { Component } from "react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      nickname: "",
      errorMessage: "",
    };
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleNicknameChange = (e) => {
    this.setState({
      nickname: e.target.value,
    });
  };

  handleSignup = (e) => {
    e.preventDefault();
    let error = document.getElementsByClassName("error")[0];
    const { email, password, nickname } = this.state;
    const signupData = { email: email, password: password, nickName: nickname };

    console.log(signupData.nickName);

    if (!signupData.email.includes("@")) {
      error.style.display = "block";
      this.setState({
        errorMessage: "이메일 형식에 맞지 않습니다.",
      });
    } else if (signupData.password.length < 8) {
      error.style.display = "block";
      this.setState({
        errorMessage: "비밀번호는 8자리 이상이어야 합니다.",
      });
    } else if (!signupData.nickName) {
      error.style.display = "block";
      this.setState({
        errorMessage: "닉네임을 입력해주세요.",
      });
    } else {
      error.style.display = "none";

      axios
        .post("http://3.35.208.49:5000/signup", signupData)
        .then((res) => {
          // 회원가입에 성공하면 로그인 페이지로 이동
          if (res.status === 201) {
            document.location.href = "/login";
          }
        })
        .catch((err) => {
          error.style.display = "block";
          this.setState({
            errorMessage: "이메일 또는 닉네임이 이미 존재합니다.",
          });
        });
    }
  };

  render() {
    const { email, password, nickname, errorMessage } = this.state;
    const {
      handleEmailChange,
      handlePasswordChange,
      handleNicknameChange,
      handleSignup,
    } = this;
    return (
      <div className="signup_wrap">
        <div className="signup email">
          <span className="span">EMAIL </span>
          <input
            className="input input_email"
            type="email"
            placeholder="ex) abc@google.com"
            email={email}
            onChange={handleEmailChange.bind(this)}
          ></input>
        </div>

        <div className="signup password">
          <span className="span">PASSWORD </span>
          <input
            className="input input_password"
            type="password"
            placeholder="비밀번호는 8자리 이상"
            password={password}
            onChange={handlePasswordChange.bind(this)}
          ></input>
        </div>

        <div className="signup nickname">
          <span className="span">NICKNAME </span>
          <input
            className="input input_nickname"
            type="text"
            placeholder="ex) 김코딩"
            nickname={nickname}
            onChange={handleNicknameChange.bind(this)}
          ></input>
        </div>

        <p className="error">{errorMessage}</p>

        <button className="signup_btn" onClick={handleSignup}>
          회원가입
        </button>
      </div>
    );
  }
}

export default Signup;
