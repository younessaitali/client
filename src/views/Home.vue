<template>
	<div class="home w-full">
		<Sidebar>
			<dashboard>
				<template v-slot:project>
					<projectCard
						v-for="(project, index) in getProjects.projects"
						:key="index"
						:title="project.title"
						:owner="project.owner.name"
					></projectCard>
					<div @click="handellogout">
						<button>logout</button>
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
		...mapGetters("auth", ["getAccessToken"]),
		...mapGetters("project", ["getProjects"])
	},
	methods: {
		...mapActions("auth", ["logout"]),
		...mapActions("project", ["fetchProject"]),

		handellogout() {
			console.log(this.getAccessToken);
			this.logout(this.getAccessToken);
			// console.log("logout");
		}
	},
	mounted() {
		this.fetchProject();
	}
};
</script>
