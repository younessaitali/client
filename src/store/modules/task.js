import TaskService from '../../services/task.service'



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
            boardId,
            description
        }) {
            try {
                // console.log(title + "  " + projectId);


                const data = await TaskService.createTask(title, boardId, description);

                if (await (data.success)) {

                    commit('setTask', {
                        task: data.task,
                        boards: rootState.showProject.project.project.boards
                    })

                    return true;
                }
            } catch (error) {

            }
        },
    },
    mutations: {
        setTask(state, {
            task,
            boards
        }) {
            Object.values(boards).forEach(board => {
                if (board.id == task.board_id)
                    board.tasks.push(task);
            });
        }

    },
};