// src/App.jsx
import React, { useState } from 'react';
import './App.css';

const initialTodos = [
  { id: 1, title: 'Example Task 1', task: 'Do something', status: 'Not Started' },
  { id: 2, title: 'Example Task 2', task: 'Do something else', status: 'Ongoing' },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState({ title: '', task: '', status: 'Not Started' });
  const [idCounter, setIdCounter] = useState(3);

  const addTodo = () => {
    if (newTodo.title && newTodo.task) {
      setTodos([...todos, { id: idCounter, ...newTodo }]);
      setNewTodo({ title: '', task: '', status: 'Not Started' });
      setIdCounter(idCounter + 1);
    }
  };

  const updateTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo));
    setTodos(updatedTodos);
  };

  const deleteTodo = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const completedTodos = todos.filter(todo => todo.status === 'Complete');
  const ongoingTodos = todos.filter(todo => todo.status !== 'Complete');

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-gray-800 mt-20">Make Every Moment Count: Craft Your To-Do List Story.</h1>
      <div className="flex mx-20 mt-10 justify-between">
        <div className='w-1/4'>
          <div className="w-full mb-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Add New To-Do</h2>
            <label className="block mb-2 text-gray-800">
              Title:
              <input
                className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
                type="text"
                value={newTodo.title}
                onChange={e => setNewTodo({ ...newTodo, title: e.target.value })}
              />
            </label>
            <label className="block mb-2 text-gray-800">
              Task:
              <textarea
                className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
                value={newTodo.task}
                onChange={e => setNewTodo({ ...newTodo, task: e.target.value })}
              />
            </label>
            <label className="block mb-4 text-gray-800">
              Status:
              <select
                className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
                value={newTodo.status}
                onChange={e => setNewTodo({ ...newTodo, status: e.target.value })}
              >
                <option value="Not Started">Not Started</option>
                <option value="Ongoing">Ongoing</option>
              </select>
            </label>
            <button
              className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-300"
              onClick={addTodo}
            >
              Add To-Do
            </button>
          </div>
        </div>
        <div className='w-1/4'>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">To-Do List</h2>
          <ul>
            {ongoingTodos.slice(0).reverse().map(todo => (
              <li key={todo.id} className="mb-2 bg-white p-4 rounded-md shadow-md">
                <strong className="text-gray-800">{todo.title}</strong> - {todo.status}
                <p className='mb-2'>{todo.task}</p>
                <div>
                  <button
                    className="bg-green-500 text-white px-2 py-1 hover:bg-green-600 transition duration-300"
                    onClick={() => updateTodo(todo.id, { status: 'Complete' })}
                  >
                    Mark as Complete
                  </button>
                  <button
                    className="ml-2 bg-red-500 text-white px-2 py-1 hover:bg-red-600 transition duration-300"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='w-1/4'>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Completed Tasks</h2>
          <ul>
            {completedTodos.map(todo => (
              <li key={todo.id} className="mb-2 bg-white p-4 rounded-md shadow-md line-through">
                <strong className="text-gray-800">{todo.title}</strong> - {todo.status}
                <p className='mb-2'>{todo.task}</p>
                <button
                  className="bg-red-500 text-white px-2 py-1 hover:bg-red-600 transition duration-300"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
