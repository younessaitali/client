<template>
	<div class="home w-full">
		<Sidebar>
			<dashboard>
				<template v-slot:project>
					<div @click="handellogout">
						<projectCard title="new project" owner="yonessu"></projectCard>
					</div>
				</template>
			</dashboard>
		</Sidebar>
	</div>
</template>


<script>
import Sidebar from "../components/mainSideBar";
import dashboard from "../components/dashboard";
import projectCard from "../components/cards/projectCard";
import { mapGetters, mapActions } from "vuex";

export default {
	name: "home",
	data() {
		return {};
	},
	components: { Sidebar, dashboard, projectCard },
	computed: {
		...mapGetters("auth", [
			"authenticating",
			"authenticationError",
			"authenticationErrorCode",
			"authenticationSuccess",
			"getAccessToken"
		])
	},
	methods: {
		...mapActions("auth", ["logout"]),

		handellogout() {
			console.log(this.getAccessToken);
			this.logout(this.getAccessToken);
			// console.log("logout");
		}
	}
};
</script>
