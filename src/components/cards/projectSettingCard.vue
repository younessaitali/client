<template>
	<div class="bg-white p-2 rounded mt-1 border-b border-grey">
		<div class="m-4">
			<v-simple-table>
				<template v-slot:default>
					<thead>
						<tr>
							<th class="text-left">Name</th>
							<th class="text-left">Email</th>
							<th class="text-left"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(owner, index) in owners" :key="index">
							<td>{{owner.name}}</td>
							<td>{{owner.email}}</td>
							<td>
								<v-btn
									small
									class="text-white"
									color="error"
									@click="deleteO(owner.pivot.owner_id,owner.pivot.project_id)"
								>Delete</v-btn>
							</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
			<v-divider></v-divider>
		</div>
		<div class="flex justify-around">
			<v-text-field
				class="mt-4 ml-2"
				solo
				name="input-7-4"
				v-model="email"
				:error-messages="emailErrors"
				:counter="120"
				label="Email"
				required
				@input="$v.email.$touch()"
				@blur="$v.email.$touch()"
			></v-text-field>
			<v-btn
				small
				class="mr-5 ml-5 mt-5 pt-5 pb-5"
				:loading="loading"
				:disabled="loading"
				color="info"
				@click="addOwner"
			>
				add owner
				<template v-slot:loader>
					<span>adding...</span>
				</template>
			</v-btn>
		</div>
	</div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
	mixins: [validationMixin],
	validations: {
		email: { required, email }
	},
	props: {
		project_id: {
			required: true
		}
	},
	data() {
		return {
			email: "",
			loading: false
		};
	},
	computed: {
		...mapState("showProject", {
			owners: state => state.project.project.owners
		}),

		emailErrors() {
			const errors = [];
			if (!this.$v.email.$dirty) return errors;
			!this.$v.email.maxLength && errors.push("insert a valid email");
			!this.$v.email.required && errors.push("email is required.");
			return errors;
		}
	},
	methods: {
		...mapActions("projectOwner", ["creatOwner", "deleteOwner"]),

		deleteO(owner_id, project_id) {
			this.deleteOwner({ id: owner_id, project_id: project_id });
		},
		async addOwner() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				this.loading = true;
				if (
					await this.creatOwner({
						email: this.email,
						project_id: this.project_id
					})
				) {
					this.clear();
					this.loading = false;
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