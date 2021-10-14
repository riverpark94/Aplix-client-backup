import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Logininput from "../components/Logininput";

// axios.defaults.withCredentials = false;

class Login extends Component {
  state = {
    emailValue: localStorage.getItem("ApplixID") || "",
    passwordValue: "",
    errorValue: "",
    rememberchecked: JSON.parse(localStorage.getItem("rmbChkbox")) || false,
  };

  handleKeyevent = (e) => {
    if (e.key === "Enter") {
      this.handleLogin(e);
    }
  };

  handleEmailChange = (e) => {
    this.setState({
      emailValue: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      passwordValue: e.target.value,
    });
  };

  onCheckboxChangeHandler = (e) => {
    this.setState((prevState) => ({
      rememberchecked: !prevState.rememberchecked,
    }));

    if (e.target.checked) {
      localStorage.setItem("ApplixID", this.state.emailValue);
      localStorage.setItem("rmbChkbox", !this.state.rememberchecked);
    } else {
      localStorage.removeItem("ApplixID");
      localStorage.removeItem("rmbChkbox");
    }
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const { emailValue, passwordValue } = this.state;
    let { onLogin } = this.props;
    // 유효성 검사
    const props = ["emailValue", "passwordValue"];
    const result = props.every((ele) => this.state[ele] !== "");
    const userData = { email: emailValue, password: passwordValue };
    // axios 를 통해 서버 연결을 받아와서 출력 표시
    if (result) {
      await axios
        // {withCredentials: true,crossDomain: true}
        .post("http://3.35.208.49:5000/signin", userData, {
          withCredentials: true,
          crossDomain: true,
          credentials: "include",
        })
        .then((res) => {
          const accessToken = res.data;

          if (document.cookie === "") {
            document.cookie = `sid=${accessToken.token}`;
          } else {
            const compareToken = document.cookie.split("=");
            if (accessToken.token !== compareToken[1]) {
              document.cookie = `sid=${accessToken.token}`;
              // console.log("로그인후토큰", accessToken.token);
              // console.log("쿠키저장토큰", compareToken[1]);
            } else {
              // console.log("로그인후토큰", accessToken.token);
              // console.log("쿠키저장토큰", compareToken[1]);
              console.log("토큰 값이 동일하여 갱신하지 않습니다.");
            }
          }
          onLogin(res.data.id, res.data.nickName, accessToken);
        })
        .catch((error) => {
          // console.log("에러", error.response.status);
          if (error.response) {
            // 404 : not found user
            this.setState({
              errorValue: "찾을 수 없는 유저입니다",
            });
          } else if (error.request) {
            // 500 : server error
            this.setState({
              errorValue: "서버로부터 응답을 받을 수 없습니다.",
            });
          } else {
            console.log("error", error.message);
          }
        });
    } else {
      this.setState({
        errorValue: "비어있는 칸이 있습니다!",
      });
    }
  };

  render() {
    const {
      emailValue,
      passwordValue,
      errorValue,
      rememberchecked,
    } = this.state;
    let { isLogin } = this.props;
    const {
      handleEmailChange,
      handlePasswordChange,
      handleLogin,
      onCheckboxChangeHandler,
      handleKeyevent,
    } = this;

    return (
      <>
        <div className="generalLogin">
          {isLogin ? (
            <Redirect to={"/mypage"} />
          ) : (
            <>
              <Logininput
                emailValue={emailValue}
                passwordValue={passwordValue}
                onEmailChange={handleEmailChange.bind(this)}
                onPasswordChange={handlePasswordChange.bind(this)}
                handleKeyevent={handleKeyevent}
              />
              <div className="rememberChkbox">
                <input
                  type="checkbox"
                  checked={rememberchecked}
                  onChange={onCheckboxChangeHandler}
                />
                <p>아이디 기억하기</p>
              </div>
              {errorValue !== "" ? (
                <p className="errorPtag"> {errorValue} </p>
              ) : (
                <p></p>
              )}
              <button className="generalLoginBtn" onClick={handleLogin}>
                Login
              </button>
            </>
          )}
          <hr />
          <div className="socialLogin">
            <h2>간편로그인</h2>
            <button
              className="btn-social-login"
              style={{ background: "#D93025" }}
            >
              <i className="xi-2x xi-google"></i>
            </button>
            <button
              className="btn-social-login"
              style={{ background: "#1FC700" }}
            >
              <i className="xi-2x xi-naver"></i>
            </button>
            <button
              className="btn-social-login"
              style={{ background: "#FFEB00" }}
            >
              <i className="xi-2x xi-kakaotalk text-dark"></i>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
