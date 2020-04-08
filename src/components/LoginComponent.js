import React from "react";
import {Link} from "react-router-dom";
import "./LoginComponent.css"
import {login} from "../services/UserService"

class LoginComponent extends React.Component {

    state = {
        username: '',
        password: ''
    }

    handleLogin = () => {
        login(this.state).then(currentUser => {
                if (currentUser === undefined) {
                    alert("Login failed. Please try again.")
                } else {
                    this.props.history.push('/profile')
                }})
    }

    render() {
        return (
            <div>
                <div id="wbdv-login-page-background">
                    <div id="wbdv-login-form-box" className="container">

                        <h2 className="wbdv-login-greeting">Salutations, Word Nerd!</h2>
                        <br/>

                        {/*Username*/}
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2 col-form-label">
                                Username
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       type="text"
                                       id="username"
                                       title="Username"
                                       placeholder="Your Username"
                                       value={this.state.username}
                                       onChange={(e) => this.setState({username: e.target.value})}/>
                            </div>
                        </div>

                        {/*Password*/}
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-2 col-form-label">
                                Password
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       type="password"
                                       id="password"
                                       title="Password"
                                       placeholder="********"
                                       value={this.state.password}
                                       onChange={(e) => this.setState({password: e.target.value})}/>
                            </div>
                        </div>

                        {/*Sign In Button, Forgot Password, Sign Up*/}
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <button className="btn btn-info btn-block"
                                        onClick={() => this.handleLogin()}
                                >
                                    Sign in
                                </button>
                                <br/>
                                <Link to="/register" className="float-right" href="#">
                                    <button className="btn btn-dark btn-block">
                                        No account? Sign up here!
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent
