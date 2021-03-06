import React from 'react';
import './login.css';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Alerts from "../Login/alert";
import axios from 'axios';



class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      loginStatus: 'IS_LOGGED',
      clickedSubmit: false,
      errors: false,
      status: false, 
    }


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    const { username, password } = this.state;
    this.setState({ clickedSubmit: true });

    const obj = {
      loginName: username,
      loginPassword: password
    };

    var status;
    axios.post('http://localhost:5000/login', obj)
      .then(res => {
        console.log(res);
        status = res.data;
        this.setState({ status: status });
        console.log(this.state.status);
        if (this.state.status) {
          window.location.href = "/dashboard"
          console.log("successful login");
        } else {
          alert("Incorrect Username or Password!")
        }
      })
      .catch(err => console.log(err));

    event.preventDefault();
  }





  emptyOrNot = () => {
    if (this.state.username !== '' && this.state.password !== '') {
      return false;
    } else {
      return true;
    }
  }


  renderLogin() {
    return (
      <div className="background">
        <Box
          boxShadow={3}
        >
          <Card style={{ width: "350px", height: "410px" }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/03/Bpatriots_1.jpg" alt="BHS Logo" style={{ paddingLeft: '83px' }} height="175" width="175" />
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
            >
              <TextValidator
                label="Username"
                onChange={this.handleChange}
                name="username"
                value={this.state.username}
                style={{ position: 'relative', left: '5px', bottom: '15px', width: '320px', height: '20px' }}
              />
              <TextField
                type="password"
                label="Password"
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
                style={{ position: 'relative', left: "5px", top: '35px', width: '320px', height: '20px' }} />
              <a href="/reset-password" className="forgot">Forgot Password?</a>
              <Button type="submit" variant="contained" color="primary" disabled={this.emptyOrNot()} onClick={this.handleSubmit} className="button">
                Sign In
              </Button>
              <p style={{ fontSize: "16px", position: 'relative', top: '100px', left: '50px', color: 'gray' }}>Not Registered?<span><a href="/register" style={{ color: 'blue', textDecoration: 'none' }}> Create an account</a></span></p>
            </ValidatorForm>
          </Card>
        </Box>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderLogin()}
      </div>
    )
  }
}

export default Login;
