import React, { useContext } from 'react';
import { ModalContext } from '../../context/ReactContext';
import { Todo } from '../../react-app-env';
import '../ListTodo/ListTodo.css';

type Props = {
    todos: Todo[],
}

export const ListTodo: React.FC<Props> = React.memo(({ todos }) => {
  const { setIsActiv, setSelectedTodo } = useContext(ModalContext);

  const visibleTodos = todos
    .sort((todo1, todo2) => todo1.time.localeCompare(todo2.time));

  const getEdit = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, t: Todo) => {
    e.stopPropagation();
    setIsActiv(true);
    setSelectedTodo(t);
  };

  return (
    <ul className="list__todo">
      {visibleTodos.map(todo => (
        <li
          className="todo"
          key={todo.id}
          onClick={(e) => {
            getEdit(e, todo);
          }}
        >
          {todo.title.length > 5
            ? `${todo.title.slice(0, 8)}...`
            : todo.title}
        </li>
      ))}
    </ul>
  );
});
