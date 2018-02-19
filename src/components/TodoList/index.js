/**
 * Created by heyang on 2018/2/19.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem';

class TodoList extends Component {
    render() {
        return (
            <div className="panel-body">
                <ul className="list-group">
                    {
                        this.props.todos.map( (todo,index) => {
                            return <TodoItem key={index} todo={todo} index={index}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}

TodoList.propTypes = {
    todos : PropTypes.array.isRequired
}


export default TodoList