import TodoService from '../../services/todo.service'
import {
    Object
} from 'core-js';



export default {
    namespaced: true,
    state: {

    },
    getters: {
        getTodo: (
            state,
            getters,
            rootState,
            rootGetters
        ) => (boardId, taskId, argTodoListId) => {
            let todo = {};

            let todoLists = rootGetters["todoList/getTodoList"](boardId, taskId)



            Object.values(todoLists)
                .forEach(todolist => {
                    if (todolist.id == argTodoListId)
                        todo = {
                            ...todolist.todo_list
                        };
                });


            return todo;
        }
    },
    actions: {

        async createTodo({
            commit,
            rootState
        }, {
            title,
            taskId,
            boardId,
            todoListId
        }) {
            try {

                console.log('am in');
                const data = await TodoService.createTodo(title, todoListId);

                if (await (data.success)) {

                    // console.log(data.todo);
                    commit('setTodo', {
                        todo: data.todo,
                        todoListId: todoListId,
                        boardId: boardId,
                        taskId: taskId,
                        boards: rootState.showProject.project.project.boards
                    })

                    return true;
                }
            } catch (error) {

            }
        },
    },
    mutations: {
        setTodo(state, {
            todoListId,
            boards,
            todo,
            boardId,
            taskId
        }) {
            console.log(todo);

            Object.values(boards).forEach(board => {
                if (board.id == boardId)
                    board.tasks.forEach(task => {
                        if (task.id == taskId) {
                            task.todos.forEach(todoList => {
                                if (todoList.id == todoListId) {
                                    todoList.todo_list.push(todo);
                                }

                            })
                        }
                    })

            });
        }

    },
};