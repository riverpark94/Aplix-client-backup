import React from "react";
import "./Logininput.css";

function Logininput({
  emailValue,
  passwordValue,
  onEmailChange,
  onPasswordChange,
  handleKeyevent,
}) {
  return (
    <div className="input">
      <label>EMAIL</label>
      <input
        type="email"
        value={emailValue}
        onChange={onEmailChange.bind(this)}
        placeholder="이메일을 넣어주세요"
        onKeyPress={handleKeyevent}
      ></input>
      <label>PASSWORD</label>
      <input
        type="password"
        value={passwordValue}
        onChange={onPasswordChange.bind(this)}
        placeholder="비밀번호를 넣어주세요"
        onKeyPress={handleKeyevent}
      ></input>
    </div>
  );
}

export default Logininput;
