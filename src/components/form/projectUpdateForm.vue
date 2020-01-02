<template>
	<div class="bg-gray-100 w-full h-full max-w-4xl">
		<div class="flex flex-col px-6 py-4 description">
			<div class="font-bold text-xl mb-8">Update Project</div>

			<v-text-field
				v-model="title"
				:error-messages="titleErrors"
				:counter="120"
				label="Title"
				required
				@input="$v.title.$touch()"
				@blur="$v.title.$touch()"
			></v-text-field>

			<v-btn
				large
				class="mb-2 -mt-3"
				:loading="loading"
				:disabled="loading"
				color="info"
				@click="update"
			>
				update
				<template v-slot:loader>
					<span>Saving...</span>
				</template>
			</v-btn>
		</div>
	</div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

export default {
	name: "ProjectForm",
	mixins: [validationMixin],
	validations: {
		title: { required, maxLength: maxLength(120) }
	},
	props: {
		id: {
			required: true
		},
		oldtitle: {
			required: true
		}
	},
	data() {
		return {
			title: "",
			loading: false
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
				errors.push("title must be at most 120 characters long");
			!this.$v.title.required && errors.push("title is required.");
			return errors;
		}
	},
	methods: {
		...mapActions("project", ["updateProject"]),

		async update() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				this.loading = true;
				if (
					await this.updateProject({ title: this.title, id: this.id })
				) {
					this.loading = false;
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