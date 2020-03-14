<template>
	<div class="w-full h-full">
		<div class="bg-blue-700 text-purple-lighter h-full flex-none w-64 pb-6 hidden md:block">
			<div class="text-white mb-2 py-5 px-4 flex justify-between">
				<div class="flex-auto">
					<h1 class="font-semibold text-xl leading-tight mb-1 truncate">{{projectName}}</h1>
					<div class="flex items-center mb-6">
						<span class="bg-green-500 rounded-full block w-2 h-2 mr-2"></span>
						<span class="text-white pl-1 opacity-50 text-sm">{{owner}}</span>
					</div>
				</div>
				<div>
					<svg class="h-6 w-6 fill-current text-white opacity-25" viewBox="0 0 20 20">
						<path
							d="M14 8a4 4 0 1 0-8 0v7h8V8zM8.027 2.332A6.003 6.003 0 0 0 4 8v6l-3 2v1h18v-1l-3-2V8a6.003 6.003 0 0 0-4.027-5.668 2 2 0 1 0-3.945 0zM12 18a2 2 0 1 1-4 0h4z"
							fill-rule="evenodd"
						/>
					</svg>
				</div>
			</div>

			<div v-for="(tab, index) in sideBar" @click="active_tab(tab)" :key="index">
				<sideBarLink :name="tab.name" :iconName="tab.iconName" :selected="tab.selected"></sideBarLink>
			</div>
			<v-dialog v-model="Project_setting_toggle" max-width="800px">
				<projectSettingCard :project_id="project_id"></projectSettingCard>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import sideBarLink from "./abstract/sideBarLink";
import projectSettingCard from "./cards/projectSettingCard";
export default {
	components: { sideBarLink, projectSettingCard },
	props: {
		projectName: {
			required: true
		},
		owner: {
			required: true
		},
		project_id: {
			required: true
		}
	},
	data() {
		return {
			sideBar: [
				{
					name: "Road Map",
					iconName: "route",
					selected: false
				},
				{
					name: "Boards",
					iconName: "columns",
					selected: true
				},
				{
					name: "Pages",
					iconName: "file",
					selected: false
				},
				{
					name: "Project Settings",
					iconName: "sliders-h",
					selected: false
				}
			],
			Project_setting_toggle: false
		};
	},
	methods: {
		active_tab(selectedTab) {
			this.sideBar.forEach(tab => {
				tab.selected = tab.name == selectedTab.name;
			});
			switch (selectedTab.name) {
				case "Project Settings":
					this.Project_setting_toggle = true;
					break;
			}
		}
	}
};
</script>

<style>
</style>