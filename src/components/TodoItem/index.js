/**
 * Created by heyang on 2018/2/19.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';

class TodoItem extends Component {

    handleChange = (e) => {
        let isChecked = e.target.checked;
        let content = this.refs.refTxt.innerText;
        let todo = {
            isChecked : isChecked,
            content : content
        };
        let data = {
            index : this.props.index,
            todo : todo
        };
        PubSub.publish("updateSingleItem",data);
    };

    handleMouseOver = () => {
        this.refs.delBtn.style = "display:block";
    };
    handleMouseOut = () => {
        this.refs.delBtn.style = "display:none";
    };

    handleClick = () => {
        PubSub.publish("delTodo",this.props.index);
    };
    render() {
        const todo = this.props.todo;
        return (
            <li className="list-group-item" onMouseOut={this.handleMouseOut} onMouseOver={this.handleMouseOver}>
                <div className="input-group col-md-12">
                    <div className="col-md-6">
                        <label className="checkbox-inline">
                            <input type="checkbox" onChange={this.handleChange} checked = {todo.isChecked}/> <span ref="refTxt">{todo.content}</span>
                        </label>
                    </div>
                    <div className="col-md-2 col-md-offset-4">
                        <a className="btn btn-danger btn-xs" style={{display:'none'}} ref="delBtn" onClick={this.handleClick}>删除</a>
                    </div>
                </div>
            </li>
        )
    }
}

TodoItem.propTypes = {
    todo : PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}

export default TodoItem;