<template>
	<div class="z-10">
		<v-text-field
			class="mt-4"
			solo
			name="input-7-4"
			v-model="title"
			:error-messages="titleErrors"
			:counter="120"
			label="Title"
			required
			@input="$v.title.$touch()"
			@blur="$v.title.$touch()"
		></v-text-field>
		<v-btn
			small
			class="mb-2 -mt-1 ml-2 mr-3"
			:loading="loading"
			:disabled="loading"
			color="info"
			@click="submit"
		>
			Save
			<template v-slot:loader>
				<span>Saving...</span>
			</template>
		</v-btn>
		<v-btn small class="mb-2 -mt-1 ml-2 mr-3" color="error" @click="cancel">Cancel</v-btn>
	</div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
	name: "todoForm",
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
		},
		todoListId: {
			required: true
		}
	},
	data() {
		return {
			title: "",
			loading: false
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
		...mapActions("todo", ["createTodo"]),

		cancel() {
			this.$emit("cancel");
		},
		submit() {
			console.log("am in submit");

			this.$v.$touch();
			if (!this.$v.$invalid) {
				console.log("am in invali");
				if (
					this.createTodo({
						title: this.title,
						taskId: this.taskId,
						boardId: this.boardId,
						todoListId: this.todoListId
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