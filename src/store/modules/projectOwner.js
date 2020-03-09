import ProjectOwnerService from '../../services/projectOwner.service'




export default {
    namespaced: true,
    state: {

    },
    getters: {},
    actions: {

        async creatOwner({
            commit,
            rootState
        }, {
            email,
            project_id
        }) {
            try {
                const owners = rootState.showProject.project.project.owners

                const data = await ProjectOwnerService.createOwner(email, project_id)

                console.log(data)

                if (await (data.success)) {

                    commit('setOwner', {
                        owner: data.owner,
                        owners: owners
                    })

                    return true;
                }

            } catch (error) {

            }
        },
        async deleteOwner({
            commit,
            rootState
        }, {
            id,
            project_id
        }) {
            try {


                const data = await ProjectOwnerService.deleteOwner(id, project_id)

                // console.log(owners)
                if (await (data.success)) {

                    commit('destroyOwner', {
                        ownerId: id,
                        project: rootState.showProject.project.project
                    })

                    return true;
                }
            } catch (error) {

            }
        }
    },
    mutations: {

        setOwner(state, {
            owner,
            owners
        }) {
            owners.push(owner)
        },
        destroyOwner(state, {
            ownerId,
            project
        }) {
            project.owners.forEach((owner, index) => {
                if (owner.id === ownerId)
                    project.owners.splice(index, 1)
            });


        }

    },
};