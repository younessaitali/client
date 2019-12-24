import ProjectService from "../../services/project.service";

// const state = {
//     projects: {},

// };

// const getters = {
//     getProjects(state) {
//         let projects = state.projects;

//         return projects.projects;
//     },
// };

// const actions = {
//     async fetchProjects({
//         commit
//     }) {
//         try {

//             const projects = await ProjectService.fetchProjects();

//             commit('setProjects', {
//                 projects
//             })
//             return false;
//         } catch (error) {

//         }
//     },
//     async createProject({
//         commit
//     }, title) {
//         try {

//             const project = await ProjectService.createProject(title);

//             commit('addProject', {
//                 project
//             })
//             return true;
//         } catch (error) {

//         }
//     },
// };

// const mutations = {
//     setProjects(state, projects) {
//         state.projects = projects;
//     },

//     addProject(state, project) {
//         state.projects.push(project);
//     }
// };

// export default {
//     namespaced: true,
//     state,
//     getters,
//     actions,
//     mutations
// };

export default {
    namespaced: true,
    state: {
        projects: {},

    },
    getters: {
        getProjects(state) {
            let projects = state.projects;

            return projects.projects;
        },
    },
    actions: {
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
        async createProject({
            commit
        }, title) {
            try {

                const project = await ProjectService.createProject(title);

                commit('addProject', {
                    project
                })
                return true;
            } catch (error) {

            }
        },
    },
    mutations: {
        setProjects(state, projects) {
            state.projects = projects;
        },

        addProject(state, project) {
            state.projects.push(project);
        }
    },
};