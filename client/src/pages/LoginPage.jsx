import React, { Component } from 'react';
import axios from 'axios';
import "./LoginPage.css"

export default class LoginPage extends Component {
  state = {
    username: "",
    email: "",
    age: ""
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    }, () => {
      console.log(this.state);
    });
  }

  handleBtnSubmit = () => {
    // Need to check empty fields first
    const state = this.state;
    axios.post('/auth/create', {
      name: state.username,
      email: state.email,
      age: state.age
    })
      .then((res) => {
        console.log(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="login-form">
        <h1>Tạo người dùng mới</h1>
        <div className="username">
          <span>Name:</span>
          <input name="username" type="text" onChange={this.handleInputChange}/>
        </div>
        <div className="email">
          <span>Email:</span>
          <input name="email" type="text" onChange={this.handleInputChange}/>
        </div>
        <div className="age">
          <span>Age:</span>
          <input name="age" type="number" onChange={this.handleInputChange}/>
        </div>
        <div className="btn-group">
          <button className="btn-submit" onClick={this.handleBtnSubmit}>Đăng kí</button>
          <button className="btn-cancel">Quay lại</button>
        </div>
      </div>
    )
  }
}
