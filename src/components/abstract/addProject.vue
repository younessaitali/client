<template>
	<div class="cursor-pointer mb-4">
		<div
			@click="dialog = true"
			class="hover:bg-blue-700 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden"
		>
			<font-awesome-icon :icon="iconName" size="lg" class="text-white" />
		</div>
		<v-dialog v-model="dialog" max-width="800px">
			<projectForm v-on:submitSuccess="submitSuccess"></projectForm>
		</v-dialog>
	</div>
</template>

<script>
import projectForm from "../form/projectForm";
export default {
	components: { projectForm },
	name: "addProject",
	props: {
		name: {
			required: true
		},
		iconName: {
			required: true
		}
	},
	data() {
		return {
			dialog: false
		};
	},
	methods: {
		submitSuccess() {
			this.dialog = false;
		}
	}
};
</script>

<style>
</style>