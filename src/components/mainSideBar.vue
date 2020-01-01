<template>
	<div class="font-sans antialiased flex">
		<div class="bg-blue-500 text-purple-lighter h-screen flex-none fixed w-24 p-6">
			<div class="flex flex-col h-full justify-between">
				<div>
					<div v-for="(tab, index) in tabs" @click="active_tab(tab)" :key="index">
						<navButton :name="tab.name" :iconName="tab.iconName" :selected="tab.selected"></navButton>
					</div>
					<addProject name="add" iconName="plus"></addProject>
				</div>
				<div>
					<div class="cursor-pointer mb-4">
						<div
							:class="[{'bg-blue-700':false}, 'hover:bg-blue-700 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden']"
						>
							<font-awesome-icon icon="bell" size="lg" class="text-white" />
						</div>
					</div>
					<div class="cursor-pointer">
						<div
							@click="settingsToggle=true"
							:class="[{'bg-blue-700':false}, 'hover:bg-blue-700 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden']"
						>
							<font-awesome-icon icon="cogs" size="lg" class="text-white" />
						</div>
						<v-dialog v-model="settingsToggle" max-width="800px">
							<settingsCard></settingsCard>
						</v-dialog>
					</div>
				</div>
			</div>
		</div>
		<div class="ml-24 w-full">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import navButton from "./abstract/navButton";
import addProject from "./abstract/addProject";
import settingsCard from "./cards/settingsCard";
export default {
	name: "sideBar",
	components: { navButton, addProject, settingsCard },
	data() {
		return {
			tabs: [
				{
					name: "calendar",
					iconName: "calendar-day",
					selected: false
				},
				{
					name: "projects",
					iconName: "tasks",
					selected: true
				},
				{
					name: "contact",
					iconName: "id-card-alt",
					selected: false
				}
			],
			dialog: false,
			settingsToggle: false
		};
	},
	methods: {
		active_tab(selectedTab) {
			this.tabs.forEach(tab => {
				tab.selected = tab.name == selectedTab.name;
			});
		}
	}
};
</script>

<style>
</style>