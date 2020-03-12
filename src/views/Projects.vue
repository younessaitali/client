<template>
	<div class="home w-full">
		<Sidebar>
			<v-overlay v-if="loading" :value="loading">
				<v-progress-circular indeterminate size="64"></v-progress-circular>
			</v-overlay>
			<div v-else class="flex h-screen overflow-x-auto pr-10">
				<projectSideBar :projectName="getProject.title" :owner="getProject.ownerName" :project_id="id"></projectSideBar>
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
// import Pusher from "pusher-js";
window.Pusher = require("pusher-js");
import Echo from "laravel-echo";

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
			loading: true,
		};
	},
	computed: {
		...mapState("showProject", {
			project: state => state.project.project
		}),
		...mapState("auth", {
			token: state => state.accessToken
		}),
		...mapGetters("showProject", ["getProject", "getBoards", "getAuth"])
	},
	methods: {
		...mapActions("showProject", ["fetchProject"]),
		...mapActions("board", [
			"sortUpdateBoard",
			"createBoardPusher",
			"updateBoardPusher",
			"deleteBoardPusher"
		]),
		...mapActions("task", [
			"updateSortTask",
			"createTaskPusher",
			"updateTaskPusher",
			"deleteTaskPusher"
		]),
		sort(event, board) {
			
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
		},
		pusherEvent() {
			window.Echo = new Echo({
				broadcaster: "pusher",
				key: "77c6e23840f549a91042",
				cluster: "eu",
				forceTLS: true,
				authEndpoint: "http://homestead.test/broadcasting/auth",
				auth: {
					headers: {
						Authorization: "Bearer " + this.token
					}
				}
			});
			// console.log(this.getProject);
			window.Echo.private(`project.${this.getProject.id}`).listen(
				"createBoard",
				e => {
					// if (e.user.id != this.getAuth.id) console.log(e);
					this.createBoardPusher({
						bloop: e,
						userId: this.getAuth.id
					});
				}
			);
			window.Echo.private(`project.${this.getProject.id}`).listen(
				"updateBoard",
				e => {
					this.updateBoardPusher({
						bloop: e,
						userId: this.getAuth.id
					});
				}
			);
			window.Echo.private(`project.${this.getProject.id}`).listen(
				"removeBoard",
				e => {
					this.deleteBoardPusher({
						bloop: e,
						userId: this.getAuth.id
					});
				}
			);
			window.Echo.private(`project.${this.getProject.id}`).listen(
				"createTask",
				e => {
					this.createTaskPusher({
						bloop: e,
						userId: this.getAuth.id
					});
				}
			);
			window.Echo.private(`project.${this.getProject.id}`).listen(
				"updateTask",
				e => {
					this.updateTaskPusher({
						bloop: e,
						userId: this.getAuth.id
					});
				}
			);
			window.Echo.private(`project.${this.getProject.id}`).listen(
				"removeTask",
				e => {
					this.deleteTaskPusher({
						bloop: e,
						userId: this.getAuth.id
					});
				}
			);
		}
	},
	async created() {
		const k = await this.fetchProject(this.id);
		this.loading = !k;
		await this.pusherEvent();
	}
};
</script>
<style lang="scss">
</style>
