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
							:background-color="descriptionColor"
							solo
							name="input-7-4"
							label="Description"
							:value="description"
							v-on:focus="descriptionToggle"
							v-on:blur="descriptionToggle"
						></v-textarea>
						<button
							v-if="saveTogle"
							@click="updateDescription"
							class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
						>Save</button>
					</div>
					<div>
						<div class="bg-gray-400 w-full h-1"></div>
						<div class="my-3 flex justify-between">
							<div class="font-bold text-xl">
								<font-awesome-icon icon="check-square" size="lg" class="text-black pr-2" />Cheklist
							</div>
							<div>
								<button
									@click="DeleteTodoList"
									class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
								>Delete</button>
							</div>
						</div>
						<div>
							<div class="bg-gray-400 w-full h-1"></div>
							<div class="mx-6">
								<div>
									<v-checkbox label="su" color="success" value="success" hide-details></v-checkbox>
								</div>
								<v-text-field
									class="mt-4"
									:background-color="addItemColor"
									solo
									name="input-7-4"
									label="Add an item"
									v-on:focus="todoToggle"
									v-on:blur="todoToggle"
								></v-text-field>
								<button
									v-if="addTogle"
									@click="DeleteTodoList"
									class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded mb-3"
								>Save</button>
							</div>
						</div>
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
					<div @click="todoListTrigger=true">
						<v-chip label large class="w-full mb-2 text-center" color="#e8e8e8">
							<font-awesome-icon icon="check-square" size="lg" class="text-black pr-2" />Cheklist
						</v-chip>
						<v-dialog v-model="todoListTrigger" max-width="600px">
							<todoListForm :taskId="taskId" :boardId="boardId" v-on:submitSuccess="todoListTrigger=false"></todoListForm>
						</v-dialog>
					</div>
				</div>
			</div>
		</v-dialog>
	</span>
</template>

<script>
import todoListForm from "../form/todoListForm";
export default {
	components: { todoListForm },
	props: {
		title: {
			required: true
		},
		description: {
			required: true
		},
		taskId: {
			required: true
		},
		boardId: {
			required: true
		}
	},
	data() {
		return {
			todoListTrigger: false,
			dialog: false,
			saveTogle: false,
			addTogle: false,
			descriptionColor: "#e8e9ea",
			addItemColor: "#e8e9ea"
		};
	},
	methods: {
		descriptionToggle() {
			setTimeout(() => {
				if (this.descriptionColor == "#e8e9ea")
					this.descriptionColor = "#ffffff";
				else if (this.descriptionColor == "#ffffff")
					this.descriptionColor = "#e8e9ea";
				this.saveTogle = !this.saveTogle;
			}, 250);
		},
		updateDescription() {
			console.log("test works");
		},
		DeleteTodoList() {},
		todoToggle() {
			setTimeout(() => {
				if (this.addItemColor == "#e8e9ea")
					this.addItemColor = "#ffffff";
				else if (this.addItemColor == "#ffffff")
					this.addItemColor = "#e8e9ea";
				this.addTogle = !this.addTogle;
			}, 250);
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