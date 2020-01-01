<template>
	<div class="flex justify-around">
		<section class="flex-1 flex justify-center bg-gray-200 h-screen">
			<div class="flex justify-center m-auto">
				<div class="w-full xl:w-3/4 lg:w-11/12">
					<div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none mr-auto ml-auto">
						<h3 class="pt-4 text-2xl text-center">Welcome!</h3>
						<form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
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

							<div class="mb-6 text-center">
								<button
									class="w-full px-4 py-2 font-bold text-white bg-green-400 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="button"
									@click="handleSubmit"
								>Login Account</button>
							</div>
							<hr class="mb-6 border-t" />
							<!-- <div class="text-center">
								<a
									class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="#"
								>Forgot Password?</a>
							</div>-->
							<div class="text-center">
								<router-link to="/signup">
									<span
										class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
										href="#"
									>You don't have an account? Create One!</span>
								</router-link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
		<section class="flex justify-center flex-1 bg-green-400 h-screen">
			<div class="m-auto max-w-sm">
				<img src="../assets/images/logo_transparent.png" alt srcset />
			</div>
		</section>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
	name: "login",
	mixins: [validationMixin],
	validations: {
		email: { required, email },
		password: { required, minLength: minLength(6) }
	},
	data() {
		return {
			email: "",
			password: ""
		};
	},
	computed: {
		...mapGetters("auth", [
			"authenticating",
			"authenticationError",
			"authenticationErrorCode",
			"authenticationSuccess"
		]),
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
		}
	},
	methods: {
		...mapActions("auth", ["login"]),
		handleSubmit() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				this.login({ email: this.email, password: this.password });
			}
		}
	}
};
</script>

<style>
</style>