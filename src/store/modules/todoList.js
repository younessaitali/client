import TodoListService from '../../services/task.service'



export default {
    namespaced: true,
    state: {

    },
    getters: {},
    actions: {

        async createTask({
            commit,
            rootState
        }, {
            title,
            taskId,
        }) {
            try {
                // console.log(title + "  " + projectId);


                const data = await TodoListService.createTask(title, taskId);

                if (await (data.success)) {

                    commit('setTodoList', {
                        task: data.task,
                        boards: rootState.showProject.project.project.boards
                    })

                    return task;
                }
            } catch (error) {

            }
        },
    },
    mutations: {
        setTodoList(state, {
            todoList,
            tasks
        }) {
            Object.values(boards).forEach(board => {
                if (board.id == task.board_id)
                    board.tasks.push(task);
            });
        }

    },
};