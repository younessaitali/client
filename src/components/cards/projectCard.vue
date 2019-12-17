<template>
	<div class="p-4">
		<v-card dark class="w-full">
			<div class="flex">
				<div
					class="h-25 bg-cover rounded-t text-center flex-1"
					style="background-image: url('https://tailwindcss.com/img/card-left.jpg')"
					title="Woman holding a mug"
				></div>
				<div
					class="flex-1 border-r border-b border-l border-grey-light -grey-light bg-white rounded-b -r p-4 flex flex-col justify-between leading-normal"
				>
					<div class="text-black font-semibold text-l mb-2">{{title}}</div>

					<div class="flex items-center">
						<img
							class="w-10 h-10 rounded-full mr-4"
							src="../../assets/images/avatar.png"
							alt="Avatar of Jonathan Reinink"
						/>
						<div class="text-sm">
							<p class="text-black leading-none">{{owner}}</p>
							<p class="text-grey-dark">Aug 18</p>
						</div>
					</div>
				</div>
			</div>
		</v-card>
	</div>
</template>

<script>
export default {
	name: "projectCard",
	props: ["title", "owner"]
};
</script>

<style>
</style>