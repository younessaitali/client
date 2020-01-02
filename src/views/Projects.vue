<template>
	<div class="home w-full">
		<Sidebar>
			<v-overlay v-if="loading" :value="loading">
				<v-progress-circular indeterminate size="64"></v-progress-circular>
			</v-overlay>
			<div v-else class="flex h-screen">
				<projectSideBar :projectName="getProject.title" :owner="getProject.owner"></projectSideBar>
				<boards>
					<div v-for="(board, index) in getBoards" :key="index">
						<board :title="board.title" :boardId="board.id" :projectId="getProject.id">
							<div v-for="(task, index) in getTasks(board)" :key="index">
								<task
									:title="task.title"
									:description="task.description"
									:taskId="task.id"
									:boardId="board.id"
								></task>
							</div>
						</board>
					</div>
				</boards>
			</div>
		</Sidebar>
	</div>
</template>

<script>
import Sidebar from "../components/mainSideBar";
import projectSideBar from "../components/projectSideBar";
import boards from "../components/Boards";
import board from "../components/cards/board";
import task from "../components/cards/taskCard";
import { mapGetters, mapActions } from "vuex";

// import dashboard from "../components/dashboard";
export default {
	name: "projects",
	components: { Sidebar, projectSideBar, boards, board, task },
	props: {
		id: {
			required: true
		}
	},
	data() {
		return {
			loading: true,
			watch: {}
		};
	},
	computed: {
		...mapGetters("showProject", ["getProject", "getBoards"])
	},
	methods: {
		...mapActions("showProject", ["fetchProject"]),
		getTasks(board) {
			return board.tasks;
		}
	},
	async created() {
		console.log(this.loading);
		const k = await this.fetchProject(this.id);
		this.loading = !k;
		console.log(this.loading);
	}
};
</script>
<style lang="scss">
</style>
