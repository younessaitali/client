import TodoListService from '../../services/todoList.service'



export default {
    namespaced: true,
    state: {

    },
    getters: {
        getTodoList: (
            state,
            getters,
            rootState
        ) => (boardId, taskId) => {

            const boards = rootState.showProject.project.project.boards;
            let todoLists = {}
            boards.forEach(board => {
                if (board.id == boardId)
                    return board.tasks.forEach(task => {
                        if (task.id == taskId) {

                            todoLists = {
                                ...task.todos
                            };
                        }
                    })

            });
            return todoLists;
        },
        getmok: (
            state,
            getters,
            rootState
        ) => (mok) => {

            return mok;
        }
    },
    actions: {

        async createTodoList({
            commit,
            rootState
        }, {
            title,
            taskId,
            boardId
        }) {
            try {


                const data = await TodoListService.createTodoList(title, taskId);

                if (await (data.success)) {

                    commit('setTodoList', {
                        boards: rootState.showProject.project.project.boards,
                        todoList: data.todoList,
                        boardId: boardId
                    })

                    return true;
                }
            } catch (error) {

            }
        },
        async deleteTodoList({
            commit,
            rootState
        }, {
            id,
            taskId,
            boardId
        }) {
            try {
                const data = await TodoListService.deleteTodoList(id);
                if (await data.success) {
                    commit('deleteTodoList', {
                        boards: rootState.showProject.project.project.boards,
                        taskId: taskId,
                        boardId: boardId,
                        id: id
                    })
                }
            } catch (error) {

            }
        },
        async updateTodoList({
            commit,
            rootState
        }, {
            taskId,
            boardId,
            id,
            title
        }) {
            try {
                const data = await TodoListService.updateTodoList(id, taskId, title);
                console.log(data)
                if (await data.success) {
                    commit('updateTodoList', {
                        boards: rootState.showProject.project.project.boards,
                        taskId: taskId,
                        boardId: boardId,
                        id: id,
                        todoList: data.data
                    })
                    return true
                }
            } catch (error) {

            }
        }
    },
    mutations: {
        setTodoList(state, {
            todoList,
            boards,
            boardId
        }) {
            Object.values(boards).forEach(board => {
                if (board.id == boardId)
                    board.tasks.forEach(task => {
                        if (task.id == todoList.task_id) {
                            task.todos.push(todoList);
                        }
                    })

            });
        },

        deleteTodoList(state, {
            boards,
            taskId,
            boardId,
            id
        }) {


            Object.values(boards).forEach(board => {
                if (board.id == boardId)
                    board.tasks.forEach(task => {
                        if (task.id == taskId) {
                            task.todos.forEach((todoList, index) => {
                                if (todoList.id === id)
                                    task.todos.splice(index, 1)
                            })
                        }
                    })

            });
        },
        updateTodoList(state, {
            boards,
            taskId,
            boardId,
            id,
            todoList
        }) {
            Object.values(boards).forEach(board => {
                if (board.id == boardId)
                    board.tasks.forEach(task => {
                        if (task.id == taskId) {
                            task.todos.forEach((item, index) => {
                                if (item.id === id)
                                    task.todos.splice(index, 1, todoList)
                            })
                        }
                    })

            });
        }


    },
};