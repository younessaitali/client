<template>
	<span>
		<div
			class="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-gray-100"
			@click="dialog = true"
		>{{title}}</div>
		<v-dialog v-model="dialog" max-width="800px">
			<div class="bg-gray-100 w-full h-full task">
				<div class="flex flex-col px-6 py-4 description">
					<div class="font-bold text-xl mb-8">
						<font-awesome-icon icon="feather-alt" size="lg" class="text-gray-600" />
						{{title}}
					</div>
					<div class="text-lg font-semibold mb-2">
						<font-awesome-icon icon="align-right" size="lg" class="text-gray-600 pr-2" />Description
					</div>
					<div>
						<v-textarea
							:background-color="backgroundColor"
							solo
							name="input-7-4"
							label="Description"
							:value="description"
							v-on:focus="buttonHandller"
							v-on:blur="buttonHandller"
						></v-textarea>
						<button
							v-if="saveTogle"
							@click="updateDescription"
							class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						>Save</button>
					</div>
				</div>
				<div class="flex flex-col px-2 py-4 taskTab">
					<div class="text-base font-medium text-gray-800 pt-7 mt-8 mb-3">ADD To Task</div>
					<div class>
						<v-chip label large class="w-full mb-2 text-center" color="#e8e8e8">
							<font-awesome-icon icon="user" size="lg" class="text-black pr-2" />Members
						</v-chip>
					</div>
					<div>
						<v-chip label large class="w-full mb-2 text-center" color="#e8e8e8">
							<font-awesome-icon icon="tags" size="lg" class="text-black pr-2" />Labels
						</v-chip>
					</div>
					<div>
						<v-chip label large class="w-full mb-2 text-center" color="#e8e8e8">
							<font-awesome-icon icon="check-square" size="lg" class="text-black pr-2" />Cheklist
						</v-chip>
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
			dialog: false,
			saveTogle: false,
			backgroundColor: "#e8e9ea"
		};
	},
	methods: {
		buttonHandller() {
			setTimeout(() => {
				if (this.backgroundColor == "#e8e9ea")
					this.backgroundColor = "#ffffff";
				else if (this.backgroundColor == "#ffffff")
					this.backgroundColor = "#e8e9ea";
				this.saveTogle = !this.saveTogle;
			}, 250);
		},
		updateDescription() {
			console.log("test works");
		}
	}
};
</script>

<style lang="scss">
.task {
	display: flex;
	.description {
		flex: 4;
	}
	.taskTab {
		flex: 1;
	}
}
</style>