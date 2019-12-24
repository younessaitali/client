import BoardService from '../../services/board.service'



export default {
    namespaced: true,
    state: {

    },
    getters: {},
    actions: {

        async createBoard({
            commit
        }, {
            title,
            projectId
        }) {
            try {
                // console.log(title + "  " + projectId);


                const data = await BoardService.createBoard(title, projectId);

                if (data.success) {
                    board = data.board;
                    return board;
                }
            } catch (error) {

            }
        },
    },
    mutations: {


    },
};