import React, { useContext, useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import './App.css';

import 'react-datepicker/dist/react-datepicker.css';
import { Month } from './components/Month/Month';
import { Header } from './components/Header/Header';
import { Modal } from './components/Modal/Modal';
import { renderCalendar } from './components/RenderCalendar';
import { DayWithTodos, Todo } from './react-app-env';
import { ModalContext } from './context/ReactContext';

function App() {
  const [month, setMonth] = useState<DayWithTodos[]>([]);
  const [date, setDate] = useState(new Date());
  const { isActiv, selectedTodo } = useContext(ModalContext);

  const [todos, setTodos] = useState<Todo[]>(() => {
    const todosFromStor = localStorage.getItem('todos');

    try {
      return todosFromStor ? JSON.parse(todosFromStor) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addToDo = (todo: Todo) => {
    const newArr = todos.filter(el => el.id !== todo.id);

    setTodos([ ...newArr, todo ]);
  };

  const deletTodo = (todo: Todo) => {
    const newArr = todos.filter(el => el.id !== todo.id);

    setTodos(newArr);
  };

  useEffect(() => {
    setMonth(renderCalendar(date, todos));
  }, [todos]);

  return (
    <div className="container">
      <Header
        date={date}
        setDate={setDate}
        todos={todos}
        setMonth={setMonth}
      />
      <Month
        month={month}
        date={date}
        todos={todos}
      />
      {isActiv && (<Modal
        addToDo={addToDo}
        deletTodo={deletTodo}
        todo={selectedTodo}
      />)}
    </div>
  );
}

export default App;
