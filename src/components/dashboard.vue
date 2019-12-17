<template>
	<div class="w-full">
		<h1 class="p-6 text-3xl font-bold">DashBoard</h1>
		<div class="momo">
			<div class="item1 w-full p-2 flex-row">
				<v-card class="w-11/12" max-width="830" outlined>
					<div class="bg-blue-500 w-full h-2"></div>
					<div class="w-full flex justify-between p-4">
						<div>
							<h1 class="text-black font-bold text-xl">Projects</h1>
						</div>
						<div>
							<font-awesome-icon icon="ellipsis-h" size="lg" class="text-black" />
						</div>
					</div>
					<slot name="project"></slot>
				</v-card>
			</div>
			<div class="item2 w-full p-2 flex-row">
				<v-card class="w-11/12 mb-5" max-width="700" outlined>
					<div class="bg-blue-500 w-full h-2"></div>
					<div class="w-full flex justify-between p-4">
						<div>
							<h1 class="text-black font-bold text-xl">Assigned to Me</h1>
						</div>
						<div>
							<font-awesome-icon icon="ellipsis-h" size="lg" class="text-black" />
						</div>
					</div>
					<slot name="assignment"></slot>
				</v-card>
				<v-card class="w-11/12" max-width="700" outlined>
					<div class="bg-blue-500 w-full h-2"></div>
					<div class="w-full flex justify-between p-4">
						<div>
							<h1 class="text-black font-bold text-xl">Activities</h1>
						</div>
						<div>
							<font-awesome-icon icon="ellipsis-h" size="lg" class="text-black" />
						</div>
					</div>
					<slot name="activities"></slot>
				</v-card>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	components: {}
};
</script>

<style lang="scss">
.momo {
	display: flex;
	justify-content: spacee-between;
	.item1 {
		flex: 20;
	}
	.item2 {
		flex: 15;
	}
}
</style>