<template>
	<div class="bg-gray-100 w-full h-full max-w-4xl">
		<div class="flex flex-col px-6 py-4 description">
			<div class="font-bold text-xl mb-8">Create Todo List</div>

			<v-text-field
				v-model="title"
				:error-messages="titleErrors"
				:counter="120"
				label="Title"
				required
				@input="$v.title.$touch()"
				@blur="$v.title.$touch()"
			></v-text-field>

			<button class="button" type="submit" @click="submit">Submit!</button>
		</div>
	</div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
	name: "todoListForm",
	mixins: [validationMixin],
	validations: {
		title: { required, maxLength: maxLength(120) }
	},
	props: {
		taskId: {
			required: true
		},
		boardId: {
			required: true
		}
	},
	data() {
		return {
			title: "",
			submitStatus: null
		};
	},
	computed: {
		titleErrors() {
			const errors = [];
			if (!this.$v.title.$dirty) return errors;
			!this.$v.title.maxLength &&
				errors.push("title must be at most 120 characters long");
			!this.$v.title.required && errors.push("title is required.");
			return errors;
		}
	},
	methods: {
		...mapActions("todoList", ["createTodoList"]),

		submit() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				if (
					this.createTodoList({
						title: this.title,
						taskId: this.taskId,
						boardId: this.boardId
					})
				) {
					this.clear();
					this.$emit("submitSuccess");
				}
			}
		},
		clear() {
			this.$v.$reset();
			this.title = "";
		}
	}
};
</script>

<style>
</style>