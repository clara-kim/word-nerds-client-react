import React from 'react';
import {Link} from "react-router-dom";

class QuoteComponent extends React.Component {

    state = {
        wordData: [],
        likes: 17,
        dislikes: 4,
        editing: false,
        quote: this.props.quote,
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

                    {/*DELETE -- ONLY VISIBLE TO ADMIN AND UPLOADING USER*/}
                    {this.props.profile.userType === "ADMIN" &&
                     <button className="wbdv-transparent-button" onClick={() =>
                         this.props.deleteQuote(this.props.quote.contentId)}>
                         <i className="fa fa-trash wbdv-word-dislike-icon"
                            title="delete"/>
                     </button>}

                    {/*EDIT -- ONLY VISIBLE IF USER CONTRIBUTED AND NOT EDITING*/}
                    {this.props.profile.userType !== "ADMIN" && !this.state.editing &&
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
                    {this.props.profile.userType !== "ADMIN" && this.state.editing &&
                     //{this.props.profile.userId === this.props.content.contributor.userId && !this.state.editing &&
                     <button className="wbdv-transparent-button"
                             onClick={()=> {
                                 this.setState({editing: false});
                                 this.props.updateQuote(this.state.quote)
                             }}>
                         <i className="fa fa-save wbdv-edit-icon"
                            title="save"/>
                         <br/>
                         <span className="wbdv-edit-text">
                            SAVE
                        </span>
                     </button>
                    }
                </p>

                {/*THE QUOTE*/}
                {!this.state.editing &&
                 <p className="wbdv-tab-data-input">{this.state.quote.text}</p>}
                {this.state.editing &&
                 <input type="text" className="container-fluid wbdv-input-data"
                        placeholder="Update quote here!"
                        value={this.state.quote.text}
                        onChange={(e) => this.setState(
                            {quote:
                                    {...this.state.quote,
                                        text: e.target.value}})}
                 />}
                {!this.state.editing &&
                 <p className="wbdv-tab-data-user"> {this.state.quote.book} ({this.state.quote.author}) </p>}
                {this.state.editing &&
                 <input type="text" className="container-fluid wbdv-input-data"
                        placeholder="Update book here!"
                        value={this.state.quote.book}
                        onChange={(e) => this.setState(
                            {quote:
                                    {...this.state.quote,
                                        book: e.target.value}})}
                 />}
                {this.state.editing &&
                 <input type="text" className="container-fluid wbdv-input-data"
                        placeholder="Update author here!"
                        value={this.state.quote.author}
                        onChange={(e) => this.setState(
                            {quote:
                                    {...this.state.quote,
                                        author: e.target.value}})}
                 />}
                 <p className="wbdv-tab-data-user"> Submitted by:&nbsp;
                     <Link to={`/profile/${this.state.quote.contributor.userId}`}>
                         {this.state.quote.contributor.username}
                     </Link>
                 </p>
            </div>
        )
    }
}

export default QuoteComponent
