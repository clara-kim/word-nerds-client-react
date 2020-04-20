import React from 'react';

class QuoteComponent extends React.Component {

    state = {
        wordData: [],
        likes: 17,
        dislikes: 4,
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
            <div className="container wbdv-tab-data">
                {/*THUMBS UP AND THUMBS DOWN*/}
                <p className="wbdv-tab-thumbs">

                    {/*THUMBS UP*/}
                    <button className="wbdv-transparent-button" onClick={()=>this.increaseLike()}>
                        <i className="fa fa-thumbs-up wbdv-word-like-icon"
                           title="like"/>
                        <br/>
                        <span className="wbdv-word-like-number">
                            {this.state.likes}
                                            </span>
                    </button>

                    {/*THUMBS DOWN*/}
                    <button className="wbdv-transparent-button" onClick={()=>this.increaseDislike()}>
                        <i className="fa fa-thumbs-down wbdv-word-dislike-icon"
                           title="dislike"/>
                        <br/>
                        <span className="wbdv-word-dislike-number">
                            {this.state.dislikes}
                                            </span>
                    </button>
                </p>

                {/*THE QUOTE*/}
                <p className="wbdv-tab-data-input">A user-submitted quote would go here.</p>
                <p className="wbdv-tab-data-user"> Book (Author) </p>
                <p className="wbdv-tab-data-user"> Submitted by: User </p>
            </div>
        )
    }
}

export default QuoteComponent
