<template>
  <li
    class="mb-1 whitespace-nowrap"
  >
    <router-link :to="link" class="transition-all p-3 flex items-center text-neutral-800 dark:text-slate-50 rounded-xl hover:text-lime-500 hover:bg-neutral-800 dark:hover:bg-lime-500 dark:hover:text-neutral-800">
      <slot name="icon"></slot>
      <div class="hidden md:block">{{ label }}</div>
    </router-link>
  </li>
</template>

<script setup>
defineProps({
	label: String,
	link: String,
})
</script>
