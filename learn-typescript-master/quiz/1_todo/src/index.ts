interface TodoItem {
  id: number;
  title: string;
  done: boolean;
}

let todoItems: TodoItem[];

// api
function fetchTodoItems(): TodoItem[] {
  const todos = [
    { id: 1, title: '안녕', done: false },
    { id: 2, title: '타입', done: false },
    { id: 3, title: '스크립트', done: false },
  ];
  return todos;
}

// crud methods
function fetchTodos(): TodoItem[] {
  const todos = fetchTodoItems();
  return todos;
}

function addTodo(todo: TodoItem): void {
  todoItems.push(todo);
}

function deleteTodo(index: number): void {
  todoItems.splice(index, 1);
}

function completeTodo(index: number, todo: TodoItem): void {
  todo.done = true;
  todoItems.splice(index, 1, todo);
}

// business logic
function logFirstTodo(): TodoItem {
  return todoItems[0];
}

function showCompleted(): TodoItem[] {
  return todoItems.filter((item: TodoItem) => item.done);
}

// TODO: 아래 함수의 내용을 채워보세요. 아래 함수는 `addTodo()` 함수를 이용하여 2개의 새 할 일을 추가하는 함수입니다.
function addTwoTodoItems(): void {
  // addTodo() 함수를 두 번 호출하여 todoItems에 새 할 일이 2개 추가되어야 합니다.
  addTodo({ id: 4, title: '타입 정의', done: true });
  addTodo({ id: 5, title: '복습', done: true });
}

// NOTE: 유틸 함수
function log(): void {
  console.log(todoItems);
}

todoItems = fetchTodoItems();
addTwoTodoItems();
log();
