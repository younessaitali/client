<template>
	<div class="flex justify-around">
		<section class="flex-1 flex justify-center bg-gray-200 h-screen">
			<div class="flex justify-center m-auto">
				<div class="w-full xl:w-3/4 lg:w-11/12">
					<div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none mr-auto ml-auto">
						<h3 class="pt-4 text-2xl text-center">Welcome!</h3>
						<form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-gray-700" for="email">Email</label>
								<input
									class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="email"
									type="email"
									placeholder="Email"
								/>
							</div>
							<div class="flex-grow mb-4 md:mr-1 md:mb-0">
								<label class="block mb-2 text-sm font-bold text-gray-700" for="password">Password</label>
								<input
									class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="password"
									type="password"
									placeholder="******************"
								/>
								<p class="text-xs italic text-red-500">Please choose a password.</p>
							</div>

							<div class="mb-6 text-center">
								<button
									class="w-full px-4 py-2 font-bold text-white bg-green-400 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="button"
								>Login Account</button>
							</div>
							<hr class="mb-6 border-t" />
							<div class="text-center">
								<a
									class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="#"
								>Forgot Password?</a>
							</div>
							<div class="text-center">
								<a
									class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="#"
								>You don't have an account? Create One!</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
		<section class="flex justify-center flex-1 bg-green-400 h-screen">
			<div class="m-auto max-w-sm">
				<img src="../assets/images/logo_transparent.png" alt srcset />
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: "signup"
};
</script>

<style>
</style>