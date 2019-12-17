<template>
	<div class="font-sans antialiased h-screen flex">
		<div class="bg-blue-500 text-purple-lighter flex-none w-24 p-6">
			<div class="flex flex-col h-full justify-between">
				<div>
					<div class="cursor-pointer mb-4">
						<div
							class="bg-blue-700 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden"
						>
							<font-awesome-icon icon="calendar-day" size="lg" class="text-white" />
						</div>
					</div>
					<div class="cursor-pointer mb-4">
						<div
							class="bg-blue-700 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden"
						>
							<font-awesome-icon icon="tasks" size="lg" class="text-white" />
						</div>
					</div>
					<div class="cursor-pointer mb-4">
						<div
							class="bg-blue-700 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden"
						>
							<font-awesome-icon icon="id-card-alt" size="lg" class="text-white" />
						</div>
					</div>

					<div class="cursor-pointer">
						<div
							class="bg-white opacity-50 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden"
						>
							<svg
								class="fill-current h-10 w-10 block"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path
									d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"
								/>
							</svg>
						</div>
					</div>
				</div>
				<div>
					<div class="cursor-pointer mb-4">
						<div
							class="bg-blue-700 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden"
						>
							<font-awesome-icon icon="bell" size="lg" class="text-white" />
						</div>
					</div>
					<div class="cursor-pointer">
						<div
							class="bg-blue-700 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden"
						>
							<font-awesome-icon icon="cogs" size="lg" class="text-white" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "sideBar"
};
</script>

<style>
</style>