import React from "react";
import {Link} from "react-router-dom";

class LoginComponent extends React.Component {

    render() {
        return (
            <div className="container">

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
                               placeholder="Your Username"/>
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
                               placeholder="********"/>
                    </div>
                </div>

                {/*Sign In Button, Forgot Password, Sign Up*/}
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <button className="btn btn-primary btn-block"
                                // onClick= MAKE LOGIN FXN
                        >
                            Sign in
                        </button>
                        <Link to="/register" className="float-right" href="#">
                            Not account? Sign up! (MAKE THIS INTO A BUTTON!)
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent
