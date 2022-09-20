import React, { useMemo, useState } from 'react';
import { Todo } from '../react-app-env';

interface ContextType {
  isActiv: boolean,
  setIsActiv: (state: boolean) => void,
  selectedTodo: Todo | null,
  setSelectedTodo: (t: Todo | null) => void,
}

export const ModalContext = React.createContext<ContextType>({
  isActiv: false,
  setIsActiv: (state: boolean) => {},
  selectedTodo: null,
  setSelectedTodo: (t: Todo | null) => {},
});

export const ModalProvider = ({ children } :any) => {
  const [isActiv, setIsActiv] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const contextValue = useMemo(() => {
    return {
      isActiv,
      setIsActiv,
      selectedTodo,
      setSelectedTodo,
    };
  }, [isActiv]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
