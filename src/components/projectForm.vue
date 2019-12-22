<template>
	<v-dialog v-model="dialog" max-width="800px">
		<div class="bg-gray-100 w-full h-full max-w-4xl">
			<div class="flex flex-col px-6 py-4 description">
				<div class="font-bold text-xl mb-8">Create Project</div>
				<form>
					<v-text-field
						v-model="title"
						:error-messages="titleErrors"
						:counter="10"
						label="Title"
						required
						@input="$v.title.$touch()"
						@blur="$v.title.$touch()"
					></v-text-field>
				</form>
			</div>
		</div>
	</v-dialog>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
export default {
	name: "ProjectForm",
	mixins: [validationMixin],
	validations: {
		title: { required, maxLength: maxLength(120) }
	},
	props: {
		dialog: {
			required: true,
			default: false
		}
	},
	data() {
		return {
			title: ""
		};
	},
	computed: {
		titleErrors() {
			const errors = [];
			if (!this.$v.title.$dirty) return errors;
			!this.$v.title.maxLength &&
				errors.push("title must be at most 10 characters long");
			!this.$v.title.required && errors.push("title is required.");
			return errors;
		}
	},
	methods: {}
};
</script>

<style>
</style>