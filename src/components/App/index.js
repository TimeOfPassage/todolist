import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import TodoList from '../TodoList/index';
import TodoFooter from '../TodoFooter/index';

class App extends Component {
  constructor() {
    super();
    this.state = {
       todos : [
           {
               isChecked:false,
               content: '吃饭'
           },
           {
               isChecked:true,
               content: '睡觉'
           },
           {
               isChecked:true,
               content: '睡觉'
           }
       ]
    }
  }
  componentDidMount() {
      PubSub.subscribe("updateSingleItem",(msg,data) => {
          let todos = this.state.todos;
          todos.splice(data.index,1,data.todo);
          this.setState({
              todos
          });
          this.handleSelectAllState();
      });
      PubSub.subscribe("delTodo",(msg,index) => {
          let todos = this.state.todos;
          todos.splice(index,1);
          this.setState({
              todos
          })
      });

      PubSub.subscribe("seleclAll",(msg,isChecked) => {
          let todos = this.state.todos;
          todos.map( (todo,index) => {
              todo.isChecked = isChecked;
              return null;
          });
          this.setState({
              todos
          })
      });
  }

    handleSelectAllState = () => {
        let todos = this.state.todos;
        //判断全选按钮的状态
        let allCheckLen = todos.length;
        let isCheckedLen = 0;
        todos.map( (todo,index) => {
            if(todo.isChecked){
                isCheckedLen++;
            }
            return null;
        });
        let isShowCheckAll = false;
        if(isCheckedLen === allCheckLen){
            isShowCheckAll = true;
        }
        PubSub.publish("unSelectAll",isShowCheckAll);
    };

  handleKeyUp = (e) => {
      if(e.keyCode === 13){
          if(e.target.value === "")
              return;
          let todo = {
              isChecked : false,
              content : e.target.value
          };
          let todos = this.state.todos;
          todos.unshift(todo);
          this.setState({
                todos
          });
          e.target.value = '';
          this.handleSelectAllState();
      }
  };

  render() {
    return (
        <div className="container">
          <div className="col-md-6 col-md-offset-3">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h1 style={{marginBottom: '20px'}}>
                  <center>
                    TodoList App Demo
                  </center>
                </h1>
                <input type="text" onKeyUp={this.handleKeyUp} className="form-control" placeholder="回车完成输入"/>
              </div>
              <TodoList todos={this.state.todos}/>
              <TodoFooter todos={this.state.todos}/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
