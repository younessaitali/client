<template>
	<div class="cursor-pointer mb-4">
		<div
			:class="[{'bg-blue-700':selected}, 'hover:bg-blue-700 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden']"
		>
			<font-awesome-icon :icon="iconName" size="lg" class="text-white" />
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