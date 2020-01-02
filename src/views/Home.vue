<template>
	<div class="home w-full">
		<Sidebar>
			<dashboard>
				<template v-slot:project>
					<div v-for="(project, index) in getProjects" :key="index">
						<projectCard :title="project.title" :owner="project.owner.name" :id="project.id"></projectCard>
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
		...mapGetters("project", ["getProjects"])
	},
	methods: {
		...mapActions("project", ["fetchProjects"])
	},
	created() {
		this.fetchProjects();
	}
};
</script>
