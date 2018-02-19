/**
 * Created by heyang on 2018/2/19.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';

class TodoFooter extends Component {

    handleChange = (e) => {
        let isChecked = e.target.checked;
        PubSub.publish('seleclAll',isChecked);
    }

    componentDidMount() {
        PubSub.subscribe("unSelectAll",(msg, isShowCheckAll) => {
            this.refs.checkAll.checked = isShowCheckAll;
        });
    }

    render() {
        let todos = this.props.todos;
        let finishTodoLength = 0;
        todos.map( (todo,index) => {
            if(todo.isChecked){
                finishTodoLength++;
            }
            return null;
        });
        return (
            <div className="panel-footer">
                <div className="input-group col-md-12">
                    <div className="col-md-6">
                        <label className="checkbox-inline">
                            <input type="checkbox" ref="checkAll" onChange={this.handleChange}/> 全选
                        </label>
                    </div>
                    <div className="col-md-6">
                        已完成 {finishTodoLength} 个任务 ／ 共 {todos.length} 个任务
                    </div>
                </div>
            </div>
        )
    }
}

TodoFooter.propTypes = {
    todos : PropTypes.array.isRequired
}

export default TodoFooter