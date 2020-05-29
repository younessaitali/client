<template>
	<div class="pr-5">
		<div class="rounded bg-gray-200 w-64 p-2 mr-3">
			<div class="flex justify-between py-1">
				<h3 class="text-sm">{{title}}</h3>
				<div>
					<v-menu offset-x transition="slide-y-transition" bottom>
						<template v-slot:activator="{ on }">
							<font-awesome-icon icon="ellipsis-h" class="text-black hover:text-gray-600" v-on="on" />
						</template>
						<v-list>
							<v-list-item @click="deleteB">
								<v-list-item-title>Delete</v-list-item-title>
							</v-list-item>
							<v-list-item @click="updateToggle=true">
								<v-list-item-title>Update</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
					<v-dialog v-model="updateToggle" max-width="600px">
						<boardUpdateForm
							:id="boardId"
							:oldTitle="title"
							:projectId="projectId"
							:sort="sort"
							v-on:submitSuccess="updateToggle=false"
						></boardUpdateForm>
					</v-dialog>
				</div>
			</div>
			<div class="text-sm mt-2">
				<slot></slot>

				<div
					v-show="!dialog"
					@click="dialog=true"
					ref="addTask"
					class="pl-2 pr-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-gray-400"
				>
					<p class="mt-3 text-grey-dark">
						<font-awesome-icon icon="plus" size="lg" class="text-gray-600 p-1" />Add a card
					</p>
				</div>
				<div
					v-show="dialog"
					v-closable="{
						exclude: ['addTask'],
						handler: 'onClose'
						}"
				>
					<taskForm :boardId="boardId"></taskForm>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import taskForm from "../form/taskForm";
import boardUpdateForm from "../form/boardFormUpdate";
import { mapGetters, mapActions } from "vuex";

export default {
	name: "board",
	components: {
		taskForm,
		boardUpdateForm
	},
	props: {
		title: {
			required: true
		},
		boardId: {
			required: true
		},
		sort: {
			required: true
		},
		projectId: {
			required: true
		}
	},
	data() {
		return {
			dialog: false,
			updateToggle: false
		};
	},
	computed: {},
	methods: {
		...mapActions("board", ["deleteBoard"]),

		onClose() {
			this.dialog = false;
		},
		deleteB() {
			// console.log(this.boardId);
			this.deleteBoard({ id: this.boardId });
		}
	}
};
</script>

<style>
</style>