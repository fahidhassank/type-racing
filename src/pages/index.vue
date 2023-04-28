<template>
	<div class="flex font-sans">
		<!-- Sidebar -->
		<Sidebar />
		<!-- /Sidebar -->
		<!-- Content Wrapper -->
		<div
			class="w-full px-4 py-6 text-neutral-800 dark:text-slate-50 transition-colors"
		>
			<div class="text-lg">
				<span class="font-light">Welcome Back, </span>
				<span class="font-bold">Wilson</span>
			</div>
			<div class="text-neutral-500 text-xs font-light">
				You have 3 delivered packages
			</div>
			<div class="grid grid-cols-12 gap-4 mt-4">
				<div class="col-span-3 p-4 bg-white drop-shadow-sm rounded-lg"></div>
				<div class="col-span-6 p-4 bg-white drop-shadow-sm rounded-lg"></div>
				<div class="col-span-3 p-4 bg-white drop-shadow-sm rounded-lg"></div>
			</div>
		</div>
		<!-- /Content Wrapper -->
	</div>
</template>

<script setup>
import { ref } from "vue"
import Sidebar from "@/components/Sidebar.vue"

const novels = ref([])

novels.value.push(
	{ id: 1, name: "Cultivation Chat Group", author: "Author" },
	{ id: 2, name: "The Kings Avatar", author: "Author" }
)
</script>

<script>
export default {
	mounted() {
		console.log("mounted")
	},
}
</script>
