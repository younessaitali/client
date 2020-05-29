<template>
	<span>
		<div
			class="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-gray-100 flex justify-between"
			@mouseleave="editeToggle=false"
			@mouseover="editeToggle=true"
		>
			<div @click="dialog = true" class="w-full">{{title}}</div>
			<div @click="destroyTask">
				<font-awesome-icon v-show="editeToggle" icon="trash-alt" size="2x" class="text-gray-600 pr-2" />
			</div>
		</div>
		<v-dialog v-model="dialog" max-width="800px">
			<div class="bg-gray-100 w-full h-full task">
				<div class="flex flex-col px-6 py-4 description">
					<taskTitle :taskId="taskId" :boardId="boardId" :oldtitle="title" :sort="sort"></taskTitle>
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
					<div v-for="(todoList, index) in getTodoList(boardId,taskId)" :key="index">
						<todoListTab
							:todoListId="todoList.id"
							:title="todoList.title"
							:taskId="taskId"
							:boardId="boardId"
						>
							<div class="mx-6">
								<todo :todoListId="todoList.id" :taskId="taskId" :boardId="boardId"></todo>
							</div>
						</todoListTab>
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
import todoListTab from "../abstract/todolListTab";
import todo from "../cards/todo";
import taskTitle from "../inputs/taskTitle";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

export default {
	components: { todoListForm, todoListTab, todo, taskTitle },
	mixins: [validationMixin],
	validations: {
		description: { maxLength: maxLength(250) }
	},
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
		},
		sort: {
			required: true
		}
	},
	data() {
		return {
			todoListTrigger: false,
			dialog: false,
			saveTogle: false,
			descriptionColor: "#e8e9ea",
			editeToggle: false
		};
	},
	computed: {
		...mapGetters("todoList", ["getTodoList"])
	},
	methods: {
		...mapActions("task", ["deleteTask"]),
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
			// console.log("test works");
		},

		TodoLists() {
			return this.getTodoList(this.boardId, this.taskId);
		},
		destroyTask() {
			this.deleteTask({ id: this.taskId, boardId: this.boardId });
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