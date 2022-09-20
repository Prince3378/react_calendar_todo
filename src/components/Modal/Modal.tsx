import React, { useContext, useState } from 'react';
import { ModalContext } from '../../context/ReactContext';
import { Todo } from '../../react-app-env';

type Props = {
    addToDo: (a: Todo) => void;
    deletTodo:(a: Todo) => void;
    todo?: Todo | null;
}

export const Modal: React.FC<Props> = ({ addToDo, deletTodo, todo }) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [errTitle, setErrTitle] = useState(false);

  const [date, setDate] = useState(todo?.date || '');
  const [errDate, setErrDate] = useState(false);

  const [time, setTime] = useState(todo?.time || '');
  const [errTime, setErrTime] = useState(false);

  const [description, setDescription] = useState(todo?.description || '');

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const { setIsActiv, setSelectedTodo } = useContext(ModalContext);

  const handleSubmit = () => {
    setErrTitle(true);
    setErrDate(true);
    setErrTime(true);

    const newTodo = {
      id: +new Date(),
      date,
      time,
      title,
      description,
    };

    if (title && date && time) {
      addToDo(newTodo);
      setIsActiv(false);
    }
  };

  const renameTodo = (selTodo: Todo) => {
    const newTodo = {
      ...selTodo,
      date,
      time,
      title,
      description,
    };

    addToDo(newTodo);
    setIsActiv(false);
    setSelectedTodo(null);
  };

  const errors = (typeErr: boolean, inputLength: number) => {
    return typeErr && inputLength === 0;
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <span className="modal-card-title">
            {!todo ? `Додайте нову подію` : `Редагувати подію`}
          </span>
          <p>{date ? `Подію створено: ${currentDate} ${currentTime}` : ''}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {
              setIsActiv(false);
              setSelectedTodo(null);
            }}
          ></button>
        </header>
        <section className="modal-card-body">
          <form>
            <p className="modal-card-title">Заголовок *</p>
            <input
              className="input"
              type="text"
              placeholder="Введіть назву події"
              maxLength={30}
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setTitle(e.target.value);
              }}
            />
            {errors(errTitle, title.length) && (
              <span className="has-text-danger">Введіть опис події</span>
            )}
            <p className="modal-card-title">Опис</p>
            <textarea
              className="textarea"
              placeholder="Опис події"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                e.preventDefault();
                setDescription(e.target.value);
              }}
            ></textarea>
            <p className="modal-card-title">Дата</p>
            <input
              type="date"
              value={date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setDate(e.target.value);
              }}
            />
            <input
              type="time"
              value={time}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setTime(e.target.value);
              }}
            />
            {errors(errDate, date.length) && (
              <span className="has-text-danger">Оберіть дату </span>
            )}
            {errors(errTime, time.length) && (
              <span className="has-text-danger">Оберіть час</span>
            )}
          </form>
        </section>
        <footer className="modal-card-foot">
          {!todo
            ? <button
              className="button is-success"
              onClick={() => handleSubmit()}
            >
              Зберегти
            </button>
            : <><button
              className="button is-success"
              onClick={() => renameTodo(todo)}
            >
              Оновити
            </button>
            <button
              className="button is-danger"
              onClick={() => {
                deletTodo(todo);
                setSelectedTodo(null);
                setIsActiv(false);
              }}
            >
              Видалити
            </button></>
          }
        </footer>
      </div>
    </div>
  );
};
