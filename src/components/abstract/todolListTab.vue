<template>
	<div>
		<div class="bg-gray-400 w-full h-1"></div>
		<div class="my-3 flex justify-between">
			<div class="font-bold text-xl">
				<font-awesome-icon icon="check-square" size="lg" class="text-black pr-2" />
				{{title}}
			</div>
			<div>
				<button class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded">Delete</button>
			</div>
		</div>
		<div class="bg-gray-400 w-full h-1"></div>
		<slot></slot>
		<div v-show="!todoFormToggle" @click="todoFormToggle=true" ref="addTask" class="mx-6">
			<v-chip label large class="w-full mb-2 text-center" color="#e8e8e8">Add an item</v-chip>
		</div>
		<div
			v-show="todoFormToggle"
			v-closable="{
						exclude: ['addTask'],
						handler: 'onClose'
						}"
		>
			<todoForm v-on:cancel="onClose" :todoListId="todoListId" :taskId="taskId" :boardId="boardId"></todoForm>
		</div>
	</div>
</template>

<script>
import todoForm from "../form/todoForm";
// class MyRef {
// 	// Static properties shared by all instances
// 	static ref = 0;

// 	static getref() {
// 		this.ref++;
// 		return "addTodo" + this.ref;
// 	}
// }
export default {
	name: "todoListTab",
	components: {
		todoForm
	},
	created() {
		// this.ini();
	},
	props: {
		title: {
			required: true
		},
		taskId: {
			required: true
		},
		boardId: {
			required: true
		},
		todoListId: {
			required: true
		}
	},
	data() {
		return {
			todoFormToggle: false
		};
	},
	methods: {
		onClose() {
			this.todoFormToggle = false;
		}
		// ini() {
		// 	this.addTodoRef = MyRef.getref();
		// 	console.log(this.addTodoRef);
		// }
	}
};
</script>

<style>
</style>