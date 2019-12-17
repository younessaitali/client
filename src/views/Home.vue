<template>
	<div class="home w-full">
		<Sidebar>
			<dashboard>
				<template v-slot:project>
					<projectCard title="new project" owner="yonessu"></projectCard>
				</template>
			</dashboard>
		</Sidebar>
	</div>
</template>

<script>
import Sidebar from "../components/mainSideBar";
import dashboard from "../components/dashboard";
import projectCard from "../components/cards/projectCard";

export default {
	name: "home",
	components: { Sidebar, dashboard, projectCard }
};
</script>
