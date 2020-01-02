<template>
	<div class="p-4">
		<v-card dark class="w-full">
			<div class="flex">
				<div
					class="h-25 bg-cover rounded-t text-center flex-1"
					style="background-image: url('https://tailwindcss.com/img/card-left.jpg')"
					title="Woman holding a mug"
				></div>
				<div
					class="flex-1 border-r border-b border-l border-grey-light -grey-light bg-white rounded-b -r p-4 flex flex-col justify-between leading-normal"
				>
					<div class="text-black font-semibold text-l mb-2 flex justify-between">
						<router-link :to="{ name: 'project', params: { id: id }}">
							<div>{{title}}</div>
						</router-link>
						<div>
							<v-menu offset-x transition="slide-y-transition" bottom>
								<template v-slot:activator="{ on }">
									<font-awesome-icon
										icon="ellipsis-h"
										size="lg"
										class="text-black hover:text-gray-600"
										v-on="on"
									/>
								</template>
								<v-list>
									<v-list-item @click="deleteProject">
										<v-list-item-title>Delete</v-list-item-title>
									</v-list-item>
									<v-list-item @click="updateToggle=true">
										<v-list-item-title>Update</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>
							<v-dialog v-model="updateToggle" max-width="600px">
								<projectUpdateForm :id="id" :oldtitle="title"></projectUpdateForm>
							</v-dialog>
						</div>
					</div>

					<div class="flex items-center">
						<img
							class="w-10 h-10 rounded-full mr-4"
							src="../../assets/images/avatar.png"
							alt="Avatar of Jonathan Reinink"
						/>
						<div class="text-sm">
							<p class="text-black leading-none">{{owner}}</p>
							<p class="text-grey-dark">Aug 18</p>
						</div>
					</div>
				</div>
			</div>
		</v-card>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import projectUpdateForm from "../form/projectUpdateForm";

export default {
	name: "projectCard",
	components: { projectUpdateForm },
	props: {
		title: {
			required: true
		},
		owner: {
			required: true
		},
		id: {
			required: true
		}
	},
	data() {
		return {
			updateToggle: false
		};
	},
	methods: {
		...mapActions("project", ["deleteProject", "updateProject"]),
		deleteProject() {
			this.deleteProject(this.id);
		}
	}
};
</script>

<style>
</style>