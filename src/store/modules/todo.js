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
            rootGetters
        }, {
            title,
            taskId,
            boardId,
            todoListId
        }) {
            try {

                console.log('am in');
                const data = await TodoService.createTodo(title, todoListId);
                console.log(data);

                if (await (data.success)) {

                    commit('setTodo', {
                        todo: data.todo,
                        todoListId: todoListId,
                        todoList: rootGetters["todoList/getTodoList"](boardId, taskId),
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
            todoList,
            todo
        }) {
            Object.values(todoLists)
                .forEach(todolist => {
                    if (todolist.id == todoListId)
                        todoList.push(todo);
                });
        }

    },
};