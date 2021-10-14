import axios from "axios";
import React, { Component } from "react";

class ModifyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("ApplixID"),
      password: "",
      nickname: "",
      errorMessage: "",
    };
  }

  handleKeyevent = (e) => {
    if (e.key === "Enter") {
      this.ModifyCheck(e);
    }
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

  ModifyCheck = async (e) => {
    e.preventDefault();
    let error = document.getElementsByClassName("error")[0];
    const { password, nickname } = this.state;
    const modifyData = { password: password, nickName: nickname };

    console.log("정보변경 Headers : ", axios.defaults.headers);
    if (!modifyData.password || modifyData.password.length < 8) {
      error.style.display = "block";
      error.textContent = "비밀번호는 8자리 이상이어야 합니다.";
    } else if (!modifyData.nickName) {
      error.style.display = "block";
      error.textContent = "닉네임을 입력해주세요.";
    } else {
      error.style.display = "none";

      const saveToken = document.cookie.replaceAll("=", "; ").split("; ");
      axios.defaults.headers.common["Authorization"] = `Bearer ${saveToken[1]}`;

      await axios
        .put("http://3.35.208.49:5000/mypage/userinfo", modifyData)
        .then((res) => {
          // console.log("마이페이지성공", res.data);
          // 회원정보 변경에 성공하면 mypage로 이동
          if (res.status === 200) {
            document.cookie = `nick=${nickname}`;
            document.location.href = "/mypage";
          } else if (res.status === 409) {
            error.style.display = "block";
            this.setState({
              errorMessage: "이메일 또는 닉네임이 이미 존재합니다.",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    const { email, password, nickname, errorMessage } = this.state;
    const {
      handlePasswordChange,
      handleNicknameChange,
      ModifyCheck,
      handleKeyevent,
    } = this;

    return (
      <div className="signup_wrap">
        <div className="signup email">
          <span className="span">email: </span>
          <input
            className="input input_email"
            type="email"
            defaultValue={email}
            readOnly
          ></input>
        </div>

        <div className="signup password">
          <span className="span">password: </span>
          <input
            className="input input_password"
            type="password"
            placeholder="비밀번호는 8자리 이상"
            password={password}
            onChange={handlePasswordChange.bind(this)}
            onKeyPress={handleKeyevent}
          ></input>
        </div>

        <div className="signup nickname">
          <span className="span">nickname: </span>
          <input
            className="input input_nickname"
            type="text"
            defaultValue={nickname}
            nickname={nickname}
            onChange={handleNicknameChange.bind(this)}
            onKeyPress={handleKeyevent}
          ></input>
        </div>

        <p className="error">{errorMessage}</p>

        <button className="signup_btn" onClick={ModifyCheck}>
          수정완료
        </button>
      </div>
    );
  }
}

export default ModifyInfo;
