import axios from "axios";
import React, { Component } from "react";
import "../components/MovieList.css";
import MovieListEntry from "../components/MovieListEntry";
import Modal from "../components/Modal";
//API - 배포 하기 전에 체크해야할 필수항목(노출X)
// import params from "../config/Api";
// console.log(params);
// {1,액션} 코드 값 넣어야함..
const moviegerne = [
  { code: 1, name: "드라마" },
  { code: 2, name: "판타지" },
  { code: 3, name: "서부" },
  { code: 4, name: "공포" },
  { code: 5, name: "로맨스" },
  { code: 6, name: "모험" },
  { code: 7, name: "스릴러" },
  { code: 8, name: "느와르" },
  { code: 9, name: "컬트" },
  { code: 10, name: "다큐멘터리" },
  { code: 11, name: "코미디" },
  { code: 12, name: "가족" },
  { code: 13, name: "미스터리" },
  { code: 14, name: "전쟁" },
  { code: 15, name: "애니메이션" },
  { code: 16, name: "범죄" },
  { code: 17, name: "뮤지컬" },
  { code: 18, name: "SF" },
];

class MovieList extends Component {
  state = {
    searchKeyword: "",
    searchGenre: "",
    sendGenre: "",
    errorValue: "",
    movies: null,
  };

  updateKeyword(e) {
    this.setState({
      searchKeyword: e.target.value,
    });
  }

  updateGenre(e) {
    let sendName = moviegerne.filter(
      (ele) => Number(e.target.value) === ele.code
    );

    this.setState({
      searchGenre: e.target.value,
      sendGenre: sendName[0].name,
    });

    console.log(this.state);
  }

  handleKeyevent = (e) => {
    if (e.key === "Enter") {
      this.onSearch();
    }
  };

  onSearch = async () => {
    const { searchKeyword, searchGenre } = this.state;
    const { setisModalOpen } = this.props;
    //유효성 검사
    if (searchKeyword === "") {
      this.setState({
        errorValue: "검색어가 비었네요!",
      });
      setisModalOpen();
    }

    let sendParams = {
      params: {
        query: "",
      },
    };
    // 장르가 들어왔을 때, get 요청을 위한 파라메터값 수정
    if (searchGenre !== "") {
      sendParams = {
        params: {
          query: searchKeyword,
          genre: searchGenre,
        },
      };
    } else {
      sendParams = {
        params: {
          query: searchKeyword,
        },
      };
    }

    console.log("검색파라메터값", sendParams);

    try {
      let movieData = await axios
        .get("http://3.35.208.49:5000/search", sendParams)
        .then((res) => res.data.items);

      if (movieData.length === 0) {
        this.setState({
          errorValue: "결과를 찾을 수 없습니다.",
        });
        setisModalOpen();
      } else {
        this.setState({ movies: movieData });
      }
    } catch (error) {
      if (error.response) {
        //결과를 찾을 수 없습니다.
        this.setState({
          errorValue: "결과를 찾을 수 없습니다.",
        });
        setisModalOpen();
      } else if (error.request) {
        // 500 : server error
        this.setState({
          errorValue: "서버로부터 응답을 받을 수 없습니다.",
        });
        setisModalOpen();
      } else {
        console.log("error", error.message);
      }
    }
  };

  makeWishList = async (e, data) => {
    let { isLogin, userid, setisModalOpen } = this.props;

    const sendWishBody = {
      userid: userid,
      title: data.title,
      director: data.director,
      actor: data.actor,
      image: data.image,
      link: data.link,
      genre: this.state.sendGenre,
    };

    const wishCount = 0;
    // 로그인한 유저이면 전송이 가능하고, 로그인 안한 유저는 불가능하다.
    if (isLogin) {
      await axios
        .post("http://3.35.208.49:5000/search", sendWishBody)
        .then((res) => {
          console.log(res);
          localStorage.setItem(`wish${userid}?${wishCount}`, data.title);
        })
        .catch((error) => {
          if (error.response) {
            // 409 : 중복되는 찜목록
            this.setState({
              errorValue: "이미 찜하신 목록입니다",
            });
            setisModalOpen();
          } else if (error.request) {
            // 500 : server error
            this.setState({
              errorValue: "서버로부터 응답을 받을 수 없습니다.",
            });
            setisModalOpen();
          } else {
            console.log("error", error.message);
          }
        });
      // res.status  성공적으로 받아왔다면 해당 스테이터스 확인 후 classList.add로 변환하기
      e.target.classList.toggle("active");
    } else {
      this.setState({
        errorValue: "로그인 후 시도해주세요!",
      });
      setisModalOpen();
    }
  };

  render() {
    const { searchKeyword, searchGenre, movies, errorValue } = this.state;
    const {
      updateKeyword,
      updateGenre,
      onSearch,
      makeWishList,
      handleKeyevent,
    } = this;
    // props
    const { isModalopen, setisModalOpen } = this.props;

    return (
      <>
        <Modal
          errorValue={errorValue}
          isModalopen={isModalopen}
          setisModalOpen={setisModalOpen}
        />
        <div className="movieContents">
          <div className="row h30">
            <select value={searchGenre} onChange={updateGenre.bind(this)}>
              <option disabled hidden value=""></option>
              {moviegerne.map((ele) => (
                <option value={ele.code} key={ele.code} name={ele.name}>
                  {ele.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="영화명을 검색해주세요"
              onKeyPress={handleKeyevent}
              value={searchKeyword}
              onChange={updateKeyword.bind(this)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                onSearch();
              }}
            >
              검색
            </button>
          </div>
          <div className="row h80">
            {!movies ? (
              <div>보고 싶은 영화를 검색하세요!</div>
            ) : (
              <>
                <div className="btn_left">
                  <span></span>
                </div>
                <ul className="slider">
                  {movies.map((ele) => (
                    <MovieListEntry
                      key={ele.link}
                      movies={ele}
                      makeWishList={makeWishList}
                      isModalopen={isModalopen}
                    />
                  ))}
                </ul>
                <div className="btn_right">
                  <span></span>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MovieList;

// ---------- ---------- local test ----------  ----------
// const { IDkey, SCkey } = params;

// let url = `/v1/search/movie.json`;

// let movieData = await axios
//   .get(url, {
//     params: { query: keyword, display: 10 },
//     headers: {
//       "X-Naver-Client-Id": IDkey,
//       "X-Naver-Client-Secret": SCkey,
//     },
//   })
//   .then((res) => res.data.items);

// silderAnimation = () => {
//   const wrap = document.querySelector(".row h80");
//   console.log("wrap:", wrap);
//   const target = document.querySelector(".silder");
//   // const target = wrap.children[0];
//   // const len = target.children.length; // silde li갯수

//   // // .slide ul의 너비 조정
//   // target.style.cssText = `width:calc(100% * ${len});display:flex;transition:1s`;
//   // // .slide li의 너비 조정
//   // Array.from(target.children).forEach(
//   //   (ele) => (ele.style.cssText = `width:calc(100% / ${len});`)
//   // );
//   // // 화면 전환 실행
//   // let pos = 0;
//   // setInterval(() => {
//   //   pos = (pos + 1) % len; // 장면 선택
//   //   target.style.marginLeft = `${-pos * 100}%`;
//   // }, 1500); // 1500 = 1500ms = 1.5sec. 즉, 1.5초 마다 실행
// };
