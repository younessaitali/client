import ProjectService from "../../services/project.service";



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
                    project: project.project
                })
                return true;
            } catch (error) {

            }
        },
        async deleteProject({
            commit
        }, id) {
            try {
                const data = await ProjectService.deleteProject(id);
                if (data.success)

                    commit('deleteProject', {
                        id: id
                    })
            } catch (error) {

            }
        },


        async updateProject({
            commit
        }, {
            id,
            title
        }) {
            try {
                const data = await ProjectService.updateProject(id, title);

                if (data.success) {
                    commit('refreshProject', {
                        project: data.project
                    });
                    return true;
                }
            } catch (error) {

            }
        }

    },
    mutations: {
        setProjects(state, projects) {
            state.projects = projects;
        },

        addProject(state, {
            project
        }) {

            state.projects.projects.push(project);
        },
        deleteProject(state, {
            id
        }) {
            for (let i = 0; i < state.projects.projects.length; i++) {
                console.log(state.projects.projects[i]);
                if (state.projects.projects[i].id === id) {
                    state.projects.projects.splice(i, 1);
                }
            }

        },
        refreshProject(state, {
            project
        }) {
            console.log(project)
            for (let i = 0; i < state.projects.projects.length; i++) {
                if (state.projects.projects[i].id === project.id) {
                    state.projects.projects.splice(i, 1, project);
                }
            }
        }

    },
};