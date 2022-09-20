import React, { useContext, useState } from 'react';
import { ModalContext } from '../../context/ReactContext';
import { DayWithTodos, Todo } from '../../react-app-env';
import '../Header/Header.css';
import { renderCalendar } from '../RenderCalendar';
type Props = {
  date: any,
  todos: Todo[],
  setMonth: (month: DayWithTodos[]) => void,
  setDate: (date: any) => void,
}

export const Header: React.FC<Props> = ({
  date,
  todos,
  setMonth,
  setDate,
}) => {
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
  const monthsUA = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ];

  const { isActiv, setIsActiv } = useContext(ModalContext);

  const selectDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const curentMonth = new Date(e.target.value).getMonth();
    const year = new Date(e.target.value).getFullYear();

    setDate(new Date(e.target.value));
    setSelectedMonth(curentMonth);
    setSelectedYear(year);
    setMonth(renderCalendar(new Date(e.target.value), todos));
  };

  const prevMonth = (d: any) => {
    d.setMonth(d.getMonth() - 1);

    setDate(new Date(d));
    setSelectedMonth(d.getMonth());
    setMonth(renderCalendar(new Date(d), todos));
  };

  const nextMonth = (d: any) => {
    d.setMonth(d.getMonth() + 1);

    setDate(new Date(d));
    setSelectedMonth(d.getMonth());
    setMonth(renderCalendar(new Date(d), todos));
  };

  return (
    <div className="box" id="nav-box">
      <nav className="navbar" role="navigation" aria-label="main navigation">

        <div className="navbar-item">
          <button
            className="button is-info"
            type="submit"
            onClick={() => setIsActiv(!isActiv)}
          >
            Додати подію
          </button>
        </div>
        <div
          className="month
            is-flex is-justify-content-center
            is-align-items-center"
        >
          <span
            className="icon"
            onClick={() => prevMonth(date)}
          >
            <i className="fas fa-arrow-left prev"></i>
          </span>
          <div className="date">
            <h1 className="is-size-4">
              {`${monthsUA[selectedMonth]} ${selectedYear}`}
            </h1>
          </div>
          <span
            className="icon"
            onClick={() => nextMonth(date)}
          >
            <i className="fas fa-arrow-right next"></i>
          </span>
        </div>
        <div className="navbar-item">
          <input
            type="date"
            className="input is-normal"
            onChange={selectDate}
          />
        </div>
      </nav>
    </div>
  );
};
