import React, { useState, useEffect } from 'react';  // need this to use React functionality
import './App.css'; 
import DataService from './DataService';

// this component is the individual Todo item - we render the text as either normal or strikethrough
// we also render Complete and Delete buttons
// we also pass in the todo item (from where we get the name), the index in the list,
// plus the functions to call when someone clicks the Complete or Delete button
function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div className="todo" data-cy="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }} >
      { todo.text }
      <div>
        <button onClick={() => completeTodo(todo.id)}>Complete</button>
        <button onClick={() => removeTodo(todo.id)}>X</button>
      </div>
    </div>
  );
}

// this component is the field to add a new todo item
// we render the input field, and when the user enters text and clicks ENTER, we call the handleSubmit function
// pass in the addTodo function that is called from handleSubmit
function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();  // prevent the default behaviour
    if (!value) return;  // if the text field is empty, do nothing
    addTodo(value);      // call the addTodo function with the text from the field
    setValue("");        // reset the text field
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="input" 
        value={value} 
        onChange={e => setValue(e.target.value)} 
      />
    </form>
  );
}

// this is the main App component which renders the main page
function App() {

  // use a React Hook (useState) to define a state variable (todos) and a state update function (setTodos)
  // define the initial state as an array of objects
  const [todos, setTodos] = useState([
    // { text: "Learn React", isCompleted: false },
    // { text: "Have lunch", isCompleted: false },
    // { text: "Write React app", isCompleted: false }
  ]);  

  useEffect(() => {
    retrieveTodos();
  }, []);

  const refreshTodos = () => {
    retrieveTodos();
  }

  const retrieveTodos = () => {
    DataService.getAll()
    .then(response => {
      setTodos(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  // given a piece of text, copy the existing state and append the new text item, update the state
  const addTodo = text => {
    // const newTodos = [...todos, { text }];
    // setTodos(newTodos);
    var todo = {
      id: Math.floor(Math.random() * 10000),
      text: text,
      isCompleted: false
    };
    DataService.create(todo)
    .then(response => {
      refreshTodos();
    })
    .catch(e => {
      console.log(e);
    })
  };  

  // given an index, copy the existing state and mark the indexed item completed, update the state
  const completeTodo = id => {
    // const newTodos = [...todos];
    // newTodos[index].isCompleted = true;
    // setTodos(newTodos);
    DataService.get(id)
    .then(response => {
      var updatedTodo = response.data;
      updatedTodo.isCompleted = true;
      DataService.update(id, updatedTodo)
      .then(response => {
        refreshTodos();
      })
    })
    .catch(e => {
      console.log(e);
    })

  };  

  // given an index, copy the existing state and remove the indexed item, update the state
  const removeTodo = id => {
    // const newTodos = [...todos];
    // newTodos.splice(index, 1);
    // setTodos(newTodos);
    DataService.remove(id)
    .then(response => {
      refreshTodos();
    })
    .catch(e => {
      console.log(e);
    })
  };  

  // render the application page by calling map() on the state array and rendering a Todo component for each item
  // pass in the index, todo object and functions for completing and removing items
  // render the TodoForm at the bottom
  return (
    <div className="app">
      <div className="todo-list" style={{width:400+'px'}} data-cy="todo-list">
        {todos.map((todo, index) => (
          <Todo key={todo.id} 
                index={index} 
                todo={todo} 
                completeTodo={completeTodo} 
                removeTodo={removeTodo} 
          />    
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>    
  );
}  

export default App;
