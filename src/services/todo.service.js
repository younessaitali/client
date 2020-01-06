// jshint esversion:8

import ApiService from './api.service';



const TodoService = {
    /**
     * Login the user and store the access token to TokenService. 
     * 
     * @returns access_token
     * @throws AuthenticationError 
     **/


    createTodo: async function (title, todoListId) {
        const requestData = {
            method: 'post',
            url: 'todo',
            data: {
                title: `${title}`,
                container_id: `${todoListId}`,
            }
        }

        try {
            const response = await ApiService.customRequest(requestData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.status, error.response.data.detail);
        }
    },
    deleteTodo: async function (id) {
        const requestData = {
            method: 'delete',
            url: `todo/${id}`,
        }
        try {
            const response = await ApiService.customRequest(requestData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.status, error.response.data.detail);
        }
    },
    updateTodo: async function (id, title, todoListId) {
        const requestData = {
            method: "put",
            url: `todo/${id}`,
            data: {
                title: `${title}`,
                container_id: `${todoListId}`,
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

export default TodoService;

export {
    TodoService
};