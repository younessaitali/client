// jshint esversion:8

import ApiService from './api.service';



const ProjectService = {
    /**
     * Login the user and store the access token to TokenService. 
     * 
     * @returns access_token
     * @throws AuthenticationError 
     **/
    fetchProjects: async function () {
        const requestData = {
            method: 'get',
            url: "project/",

        }

        try {
            const response = await ApiService.customRequest(requestData);

            return response.data.projects;
        } catch (error) {
            throw new Error(error.response.status, error.response.data.detail);
        }
    },
    fetchProject: async function (id) {
        const requestData = {
            method: 'get',
            url: `project/${id}`,

        }

        try {
            const response = await ApiService.customRequest(requestData);
            if (!response.data.success)
                throw error;
            return response.data.project;
        } catch (error) {
            throw new Error(error.response.status, error.response.data.detail);
        }
    },

    createProject: async function (title) {
        const requestData = {
            method: 'post',
            url: 'project',
            data: {
                title: title
            }
        }

        try {
            const response = await ApiService.customRequest(requestData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.status, error.response.data.detail);
        }
    },
    deleteProject: async function (id) {
        const requestData = {
            method: 'delete',
            url: `project/${id}`
        };
        try {
            const response = await ApiService.customRequest(requestData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.status, error.response.data.detail);
        }
    },

    updateProject: async function (id, title) {
        const requestData = {
            method: 'put',
            url: `project/${id}`,
            data: {
                title: title
            }
        };
        try {
            const response = await ApiService.customRequest(requestData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.status, error.response.data.detail);
        }
    }


};

export default ProjectService;

export {
    ProjectService
};