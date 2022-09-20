export interface Todo {
  id: number,
  date: string,
  time: string,
  title: string,
  description: string,
}

export interface DayWithTodos {
  id: number,
  dayNumber: number,
  dayDate: string,
  todos?: Todo[],
}
