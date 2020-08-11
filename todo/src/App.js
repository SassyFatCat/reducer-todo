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
    // {
    //   body: 'Example task',
    //   completed: false
    // }
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
          completed: false,
          id: Date.now(),
          created: new Date(),
          timeCompleted: null
        }
      ]
    };
  
  case "CHANGE_CHECKBOX":
    return {
      ...state,
      tasks: state.tasks.map(item => {
        if (item.id === action.payload.id) {
          item.completed = action.payload.checked;
          item.completed ? item.timeCompleted = new Date() : item.timeCompleted = null;
          return item
        }
        else return item
      })
    };

  case "CLEAR_COMPLETED":
    return {
      ...state,
      tasks: state.tasks.filter(task => task.completed === false)
    };

  default:
    return state;
}
}

function App() {
const [value, setValue, handleChange] = useForm(initialFormState);
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
          dispatch({ type: "ADD_TODO", payload: value.todo });
          setValue(initialFormState);
        }
        }>Add a to-do</button>
        <button onClick={event => {
          event.preventDefault();
          dispatch({ type: "CLEAR_COMPLETED"});
        }
        }>Clear Completed</button>
      </div>
      <div>
        {state.tasks.map(item => {
          const id = item.id;
          return (
              <div style={{padding: '2%', backgroundColor: 'lightblue', border: '2px solid black', width: '30%', margin: '2% auto'}}>
                <p style={{display: 'inline'}}>{item.body}</p>
                <input
                  style={{display: 'inline', whiteSpace: 'nowrap'}}
                  type="checkbox"
                  id={id}
                  onChange={event => {
                    const checked = event.currentTarget.checked;
                    dispatch({  type: "CHANGE_CHECKBOX", payload: {checked, id}  }) 
                  }}
                ></input>
                <p style={{color: 'red', fontSize: '8px'}}>{item.timeCompleted && `Completed: ${item.timeCompleted}`}</p>
                <p style={{fontSize: '8px'}}>{`Added: ${item.created}`}</p>
              </div>
              )
        })}
      </div>
    </div>
  );
}

export default App;
