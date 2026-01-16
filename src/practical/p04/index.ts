import axios from "axios";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface User {
  id: number;
  name: string;
  phone: string;
  address: Address;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface UserWithTodos {
  id: number;
  name: string;
  address: Address;
  phone: string;
  todos: Todo[];
}

export const getTodosByUserId = async (
  id: number
): Promise<UserWithTodos | string> => {
  try {
    const todosUrl = "https://jsonplaceholder.typicode.com/todos";
    const usersUrl = "https://jsonplaceholder.typicode.com/users";
    const todosRes = await axios.get<Todo[]>(todosUrl);
    const usersRes = await axios.get<User[]>(usersUrl);

    const user = usersRes.data.find((u) => u.id === id);

    if (!user) {
      return "Invalid id";
    }

    const userTodos = todosRes.data.filter(
      (todo) => todo.userId === id
    );

    return {
      id: user.id,
      name: user.name,
      address: user.address,
      phone: user.phone,
      todos: userTodos,
    };
  } catch {
    return "Invalid id";
  }
};