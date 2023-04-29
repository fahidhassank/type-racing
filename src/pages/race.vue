<template>
	<div
		class="flex flex-col h-screen select-none dark:text-neutral-300 font-mono"
	>
		<div class="p-4 flex">
			<div>
				<div class="text-sm text-left">Accuracy</div>
				<div class="text-xl">{{ accuracy }}%</div>
			</div>
			<div class="mx-auto text-center">
				<div class="text-sm">WPM</div>
				<div class="text-xl">{{ time ? wpm : 0 }}</div>
			</div>
			<div class="text-right">
				<div class="text-sm">Time</div>
				<div class="text-xl">{{ timer }}</div>
			</div>
		</div>
		<div class="p-10 flex items-center justify-center flex-grow">
			<div class="text-2xl font-medium leading-relaxed text-center">
				<span
					v-for="character in characters"
					class="transition-all px-0.5"
					:class="{
						'text-neutral-500 dark:text-neutral-600':
							character.status === 'success',

						'bg-blue-500 text-white':
							character.position === cursorPosition &&
							character.status != 'error',
						'bg-red-600 text-white': character.status == 'error',
					}"
					:key="character.position"
					>{{ character.letter }}</span
				>
			</div>
		</div>

		<div
			class="fixed h-screen w-screen bg-neutral-500 dark:bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
			v-if="cursorPosition === text.length"
		>
			<div
				class="bg-white dark:bg-neutral-900 p-6 rounded tracking-wider w-[300px] max-w-full uppercase text-center"
			>
				<div class="text-2xl font-bold mb-4">Race Completed</div>
				<div
					class="flex justify-between items-center text-lg font-bold text-neutral-700 dark:text-current"
				>
					<div>Accuracy:</div>
					<div>{{ accuracy }}%</div>
				</div>
				<div
					class="flex justify-between items-center text-lg font-bold text-neutral-700 dark:text-current"
				>
					<div>WPM:</div>
					<div>{{ wpm }}</div>
				</div>
				<div
					class="flex justify-between items-center text-lg font-bold text-neutral-700 dark:text-current"
				>
					<div>Time:</div>
					<div>{{ timer }}</div>
				</div>

				<div class="mt-4">
					<button
						class="font-bold px-3 py-1 w-full border-neutral-800 dark:border-neutral-300 border-2 uppercase hover:bg-neutral-800 hover:text-white dark:hover:text-neutral-900 dark:hover:bg-neutral-300 transition-colors"
						@click="restartRace"
					>
						Restart Race
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
const text = ref()
const cursorPosition = ref(0)
const time = ref(0)
const timerInterval = ref()
const characters = ref([])
const errorCount = ref(0)

text.value = "it"

const accuracy = computed(() => {
	return ((1 - errorCount.value / (cursorPosition.value + 1)) * 100).toFixed(2)
})

const timer = computed(() => {
	let diff
	const milliseconds = time.value % 1000
	diff = (time.value - milliseconds) / 1000
	const seconds = diff % 60
	const minutes = (diff - seconds) / 60
	return (
		minutes.toString().padStart(2, "0") +
		":" +
		seconds.toString().padStart(2, "0") +
		":" +
		(milliseconds / 10).toString().padStart(2, "0")
	)
})

const wpm = computed(() => {
	return Math.ceil((cursorPosition.value / 5 / parseInt(time.value / 100)) * 60)
})

document.onkeydown = function (event) {
	const regex = /[A-Za-z0-9,'. ?!]/
	if (
		!event.ctrlKey &&
		!event.altKey &&
		!event.metaKey &&
		!event.repeat &&
		event.key.length === 1 &&
		event.key.length === 1 &&
		event.key.match(regex) &&
		cursorPosition.value < characters.value.length
	) {
		let character = characters.value.find(
			(char) => char.position === cursorPosition.value
		)
		if (character.letter == event.key) {
			character.status = "success"
			cursorPosition.value++
		} else {
			if (character.status != "error") {
				errorCount.value++
				character.status = "error"
			}
		}

		if (!timerInterval.value) {
			timerInterval.value = setInterval(function () {
				time.value += 10
			}, 10)
		}

		if (cursorPosition.value === characters.value.length) {
			clearInterval(timerInterval.value)
		}
	}
}

const setCharacters = function () {
	characters.value = text.value.split("").map(function (character, index) {
		return {
			letter: character,
			status: "pending",
			position: index,
		}
	})
}

const restartRace = function () {
	cursorPosition.value = 0
	time.value = 0
	errorCount.value = 0
	timerInterval.value = null
	setCharacters()
}

onMounted(() => {
	setCharacters()
})
</script>

<style></style>
