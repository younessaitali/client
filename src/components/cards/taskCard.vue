<template>
	<span>
		<div
			class="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-gray-100"
			@click="dialog = true"
		>{{title}}</div>
		<v-dialog v-model="dialog" max-width="800px">
			<div class="bg-gray-100 w-full h-full flex">
				<div class="flex flex-col px-6 py-4">
					<div class="font-bold text-xl mb-8">
						<font-awesome-icon icon="feather-alt" size="lg" class="text-gray-600" />
						{{title}}
					</div>
					<div class="text-lg font-semibold mb-2">
						<font-awesome-icon icon="align-right" size="lg" class="text-gray-600 pr-2" />Description
					</div>
					<div>
						<v-textarea
							solo
							name="input-7-4"
							label="Description"
							:value="description"
							v-on:mousedown="test"
						></v-textarea>
					</div>
				</div>
			</div>
		</v-dialog>
	</span>
</template>

<script>
export default {
	props: {
		title: {
			required: true
		},
		description: {
			required: true
		}
	},
	data() {
		return {
			dialog: false
		};
	},
	methods: {
		test() {
			console.log("hahahha");
		}
	}
};
</script>

<style>
</style>