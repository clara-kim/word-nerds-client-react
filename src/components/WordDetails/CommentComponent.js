import React from 'react';

class CommentComponent extends React.Component {

    state = {
        wordData: [],
        likes: 9,
        dislikes: 1,
        editing: false,
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

                    {/*EDIT -- ONLY VISIBLE IF USER CONTRIBUTED AND NOT EDITING*/}
                    {this.props.profile.userType === "ADMIN" && !this.state.editing &&
                    //{this.props.profile.userId === this.props.content.contributor.userId && !this.state.editing &&
                     <button className="wbdv-transparent-button" onClick={()=>this.setState({editing: true})}>
                         <i className="fa fa-edit wbdv-edit-icon"
                            title="edit"/>
                         <br/>
                         <span className="wbdv-edit-text">
                            EDIT
                        </span>
                     </button>
                    }

                    {/*SAVE -- ONLY VISIBLE IF USER CONTRIBUTED AND IS EDITING*/}
                    {this.props.profile.userType === "ADMIN" && this.state.editing &&
                     //{this.props.profile.userId === this.props.content.contributor.userId && !this.state.editing &&
                     <button className="wbdv-transparent-button" onClick={()=>this.setState({editing: false})}>
                         <i className="fa fa-save wbdv-edit-icon"
                            title="save"/>
                         <br/>
                         <span className="wbdv-edit-text">
                            SAVE
                        </span>
                     </button>
                    }
                </p>

                {/*THE COMMENT*/}
                {!this.state.editing &&
                 <p className="wbdv-tab-data-input">A user-submitted comment would go here.</p>}
                {this.state.editing && <input type="text" className="container-fluid wbdv-input-data"/>}
                <p className="wbdv-tab-data-user"> Submitted by: User </p>
            </div>
        )
    }
}

export default CommentComponent
