<template>
	<div
		:class="[{'bg-blue-800':selected},'text-white mb-5 px-4 flex justify-between hover:bg-blue-800']"
	>
		<div class="pr-2">
			<font-awesome-icon :icon="iconName" size="lg" class="text-white" />
		</div>
		<div class="flex-auto">
			<h1 class="font-semibold text-xl leading-tight mb-1 truncate">{{name}}</h1>
		</div>
	</div>
</template>

<script>
export default {
	name: "navButton",
	props: {
		name: {
			required: true
		},
		iconName: {
			required: true
		},
		selected: {
			default: false
		}
	},
	data() {
		return {};
	},
	mounted() {}
};
</script>

<style>
</style>