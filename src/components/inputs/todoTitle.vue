<template>
	<div>
		<div class="flex justify-between" v-show="!editeToggle">
			<v-checkbox :label="title" color="success" value="title" hide-details></v-checkbox>
			<v-menu offset-x transition="slide-y-transition" bottom>
				<template v-slot:activator="{ on }">
					<font-awesome-icon icon="ellipsis-h" class="text-black mt-5 hover:text-gray-600" v-on="on" />
				</template>
				<v-list>
					<v-list-item @click="destroy">
						<v-list-item-title>Delete</v-list-item-title>
					</v-list-item>
					<v-list-item @click="editeToggle=true">
						<v-list-item-title>Update</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</div>
		<div v-show="editeToggle">
			<v-text-field
				class="pl-2 mt-2"
				solo
				name="input-7-4"
				v-model="newtitle"
				:error-messages="titleErrors"
				:counter="30"
				label="Title"
				required
				@input="$v.title.$touch()"
				@blur="$v.title.$touch()"
			></v-text-field>
			<v-btn small class="ml-2" @click="update" :loading="loading" :disabled="loading" color="info">
				Update
				<template v-slot:loader>
					<span>Updating...</span>
				</template>
			</v-btn>
			<v-btn small class="ml-2" color="error" @click="editeToggle=false">cancel</v-btn>
		</div>
	</div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
	mixins: [validationMixin],
	validations: {
		title: { required, maxLength: maxLength(30) }
	},
	props: {
		taskId: {
			required: true
		},
		boardId: {
			required: true
		},
		todoListId: {
			required: true
		},
		title: {
			required: true
		},
		id: {
			required: true
		}
	},
	data() {
		return {
			editeToggle: false,
			loading: false,
			newtitle: ""
		};
	},
	mounted() {
		this.newtitle = this.title;
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
		...mapActions("todo", ["deleteTodo", "updateTodo"]),
		destroy() {
			this.deleteTodo({
				id: this.id,
				taskId: this.taskId,
				boardId: this.boardId,
				todoListId: this.todoListId
			});
		},
		async update() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				this.loading = true;
				if (
					await this.updateTodo({
						id: this.id,
						taskId: this.taskId,
						boardId: this.boardId,
						todoListId: this.todoListId,
						title: this.newtitle
					})
				) {
					this.clear();
					this.loading = false;
					this.editeToggle = false;
				}
			}
		},
		clear() {
			this.$v.$reset();
			this.newtitle = "";
		}
	}
};
</script>

<style>
</style>