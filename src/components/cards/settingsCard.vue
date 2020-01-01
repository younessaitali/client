<template>
	<div>
		<v-btn @click="handellogout" x-large color="primary" dark>Logout</v-btn>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	computed: {
		...mapGetters("auth", ["getAccessToken"])
	},
	methods: {
		...mapActions("auth", ["logout"]),

		handellogout() {
			this.logout(this.getAccessToken);
		}
	}
};
</script>

<style>
</style>