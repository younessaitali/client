<template>
	<div class="flex justify-around">
		<section class="flex justify-center flex-1 bg-blue-400 h-screen">
			<div class="m-auto max-w-sm">
				<img src="../assets/images/logo_transparent.png" alt srcset />
			</div>
		</section>
		<section class="flex-1 flex justify-center bg-gray-200 h-screen">
			<div class="flex justify-center m-auto">
				<div class="w-full xl:w-3/4 lg:w-11/12">
					<div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none mr-auto ml-auto">
						<h3 class="pt-4 text-2xl text-center">Create an Account!</h3>
						<form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<div class="mb-4 md:mr-2 md:mb-0">
								<label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">Full Name</label>
								<!-- <input
									class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="Name"
									type="text"
									placeholder=" Name"
								/>-->
								<v-text-field
									class="mt-4"
									solo
									name="input-7-4"
									v-model="name"
									:error-messages="nameErrors"
									label="Full Name"
									required
									@input="$v.name.$touch()"
									@blur="$v.name.$touch()"
								></v-text-field>
							</div>
							<div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-gray-700" for="email">Email</label>
								<v-text-field
									class="mt-4"
									solo
									name="input-7-4"
									v-model="email"
									:error-messages="emailErrors"
									label="Email"
									required
									@input="$v.email.$touch()"
									@blur="$v.email.$touch()"
								></v-text-field>
							</div>
							<div class="mb-4 md:flex md:justify-between">
								<div class="flex-grow mb-4 md:mr-1 md:mb-0">
									<label class="block mb-2 text-sm font-bold text-gray-700" for="password">Password</label>
									<v-text-field
										class="mt-4"
										solo
										name="input-7-4"
										v-model="password"
										:error-messages="passwordErrors"
										label="password"
										required
										@input="$v.password.$touch()"
										@blur="$v.password.$touch()"
									></v-text-field>
								</div>
								<div class="flex-grow md:ml-2">
									<label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">Confirm Password</label>
									<v-text-field
										class="mt-4"
										solo
										name="input-7-4"
										v-model="repeatPassword"
										:error-messages="repeatPasswordErrors"
										label="Confirm Password"
										required
										@input="$v.repeatPassword.$touch()"
										@blur="$v.repeatPassword.$touch()"
									></v-text-field>
								</div>
							</div>
							<div class="mb-6 text-center">
								<v-btn
									@click="submit"
									:loading="loading"
									:disabled="loading"
									rounded
									color="blue darken-1"
									class="w-full px-4 py-2 font-bold text-white"
									dark
								>Register Account</v-btn>
							</div>
							<hr class="mb-6 border-t" />

							<div class="text-center">
								<router-link to="/login">
									<span
										class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									>Already have an account? 
									!</span>
								</router-link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import {
	required,
	maxLength,
	minLength,
	email,
	sameAs
} from "vuelidate/lib/validators";

export default {
	mixins: [validationMixin],
	validations: {
		name: { required, maxLength: maxLength(120), minLength: minLength(4) },
		email: { required, email },
		password: { required, minLength: minLength(6) },
		repeatPassword: { required, sameAsPassword: sameAs("password") }
	},
	name: "signup",
	data() {
		return {
			name: "",
			email: "",
			password: "",
			repeatPassword: "",
			loading: false
		};
	},
	computed: {
		nameErrors() {
			const errors = [];
			if (!this.$v.name.$dirty) return errors;
			!this.$v.name.maxLength &&
				errors.push("name must be at most 120 characters long");
			!this.$v.name.minLength &&
				errors.push("Name must have at least 4 letters");
			!this.$v.name.required && errors.push("name is required.");
			return errors;
		},
		emailErrors() {
			const errors = [];
			if (!this.$v.email.$dirty) return errors;
			!this.$v.email.email && errors.push("Email not correct");
			!this.$v.email.required && errors.push("email is required");
			return errors;
		},
		passwordErrors() {
			const errors = [];
			if (!this.$v.email.$dirty) return errors;
			!this.$v.password.minLength &&
				errors.push("Password must have at least 6 letters");
			!this.$v.password.required && errors.push("password is required");
			return errors;
		},
		repeatPasswordErrors() {
			const errors = [];
			if (!this.$v.email.$dirty) return errors;
			!this.$v.repeatPassword.sameAsPassword &&
				errors.push("Passwords must be identical");
			!this.$v.repeatPassword.required &&
				errors.push("password is required");

			return errors;
		}
	},
	methods: {
		...mapActions("auth", ["register"]),

		async submit() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				this.loading = true;
				if (
					await this.register({
						name: this.name,
						email: this.email,
						password: this.password
					})
				) {
					this.clear();
					this.loading = false;
				}
			}
		}
	}
};
</script>

<style>
</style>