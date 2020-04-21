import React from 'react';

class DefinitionComponent extends React.Component {

    state = {
        wordData: [],
        likes: 9,
        dislikes: 1,
    }

    // IF NOT SIGNED IN, CLICKING LIKE OR DISLIKE OPENS POP-UP
    increaseLike = () => {
        if (this.props.profile.userType === "PUBLIC") {
            alert("You must be logged in to perform this action!")
        }
        else {
            this.setState({likes: this.state.likes + 1})
        }
    }

    increaseDislike = () => {
        if (this.props.profile.userType === "PUBLIC") {
            alert("You must be logged in to perform this action!")
        }
        else {
            this.setState({dislikes: this.state.dislikes + 1})
        }
    }


    render(){
        return(
            <div className="container wbdv-def-data">

                {/*THUMBS UP AND THUMBS DOWN*/}
                <p className="wbdv-tab-thumbs">

                    {/*THUMBS UP*/}
                    <button className="wbdv-transparent-button"
                            onClick={()=>this.increaseLike()}>
                        <i className="fa fa-thumbs-up wbdv-word-like-icon"
                           title="like"/>
                        <br/>
                        <span className="wbdv-word-like-number">
                            {this.state.likes}
                        </span>
                    </button>

                    {/*THUMBS DOWN*/}
                    <button className="wbdv-transparent-button"
                            onClick={()=>this.increaseDislike()}>
                        <i className="fa fa-thumbs-down wbdv-word-dislike-icon"
                           title="dislike"/>
                        <br/>
                        <span className="wbdv-word-dislike-number">
                            {this.state.dislikes}
                        </span>
                    </button>

                    {/*DELETE -- ONLY VISIBLE TO ADMIN*/}
                    {this.props.profile.userType === "ADMIN" &&
                     <button className="wbdv-transparent-button">
                        <i className="fa fa-trash wbdv-word-dislike-icon"
                           title="delete"/>
                    </button>}
                </p>

                {/*THE DEFINITION*/}
                <p className="wbdv-tab-data-input">A user-submitted definition would go here.</p>
                <p className="wbdv-tab-data-user"> Submitted by: User </p>
            </div>
        )
    }
}

export default DefinitionComponent
