import React, { Component } from "react";
import { Link } from "react-router-dom";
import ViewPost from "../pages/ViewPost";

class BoardItem extends Component {
  viewPost = (e) => {
    e.preventDefault();
    let currentPost = this.props.post_data;
    this.props.handleBoardView(currentPost);
    console.log(currentPost)
    return (
      <ViewPost currentPost={currentPost} />
    );
  };

  render() {
    const writeDate = this.props.post_data.createdAt.substring(0, 10);
    const modifyDate = this.props.post_data.updatedAt.substring(0, 10);
    return (
      <tr onClick={this.viewPost}>
        <td>{this.props.post_data.id}</td>
        <td>{this.props.post_data.genre}</td>
        <td>
          <Link to="/viewpost">{this.props.post_data.title}</Link>
        </td>
        <td>{writeDate}</td>
        <td>{modifyDate}</td>
      </tr>
    );
  }
}

export default BoardItem;
