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

                const data = await TodoService.createTodo(title, todoListId);

                if (await (data.success)) {

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

        async deleteTodo({
            commit,
            rootState
        }, {
            taskId,
            boardId,
            todoListId,
            id
        }) {
            try {
                const data = await TodoService.deleteTodo(id);
                if (data.success) {
                    commit('destroyTodo', {
                        id: id,
                        todoListId: todoListId,
                        boardId: boardId,
                        taskId: taskId,
                        boards: rootState.showProject.project.project.boards
                    })
                }

            } catch (error) {

            }
        },
        async updateTodo({
            commit,
            rootState
        }, {
            taskId,
            boardId,
            todoListId,
            title,
            id,
            completed
        }) {
            try {
                const data = await TodoService.updateTodo(id, title, todoListId);
                if (data.success) {
                    commit('refreshTodo', {
                        id: id,
                        todoListId: todoListId,
                        boardId: boardId,
                        taskId: taskId,
                        boards: rootState.showProject.project.project.boards,
                        todo: data.data
                    })
                    return true
                }
            } catch (error) {

            }
        }
    },
    mutations: {
        setTodo(state, {
            todoListId,
            boards,
            todo,
            boardId,
            taskId
        }) {

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
        },
        destroyTodo(state, {
            todoListId,
            boards,
            id,
            boardId,
            taskId
        }) {
            Object.values(boards).forEach(board => {
                if (board.id == boardId)
                    board.tasks.forEach(task => {
                        if (task.id == taskId) {
                            task.todos.forEach(todoList => {
                                if (todoList.id == todoListId) {
                                    todoList.todo_list.forEach((todo, index) => {
                                        if (todo.id == id) {
                                            todoList.todo_list.splice(index, 1)
                                        }
                                    })
                                }

                            })
                        }
                    })

            });
        },
        refreshTodo(state, {
            todoListId,
            boards,
            id,
            boardId,
            taskId,
            todo
        }) {
            Object.values(boards).forEach(board => {
                if (board.id == boardId)
                    board.tasks.forEach(task => {
                        if (task.id == taskId) {
                            task.todos.forEach(todoList => {
                                if (todoList.id == todoListId) {
                                    todoList.todo_list.forEach((item, index) => {
                                        if (item.id == id) {
                                            todoList.todo_list.splice(index, 1, todo)
                                        }
                                    })
                                }

                            })
                        }
                    })

            });
        }

    },

};