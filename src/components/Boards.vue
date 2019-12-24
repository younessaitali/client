<template>
	<vuescroll :ops="ops">
		<h1 class="p-6 text-3xl font-bold">Board</h1>
		<div class="p-6 flex">
			<slot></slot>
			<div class="rounded bg-gray-200 h-full w-64 p-2 mr-3">
				<div class="text-sm mt-2">
					<div
						@click="dialog=true"
						class="bg-gray-300 pl-2 pr-2 h-24 rounded mt-1 border-b border-grey cursor-pointer hover:bg-gray-400"
					>
						<p class="h-full text-gray-800 flex justify-center align-center font-bold text-xl">
							<font-awesome-icon icon="plus" size="lg" class="text-gray-800 p-1" />Add a Board
						</p>
					</div>
					<v-dialog v-model="dialog" max-width="800px">
						<boardFrom></boardFrom>
					</v-dialog>
				</div>
			</div>
		</div>
	</vuescroll>
</template>

<script>
import vuescroll from "vuescroll";
import boardFrom from "./form/boardForm";

export default {
	components: { vuescroll, boardFrom },
	data() {
		return {
			ops: {
				vuescroll: {
					mode: "slide",
					sizeStrategy: "number",
					detectResize: true
				},
				rail: { opacity: 0 },
				bar: { background: "#4299E1" }
			},
			dialog: false
		};
	},
	methods: {}
};
</script>

<style>
</style>