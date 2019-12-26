// jshint esversion:8

import ApiService from './api.service';



const TodoListService = {
    /**
     * Login the user and store the access token to TokenService. 
     * 
     * @returns access_token
     * @throws AuthenticationError 
     **/


    createTodoList: async function (title, taskId) {
        const requestData = {
            method: 'post',
            url: 'todos',
            data: {
                title: `${title}`,
                task_id: `${taskId}`,

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

export default TodoListService;

export {
    TodoListService
};