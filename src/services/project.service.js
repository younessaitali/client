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


};

export default ProjectService;

export {
    ProjectService
};