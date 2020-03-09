import ApiService from './api.service';


const ProjectOwnerService = {

    createOwner: async function (email, project_id) {
        const requestData = {
            method: 'post',
            url: 'project_Owner',
            data: {
                project_id: `${project_id}`,
                email: `${email}`,
            }
        }
        try {
            const response = await ApiService.customRequest(requestData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.status, error.response.data.detail);

        }
    },

    deleteOwner: async function (id, project_id) {
        const requestData = {
            method: 'delete',
            url: 'project_Owner',
            data: {
                project_id: `${project_id}`,
                owner_id: `${id}`,
            }
        }
        try {
            const response = await ApiService.customRequest(requestData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.status, error.response.data.detail);

        }
    }


}

export default ProjectOwnerService;

export {
    ProjectOwnerService
};