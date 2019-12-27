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
                            console.log(task)
                        }
                    })

            });
        }

    },
};