<template>
	<vuescroll :ops="ops">
		<h1 class="p-6 text-3xl font-bold">Board</h1>
		<div class="p-6 flex">
			<slot></slot>
		</div>
	</vuescroll>
</template>

<script>
import vuescroll from "vuescroll";

export default {
	components: {  vuescroll },
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
			}
		};
	}
};
</script>

<style>
</style>