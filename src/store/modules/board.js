import BoardService from '../../services/board.service'



export default {
    namespaced: true,
    state: {

    },
    getters: {},
    actions: {

        async createBoard({
            commit,
            rootState
        }, {
            title,
            projectId
        }) {
            try {
                // console.log(title + "  " + projectId);


                const data = await BoardService.createBoard(title, projectId);

                if (await (data.success)) {

                    console.log(data.board);
                    commit('setBoard', {
                        board: data.board,
                        project: rootState.showProject.project.project
                    })
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
        }
    },
};