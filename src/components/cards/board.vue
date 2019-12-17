<template>
	<div class="pr-5">
		<div class="rounded bg-gray-200 w-64 p-2 mr-3">
			<div class="flex justify-between py-1">
				<h3 class="text-sm">{{title}}</h3>
				<div>
					<font-awesome-icon icon="ellipsis-h" size="xs" class="text-black" />
				</div>
			</div>
			<div class="text-sm mt-2">
				<slot></slot>

				<div class="pl-2 pr-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-gray-400">
					<p class="mt-3 text-grey-dark">
						<font-awesome-icon icon="plus" size="lg" class="text-gray-600 p-1" />Add a card
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["title"]
};
</script>

<style>
</style>