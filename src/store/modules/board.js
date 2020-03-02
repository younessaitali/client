import BoardService from '../../services/board.service'



export default {
    namespaced: true,
    state: {

    },
    getters: {},
    actions: {

        async createBoard({
            commit,
            rootState,
        }, {
            title,
            projectId
        }) {
            try {
                // console.log(title + "  " + projectId);


                const sort = rootState.showProject.project.project.boards.length + 1;


                const data = await BoardService.createBoard(title, projectId, sort);

                if (await (data.success)) {

                    commit('setBoard', {
                        board: data.board,
                        project: rootState.showProject.project.project
                    })
                    return true;
                }
            } catch (error) {

            }
        },
        async deleteBoard({
            commit,
            rootState
        }, {
            id
        }) {
            try {

                const data = await BoardService.deleteBoard(id);
                console.log(data);
                if (data.success) {
                    commit('delete', {
                        id: id,
                        project: rootState.showProject.project.project
                    });
                }
            } catch (error) {

            }
        },
        async updateBoard({
            commit,
            rootState
        }, {
            id,
            title,
            projectId,
            sort
        }) {
            try {
                const data = await BoardService.updateBoard(id, title, projectId, sort);

                if (data.success) {
                    commit('refreshBoards', {
                        id: id,
                        project: rootState.showProject.project.project,
                        board: data.data
                    });
                    return true;
                }
            } catch (error) {

            }

        },
    },
    mutations: {

        setBoard(state, {
            board,
            project
        }) {
            // console.log('setboard mutation')
            project.boards.push(board);
        },
        delete(state, {
            id,
            project
        }) {
            project.boards.forEach((board, index) => {
                if (board.id === id)
                    project.boards.splice(index, 1)
            });
        },
        refreshBoards(state, {
            id,
            project,
            board
        }) {
            project.boards.forEach((item, index) => {
                if (item.id === id)
                    project.boards.splice(index, 1, board)
            });
        }
    },
};