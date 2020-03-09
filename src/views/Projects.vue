<template>
	<div class="home w-full">
		<Sidebar>
			<v-overlay v-if="loading" :value="loading">
				<v-progress-circular indeterminate size="64"></v-progress-circular>
			</v-overlay>
			<div v-else class="flex h-screen overflow-x-auto pr-10">
				<projectSideBar :projectName="getProject.title" :owner="getProject.owner" :project_id="id"></projectSideBar>
				<boards>
					<draggable v-model="project.boards" class="flex" v-on:input="boardSort">
						<!-- <transition-group> -->
						<div v-for="(board, index) in project.boards" :key="index">
							<board
								:title="board.title"
								:boardId="board.id"
								:projectId="getProject.id"
								:sort="board.sort"
							>
								<draggable :list="board.tasks" group="task" v-on:change="sort($event,board)">
									<div v-for="(task, index) in board.tasks" :key="index">
										<task
											:title="task.title"
											:description="task.description"
											:taskId="task.id"
											:sort="task.sort"
											:boardId="board.id"
										></task>
									</div>
								</draggable>
							</board>
						</div>
						<!-- </transition-group> -->
					</draggable>
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
import { mapGetters, mapActions, mapState } from "vuex";
import draggable from "vuedraggable";

// import dashboard from "../components/dashboard";
export default {
	name: "projects",
	components: { draggable, Sidebar, projectSideBar, boards, board, task },
	props: {
		id: {
			required: true
		}
	},
	data() {
		return {
			loading: true
		};
	},
	computed: {
		...mapState("showProject", {
			project: state => state.project.project
			// boards: state =>
			// 	state.project.project.boards.sort((a, b) => a.sort - b.sort)
			//todo add sort to boards after add it to task and roll back migration
			//  {
			// 	get: function(state) {
			// 		return state.project;
			// 	},
			// 	set: function(state, { newvalue }) {
			// 		state.project = newvalue;
			// 	}
			// }
		}),
		...mapGetters("showProject", ["getProject", "getBoards"])
	},
	methods: {
		...mapActions("showProject", ["fetchProject"]),
		...mapActions("board", ["sortUpdateBoard"]),
		...mapActions("task", ["updateSortTask"]),
		sort(event, board) {
			console.log(board);
			console.log(event);
			board.tasks.forEach((task, index) => {
				this.updateSortTask({
					id: task.id,
					boardId: board.id,
					title: task.title,
					sort: index + 1
				});
			});
		},
		boardSort(inputs) {
			inputs.forEach((board, index) => {
				this.sortUpdateBoard({
					id: board.id,
					title: board.title,
					projectId: board.project_id,
					sort: index + 1
				});
			});
		}
	},
	async created() {
		const k = await this.fetchProject(this.id);
		this.loading = !k;
	}
};
</script>
<style lang="scss">
</style>
