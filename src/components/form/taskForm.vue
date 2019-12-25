<template>
	<div class="bg-gray-100 w-full h-full task">
		<div class="flex flex-col px-6 py-4 description">
			<div class="font-bold text-xl mb-8">
				<font-awesome-icon icon="feather-alt" size="lg" class="text-gray-600" />
				{{title}}
			</div>
			<div class="text-lg font-semibold mb-2">Title</div>
			<v-text-field
				v-model="title"
				:error-messages="titleErrors"
				:counter="120"
				label="Title"
				required
				@input="$v.title.$touch()"
				@blur="$v.title.$touch()"
			></v-text-field>
			<div class="text-lg font-semibold mb-2">
				<font-awesome-icon icon="align-right" size="lg" class="text-gray-600 pr-2" />Description
			</div>
			<div>
				<v-textarea
					v-model="description"
					solo
					:error-messages="descriptionErrors"
					:counter="250"
					label="Description"
					@input="$v.description.$touch()"
					@blur="$v.description.$touch()"
					name="input-7-4"
				></v-textarea>
				<button class="button" type="submit" @click="submit">Submit!</button>
			</div>
		</div>
		<div class="flex flex-col px-2 py-4 taskTab">
			<div class="text-base font-medium text-gray-800 pt-7 mt-8 mb-3">ADD To Task</div>
			<div class>
				<v-chip label large class="w-full mb-2 text-center" color="#e8e8e8">
					<font-awesome-icon icon="user" size="lg" class="text-black pr-2" />Members
				</v-chip>
			</div>
			<div>
				<v-chip label large class="w-full mb-2 text-center" color="#e8e8e8">
					<font-awesome-icon icon="tags" size="lg" class="text-black pr-2" />Labels
				</v-chip>
			</div>
			<div>
				<v-chip label large class="w-full mb-2 text-center" color="#e8e8e8">
					<font-awesome-icon icon="check-square" size="lg" class="text-black pr-2" />Cheklist
				</v-chip>
			</div>
		</div>
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
		title: { required, maxLength: maxLength(120) },
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
			description: ""
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
		},
		descriptionErrors() {
			const errors = [];
			if (!this.$v.description.$dirty) return errors;
			!this.$v.description.maxLength &&
				errors.push("title must be at most 250 characters long");
			return errors;
		}
	},
	methods: {
		...mapActions("task", ["createTask"]),

		submit() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				if (
					this.createTask({
						title: this.title,
						boardId: this.boardId,
						description: this.description
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