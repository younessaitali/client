<template>
	<div>
		<v-text-field
			class="mt-4"
			solo
			name="input-7-4"
			v-model="title"
			:error-messages="titleErrors"
			:counter="30"
			label="Title"
			required
			@input="$v.title.$touch()"
			@blur="$v.title.$touch()"
		></v-text-field>

		<v-btn
			small
			class="mb-2 -mt-3"
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
	</div>
</template>


<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

export default {
	name: "TaskForm",
	mixins: [validationMixin],
	validations: {
		title: { required, maxLength: maxLength(30) },
		description: { maxLength: maxLength(250) }
	},
	props: {
		boardId: {
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
				errors.push("title must be at most 30 characters long");
			!this.$v.title.required && errors.push("title is required.");
			return errors;
		}
	},
	methods: {
		...mapActions("task", ["createTask"]),

		async submit() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				this.loading = true;
				if (
					await this.createTask({
						title: this.title,
						boardId: this.boardId,
						description: this.description
					})
				) {
					this.clear();
					this.loading = false;
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