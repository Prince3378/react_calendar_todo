import { DayWithTodos, Todo } from '../react-app-env';

const dateWithFormat = (date?: Date | string) => {
  return new Date(date || '').toLocaleDateString();
};

const generateDayWithTodos = (
  id: number,
  dayNumber: number,
  dayDate: string,
  todos: Todo[],
) => {
  return {
    id,
    dayNumber,
    dayDate,
    todos: todos.find(day => dateWithFormat(day.date) === dayDate),
  } as DayWithTodos;
};

export const renderCalendar = (
  date: any,
  todos: Todo[],
) => {
  date.setDate(1);

  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  const lastDay = new Date(
    currentYear,
    currentMonth + 1,
    0,
  ).getDate();

  const prevLastDay = new Date(
    currentYear,
    currentMonth,
    0,
  ).getDate();

  const firstDayIndex = date.getDay() - 1;

  const lastDayIndex = new Date(
    currentYear,
    currentMonth + 1,
    0,
  ).getDay();

  const nextDays = (7 - lastDayIndex - 1) + 1;
  const days: DayWithTodos[] = [];
  let index = 0;

  for (let x = firstDayIndex; x > 0; x--) {
    const dayNumber = prevLastDay - x + 1;
    const dayDate = new Date(`${currentYear}-${currentMonth}-${dayNumber}`).toLocaleDateString();

    days.push(generateDayWithTodos(index, dayNumber, dayDate, todos));
    index++;
  }

  for (let i = 1; i <= lastDay; i++) {
    const dayDate = new Date(`${currentYear}-${currentMonth + 1}-${i}`).toLocaleDateString();

    days.push(generateDayWithTodos(index, i, dayDate, todos));
    index++;
  }

  for (let j = 1; j <= nextDays; j++) {
    const dayDate = new Date(`${currentYear}-${currentMonth + 2}-${j}`).toLocaleDateString();

    days.push(generateDayWithTodos(index, j, dayDate, todos));
    index++;
  }

  return days;
};
