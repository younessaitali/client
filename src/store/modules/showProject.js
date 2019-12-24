import ProjectService from "../../services/project.service";

const state = {
    project: {},

};

const getters = {
    getProject(state) {
        const project = state.project.project;

        return {
            'id': project.id,
            'title': project.title,
            'start_at': project.start_at,
            'end_at': project.end_at
        };
    },
    getBoards(state) {
        const boards = state.project.project.boards;
        return boards;
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
};

const mutations = {
    setProject(state, project) {
        state.project = project;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};