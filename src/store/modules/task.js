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

        async deleteTask({
            commit,
            rootState
        }, {
            id,
            boardId
        }) {
            try {
                const data = await TaskService.deleteTask(id);
                if (await data.success) {
                    commit('destroyTask', {
                        id: id,
                        boards: rootState.showProject.project.project.boards,
                        boardId: boardId
                    })
                    return true
                }
            } catch (error) {

            }
        },

        async updateTask({
            commit,
            rootState
        }, {
            id,
            boardId,
            title
        }) {
            const data = await TaskService.updateTask(id, title, boardId);
            console.log(data);

            if (await data.success) {

                commit('refreshTasks', {
                    id: id,
                    boards: rootState.showProject.project.project.boards,
                    boardId: boardId,
                    task: data.task
                })
                return true
            }
        }
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
        },
        destroyTask(state, {
            id,
            boards,
            boardId
        }) {
            Object.values(boards).forEach(board => {
                if (board.id == boardId)
                    board.tasks.forEach((task, index) => {
                        if (task.id === id)
                            board.tasks.splice(index, 1);
                    });
            });
        },
        refreshTasks(state, {
            id,
            boards,
            boardId,
            task
        }) {
            Object.values(boards).forEach(board => {
                if (board.id == boardId)
                    board.tasks.forEach((item, index) => {
                        if (item.id === id)
                            board.tasks.splice(index, 1, task);
                    });
            });
        }

    },
};