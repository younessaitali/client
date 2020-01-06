<template>
	<div>
		<div class="bg-gray-400 w-full h-1"></div>
		<div class="my-3 flex justify-between">
			<div class="font-bold text-xl flex">
				<font-awesome-icon icon="check-square" size="lg" class="text-black pr-2" />
				<span @click="titleToggle=true" v-show="!titleToggle">{{title}}</span>
				<div v-show="titleToggle">
					<v-text-field
						class="pl-2"
						small
						solo
						name="input-7-4"
						v-model="newTitle"
						:error-messages="titleErrors"
						:counter="30"
						label="Title"
						required
						@input="$v.title.$touch()"
						@blur="$v.title.$touch()"
					></v-text-field>
				</div>
			</div>
			<div>
				<div v-show="!titleToggle">
					<v-btn small class="ml-2" @click="destroy" :loading="loading" :disabled="loading" color="info">
						Delete
						<template v-slot:loader>
							<span>Deleting...</span>
						</template>
					</v-btn>
				</div>
				<div v-show="titleToggle">
					<v-btn small class="ml-2" @click="update" :loading="loading" :disabled="loading" color="info">
						Update
						<template v-slot:loader>
							<span>Updating...</span>
						</template>
					</v-btn>
					<v-btn small class="ml-2" color="error" @click="titleToggle=false">cancel</v-btn>
				</div>
			</div>
		</div>
		<div class="bg-gray-400 w-full h-1"></div>
		<slot></slot>
		<div v-show="!todoFormToggle" @click="todoFormToggle=true" ref="addTask" class="mx-6">
			<v-chip label large class="w-full my-3 text-center" color="#e8e8e8">Add an item</v-chip>
		</div>
		<div
			v-show="todoFormToggle"
			v-closable="{
						exclude: ['addTask'],
						handler: 'onClose'
						}"
		>
			<todoForm v-on:cancel="onClose" :todoListId="todoListId" :taskId="taskId" :boardId="boardId"></todoForm>
		</div>
	</div>
</template>

<script>
import todoForm from "../form/todoForm";
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

// class MyRef {
// 	// Static properties shared by all instances
// 	static ref = 0;

// 	static getref() {
// 		this.ref++;
// 		return "addTodo" + this.ref;
// 	}
// }
export default {
	name: "todoListTab",
	components: {
		todoForm
	},
	mixins: [validationMixin],
	validations: {
		title: { required, maxLength: maxLength(30) },
		description: { maxLength: maxLength(250) }
	},
	created() {
		// this.ini();
	},
	props: {
		title: {
			required: true
		},
		taskId: {
			required: true
		},
		boardId: {
			required: true
		},
		todoListId: {
			required: true
		}
	},
	data() {
		return {
			todoFormToggle: false,
			loading: false,
			titleToggle: false,
			newTitle: ""
		};
	},
	mounted() {
		this.newTitle = this.title;
	},
	computed: {
		titleErrors() {
			const errors = [];
			if (!this.$v.title.$dirty) return errors;
			!this.$v.title.maxLength &&
				errors.push("title must be at most 30 characters long");
			!this.$v.title.required && errors.push("title is required.");
			return errors;
		}
	},
	methods: {
		...mapActions("todoList", ["deleteTodoList", "updateTodoList"]),

		onClose() {
			this.todoFormToggle = false;
		},
		async destroy() {
			this.deleteTodoList({
				id: this.todoListId,
				taskId: this.taskId,
				boardId: this.boardId
			});
		},
		async update() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				this.loading = true;
				if (
					await this.updateTodoList({
						id: this.todoListId,
						taskId: this.taskId,
						boardId: this.boardId,
						title: this.newTitle
					})
				) {
					this.loading = false;
					this.titleToggle = false;
				}
			}
		}
	}
};
</script>

<style>
</style>