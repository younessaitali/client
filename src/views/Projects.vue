<template>
	<div class="home w-full">
		<Sidebar>
			<projectSideBar></projectSideBar>
			<boards>
				<board title="new Board">
					<task title="new task"></task>
				</board>
			</boards>
		</Sidebar>
	</div>
</template>

<script>
import Sidebar from "../components/mainSideBar";
import projectSideBar from "../components/projectSideBar";
import boards from "../components/Boards";
import board from "../components/cards/board";
import task from "../components/cards/taskCard";
// import dashboard from "../components/dashboard";
export default {
	name: "home",
	components: { Sidebar, projectSideBar, boards, board, task }
};
</script>
