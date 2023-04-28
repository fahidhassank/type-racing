import { createRouter, createWebHistory } from "vue-router"

const routes = [
	{ path: "/", component: () => import("@/pages/index.vue") },
	{ path: "/race", component: () => import("@/pages/race.vue") },
]

export default createRouter({
	history: createWebHistory(),
	routes,
	linkExactActiveClass: "!bg-neutral-800 !text-lime-500 !dark:bg-lime-500 !dark:text-neutral-800",
})
