import React from 'react';
import {Link} from "react-router-dom";

class QuoteComponent extends React.Component {

    state = {
        wordData: [],
        editing: false,
        content: this.props.content,
    }

    render(){
        return(
            <div className="container wbdv-tab-data">

                <p className="wbdv-tab-thumbs">

                    {/*DELETE -- ONLY VISIBLE TO ADMIN AND UPLOADING USER*/}
                    {(this.props.profile.userType === "ADMIN" ||
                      this.props.profile.userId === this.props.content.contributor.userId) &&
                     <button className="wbdv-transparent-button" onClick={() =>
                         this.props.deleteQuote(this.props.content.contentId)}>
                         <i className="fa fa-trash wbdv-word-dislike-icon"
                            title="delete"/>
                     </button>}

                    {/*EDIT -- ONLY VISIBLE IF USER CONTRIBUTED AND NOT EDITING*/}
                    {this.props.profile.userId === this.props.content.contributor.userId && !this.state.editing &&
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
                    {this.props.profile.userId === this.props.content.contributor.userId && this.state.editing &&
                     <button className="wbdv-transparent-button"
                             onClick={()=> {
                                 this.setState({editing: false});
                                 this.props.updateQuote(this.state.content.contentId, this.state.content)
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
                 <p className="wbdv-tab-data-input">{this.state.content.text}</p>}
                {this.state.editing &&
                 <input type="text" className="container-fluid wbdv-input-data"
                        placeholder="Update quote here!"
                        value={this.state.content.text}
                        onChange={(e) => this.setState(
                            {content:
                                    {...this.state.content,
                                        text: e.target.value}})}
                 />}
                {!this.state.editing &&
                 <p className="wbdv-tab-data-user"> {this.state.content.book} ({this.state.content.author}) </p>}
                {this.state.editing &&
                 <input type="text" className="container-fluid wbdv-input-data"
                        placeholder="Update book here!"
                        value={this.state.content.book}
                        onChange={(e) => this.setState(
                            {content:
                                    {...this.state.content,
                                        book: e.target.value}})}
                 />}
                {this.state.editing &&
                 <input type="text" className="container-fluid wbdv-input-data"
                        placeholder="Update author here!"
                        value={this.state.content.author}
                        onChange={(e) => this.setState(
                            {content:
                                    {...this.state.content,
                                        author: e.target.value}})}
                 />}
                 <p className="wbdv-tab-data-user"> Submitted by:&nbsp;
                     <Link to={`/profile/${this.state.content.contributor.userId}`}>
                         {this.state.content.contributor.username}
                     </Link>
                 </p>
            </div>
        )
    }
}

export default QuoteComponent
