<template>
	<div class="font-sans antialiased h-screen flex">
		<div class="bg-blue-500 text-purple-lighter flex-none w-24 p-6">
			<div class="flex flex-col h-full justify-between">
				<div>
					<div v-for="(tab, index) in tabs" @click="active_tab(tab)" :key="index">
						<navButton :name="tab.name" :iconName="tab.iconName" :selected="tab.selected"></navButton>
					</div>
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
							:class="[{'bg-blue-700':false}, 'hover:bg-blue-700 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden']"
						>
							<font-awesome-icon icon="cogs" size="lg" class="text-white" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<slot></slot>
	</div>
</template>

<script>
import navButton from "./abstract/navButton";
export default {
	name: "sideBar",
	components: { navButton },
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
				},
				{
					name: "add",
					iconName: "plus",
					selected: false
				}
			]
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