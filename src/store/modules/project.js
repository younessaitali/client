import ProjectService from "../../services/project.service";

const state = {
    projects: {},

};

const getters = {
    getProjects(state) {
        let projects = state.projects;

        return projects.projects;
    },
};

const actions = {
    async fetchProjects({
        commit
    }) {
        try {

            const projects = await ProjectService.fetchProjects();

            commit('setProjects', {
                projects
            })
            return false;
        } catch (error) {

        }
    },
};

const mutations = {
    setProjects(state, projects) {
        state.projects = projects;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};