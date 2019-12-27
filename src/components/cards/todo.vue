<template>
	<div>
		<div v-for="(todo, index) in getTodo(boardId,taskId,todoListId)" :key="index">
			<v-checkbox :label="todo.title" color="success" value="title" hide-details></v-checkbox>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "todo",
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
			addTogle: false
		};
	},
	computed: {
		...mapGetters("todo", ["getTodo"])
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
		}
	}
};
</script>

<style>
</style>