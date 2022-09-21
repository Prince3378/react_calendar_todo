import React, { useContext } from 'react';
import './Month.css';
import classNames from 'classnames';
import { DayWithTodos, Todo } from '../../react-app-env';
import { ListTodo } from '../ListTodo/ListTodo';
import { ModalContext } from '../../context/ReactContext';

type Props = {
  month: DayWithTodos[],
  date: Date,
  todos: Todo[],
  setSelectedDate: (date: string) => void,
};

export const Month: React.FC<Props> = ({
  month, date, todos, setSelectedDate,
}) => {
  const namesDays = [
    'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд',
  ];

  const { setIsActiv } = useContext(ModalContext);

  const getToday = (day: number, d: Date): boolean =>
    (d.getMonth() === new Date().getMonth()
  && d.getFullYear() === new Date().getFullYear()
  && day === new Date().getDate());

  const getPrev = (i: number): boolean => i < month
    .findIndex(el => el.dayNumber === 1);

  const getLast = (i: number): boolean => i > (month
    .map(el => el.dayNumber)
    .lastIndexOf(1) - 1);

  const getWeekend = (i: number): boolean =>
    (((i + 1) % 7) === 0) || (((i + 2) % 7) === 0);

  const getList = (d: string) => {
    const x = todos
      .filter(item => new Date(item.date).toLocaleDateString() === d);

    return x;
  };

  const addTodo = (currDate: string) => {
    setIsActiv(true);

    const formatDate = currDate.split('.').reverse().join('-');

    setSelectedDate(formatDate);
  };

  return (
    <div className="box">
      <div className="table is-flex is-flex-direction-column">
        <div className="thead is-flex is-justify-content-space-around">
          {namesDays.map(day => (
            <div key={day}>
              <h1 className="title is-3">{day}</h1>
            </div>
          ))}
        </div>
        <div className="days">
          {month.map((el, i) => (
            <div
              key={el.id}
              onClick={() => addTodo(el.dayDate)}
              className={classNames('day',
                {
                  'today': getToday(el.dayNumber, date),
                  'weekend': getWeekend(i),
                  'prev-date': getPrev(i),
                  'next-date': getLast(i),
                })}>
              {el.todos && <ListTodo
                todos={getList(el.dayDate)} />}
              <div className="numderDay is-size-4">
                {el.dayNumber}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
