// jshint esversion:8

import ApiService from './api.service';



const TaskService = {
    /**
     * Login the user and store the access token to TokenService. 
     * 
     * @returns access_token
     * @throws AuthenticationError 
     **/


    createTask: async function (title, boardId, description) {
        const requestData = {
            method: 'post',
            url: 'task',
            data: {
                title: `${title}`,
                board_id: `${boardId}`,
                description: `${description}`
            }
        }

        try {
            const response = await ApiService.customRequest(requestData);

            return response.data;
        } catch (error) {
            throw new Error(error.response.status, error.response.data.detail);
        }
    }


};

export default TaskService;

export {
    TaskService
};