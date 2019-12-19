// jshint esversion:8
import ProjectService from "../../services/project.service";

const state = {
    projects: {},

};

const getters = {
    getProjects(state) {
        return state.projects;
    },
};

const actions = {
    async fetchProject({
        commit
    }) {
        try {
            console.log('in fetch project');

            const projects = await ProjectService.fetchProjects();
            console.log('after fetch project ' + projects);

            commit('setProjects', {
                projects
            })
        } catch (error) {

        }
    },
};

const mutations = {
    setProjects(state, projects) {
        state.projects = projects
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};