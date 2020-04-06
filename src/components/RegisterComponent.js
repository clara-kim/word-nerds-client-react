import React from "react";
import {register} from "../services/UserService"
import "./RegisterComponent.css"

class RegisterComponent extends React.Component {

    state = {
        username: '',
        password: '',
        verifyPassword: ''
    }

    handleRegister = () => {
        // console.log(this.state)
        // this.props.history.push('/profile')
        register(this.state)
            .then(newUser => this.props.history.push('/profile'))
    }

    render() {
        return (
            <div id="wbdv-register-page-background">
                <div className="container-fluid" id="wbdv-register-form-box">

                    <h2 className="wbdv-register-greeting">
                        Be dubbed a Word Nerd!
                    </h2>
                    <br/>

                    {/*Username*/}
                    <div className="form-group row">
                        <label for="username" className="col-sm-2 col-form-label">
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
                        <label for="password" className="col-sm-2 col-form-label">
                            Password
                        </label>
                        <div className="col-sm-10">
                            <input type="password"
                                   className="form-control"
                                   id="password"
                                   title="Password"
                                   placeholder="********"
                                   value={this.state.password}
                                   onChange={(e) => this.setState({password: e.target.value})}/>
                            <span className="wbdv-encryption-note">
                                Please note that passwords are not encrypted.
                            </span>
                        </div>
                    </div>

                    {/*Verify Password*/}
                    <div className="form-group row">
                        <label for="password" className="col-sm-2 col-form-label">
                            Verify Password
                        </label>
                        <div className="col-sm-10">
                            <input type="password"
                                   className="form-control"
                                   id="verify-password"
                                   title="Verify Password"
                                   placeholder="********"
                                   value={this.state.verifyPassword}
                                   onChange={(e) => this.setState({verifyPassword: e.target.value})}/>
                        </div>
                    </div>

                    {/*Register and Sign In Link*/}
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <button className="btn btn-info btn-block"
                                    onClick={() => this.handleRegister()}>
                                Register!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterComponent
