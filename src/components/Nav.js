import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

class Nav extends Component {
  state = {
    isOpen: false,
  };

  setIsMenuOpen(e) {
    this.setState((prev) => ({
      isOpen: !prev.isOpen,
    }));

    // e.target.classList.toggle("active");
  }

  render() {
    const { isLogin, userid } = this.props;
    //props 핸들링 함수
    const { handleLogoutClose } = this.props;
    const { setIsMenuOpen } = this;
    // document.addEventListener("click", setIsMenuOpen, false);
    return (
      <div>
        <nav>
          <div
            className={this.state.isOpen ? "ham-menu active" : "ham-menu"}
            onClick={setIsMenuOpen.bind(this)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul
            className={this.state.isOpen ? "open" : "close"}
            onClick={setIsMenuOpen.bind(this)}
          >
            {/* {isLogin ? (
              <li>
                <NavLink
                  exact
                  to={`/userid=${userid}`}
                  activeClassName="selected"
                >
                  홈
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink exact to="/" activeClassName="selected">
                  홈
                </NavLink>
              </li>
            )} */}
            <li>
              <NavLink
                to="/about"
                className="navlogo"
                activeClassName="navlogo selected"
              >
                {/* <img src={logo} className="navlogo" alt="logo" /> */}
                APPLIX
              </NavLink>
            </li>
            <li>
              <NavLink to="/board" activeClassName="selected">
                모임게시글
              </NavLink>
            </li>
            <li>
              <NavLink to="/movielist" activeClassName="selected">
                영화목록
              </NavLink>
            </li>
            {isLogin ? (
              <>
                <li onClick={handleLogoutClose}>
                  <NavLink
                    to={`/logout/userid=${userid}`}
                    activeClassName="selected"
                  >
                    로그아웃
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" activeClassName="selected">
                    로그인
                  </NavLink>
                </li>
              </>
            )}
            {isLogin ? (
              <>
                <li>
                  <NavLink to="/mypage" activeClassName="selected">
                    마이페이지
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/signup" activeClassName="selected">
                    회원가입
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
