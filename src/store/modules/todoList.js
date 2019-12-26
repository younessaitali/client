import TodoListService from '../../services/todoList.service'



export default {
    namespaced: true,
    state: {

    },
    getters: {},
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
                console.log('am in module' + title, taskId);


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