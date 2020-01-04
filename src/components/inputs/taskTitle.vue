<template>
	<div class="font-bold text-xl mb-8">
		<div class="flex">
			<div class="pt-3">
				<font-awesome-icon icon="feather-alt" size="lg" class="text-gray-600" />
				<span @click="titleToggle=true" v-show="!titleToggle">{{title}}</span>
			</div>
			<div v-show="titleToggle">
				<v-text-field
					class="pl-2"
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
					class="-mt-10 ml-2"
					@click="save"
					:loading="titleloading"
					:disabled="titleloading"
					color="info"
				>
					Save
					<template v-slot:loader>
						<span>Saving...</span>
					</template>
				</v-btn>
				<v-btn small class="-mt-10 ml-2" color="error" @click="titleToggle=false">cancel</v-btn>
			</div>
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
		title: { required, maxLength: maxLength(30) },
		description: { maxLength: maxLength(250) }
	},
	props: {
		taskId: {
			required: true
		},
		boardId: {
			required: true
		},
		oldtitle: {
			required: true
		}
	},
	data() {
		return {
			titleToggle: false,
			titleloading: false,
			title: ""
		};
	},
	mounted() {
		this.title = this.oldtitle;
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
		...mapActions("task", ["updateTask"]),

		async save() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				this.titleloading = true;
				if (
					await this.updateTask({
						id: this.taskId,
						boardId: this.boardId,
						title: this.title
					})
				) {
					this.titleloading = false;
					this.titleToggle = false;
				}
			}
		}
	}
};
</script>

<style>
</style>