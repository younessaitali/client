<template>
	<div>
		<div v-for="(todo, index) in getTodo(boardId,taskId,todoListId)" :key="index">
			<todotitle
				:taskId="taskId"
				:boardId="boardId"
				:todoListId="todoListId"
				:title="todo.title"
				:id="todo.id"
			></todotitle>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import todotitle from "../inputs/todoTitle";

export default {
	name: "todo",
	components: { todotitle },
	props: {
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
			addItemColor: "#e8e9ea",
			addTogle: false,
			editeToggle: false,
			loading: false,
			title: "",
			test: null
		};
	},
	mounted() {
		this.test = this.getTodo(this.boardId, this.taskId, this.todoListId);
	},
	computed: {
		...mapGetters("todo", ["getTodo"]),
		titleErrors() {
			const errors = [];
			if (!this.$v.title.$dirty) return errors;
			!this.$v.title.maxLength &&
				errors.push("title must be at most 30 characters long");
			!this.$v.title.required && errors.push("title is required.");
			return errors;
		}
	},
	methods: {
		todoToggle() {
			setTimeout(() => {
				if (this.addItemColor == "#e8e9ea")
					this.addItemColor = "#ffffff";
				else if (this.addItemColor == "#ffffff")
					this.addItemColor = "#e8e9ea";
				this.addTogle = !this.addTogle;
			}, 250);
		},
		destroy() {},
		update() {}
	}
};
</script>

<style>
</style>