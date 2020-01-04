// jshint esversion:8

import ApiService from './api.service';



const BoardService = {
    /**
     * Login the user and store the access token to TokenService. 
     * 
     * @returns access_token
     * @throws AuthenticationError 
     **/


    createBoard: async function (title, projectId) {
        const requestData = {
            method: 'post',
            url: 'board',
            data: {
                title: `${title}`,
                project_id: `${projectId}`
            }
        }

        try {
            const response = await ApiService.customRequest(requestData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.status, error.response.data.detail);
        }
    },
    deleteBoard: async function (id) {
        const requestData = {
            method: 'delete',
            url: `board/${id}`
        };
        try {
            const response = await ApiService.customRequest(requestData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.status, error.response.data.detail);

        }
    },
    updateBoard: async function (id, title, projectId) {
        const requestData = {
            method: 'put',
            url: `board/${id}`,
            data: {
                title: `${title}`,
                project_id: `${projectId}`
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

export default BoardService;

export {
    BoardService
};