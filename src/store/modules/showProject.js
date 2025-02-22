import ProjectService from "../../services/project.service";

const state = {
    project: {},

};

const getters = {
    getProject(state) {
        const project = state.project.project;

        return {
            'id': project.id,
            'ownerName': project.auth.name,
            'title': project.title,
            'start_at': project.start_at,
            'end_at': project.end_at
        };
    },
    getBoards(state) {
        const boards = state.project.project.boards;
        return boards.sort((a, b) => a.sort - b.sort);
    },
    getAuth() {
        const project = state.project.project;
        return {
            ...project.auth
        }
    }
};

const actions = {
    async fetchProject({
        commit
    }, id) {
        try {

            const project = await ProjectService.fetchProject(id);
            // const project = data.project;

            commit('setProject', {
                project
            })
            if (project != undefined)
                return true;
        } catch (error) {

        }
    },
    setBoard({
        commit
    }, board) {
        commit('setBoard', {
            board
        })
        return true
    },
};

const mutations = {
    setProject(state, project) {

        project.project.boards = project.project.boards.sort((a, b) => a.sort - b.sort)
        project.project.boards.forEach(board => {
            board.tasks = board.tasks.sort((a, b) => a.sort - b.sort)
        });
        // console.log(temp)
        // console.log(temp)
        state.project = project;
    },
    setBoard(state, board) {
        state.project.project.boards.push(board)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};