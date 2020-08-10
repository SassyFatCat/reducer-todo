import React, {useReducer} from 'react';
import logo from './logo.svg';
import './App.css';
import {useForm} from './hooks/useForm';

/////////// INITIAL STATE ///////////
const initialFormState = {
  todo: ''
}

const initialState = {
  tasks: [
    {
      body: 'Example task',
      completed: false
    }
  ]
};

/////////// REDUCER ///////////

const reducer = (state, action) => {
switch(action.type) {
  case "ADD_TODO":
    return {
      ...state,
      tasks: [
        ...state.tasks,
        {
          body: action.payload,
          completed: false
        }
      ]
    };
  
  case "CHANGE_CHECKBOX":
    state.tasks[action.payload.index].completed = action.payload.checked
    return {
      ...state
    };
  default:
    return state;
}
}

function App() {
const [value, handleChange] = useForm(initialFormState);
const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <div>
        <h1>My Todo</h1>
          <input
            name="todo"
            value={value.todo}
            onChange={handleChange}
          />
        <button onClick={event => {
          event.preventDefault();
          dispatch({ type: "ADD_TODO", payload: value.todo })
        }
        }>Add a to-do</button>
      </div>
      <div>
        {state.tasks.map((item, index) => {
          return (
              <div>
                <span>{item.body}</span>
                <input
                  type="checkbox"
                  onChange={event => {
                    // debugger
                    const checked = event.currentTarget.checked;
                    dispatch({  type: "CHANGE_CHECKBOX", payload: {checked, index}  }) 
                  }}
                ></input>
              </div>
              )
        })}
      </div>
    </div>
  );
}

export default App;
