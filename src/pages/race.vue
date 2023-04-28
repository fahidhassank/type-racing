<template>
	<div class="flex flex-col h-screen select-none">
		<div class="p-4 font-mono flex">
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
					class="transition-all px-0.5 font-mono"
					:class="{
						'text-neutral-500': character.status === 'success',
						'bg-blue-500 text-white':
							character.position === cursorPosition &&
							character.status != 'error',
						'bg-red-600': character.status == 'error',
					}"
					:key="character.position"
					>{{ character.letter }}</span
				>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue"
const text = ref()
const cursorPosition = ref(0)
const time = ref(0)
const timerInterval = ref()
const characters = ref([])
const errorCount = ref(0)

text.value =
	"It's much more difficult to play tennis with a bowling ball than it is to bowl with a tennis ball."

characters.value = text.value.split("").map(function (character, index) {
	return {
		letter: character,
		status: "pending",
		position: index,
	}
})

const accuracy = computed(() => {
	return ((1 - errorCount.value / (cursorPosition.value + 1)) * 100).toFixed(2)
})

const timer = computed(() => {
	let diff
	const milliseconds = time.value % 100
	diff = (time.value - milliseconds) / 100
	const seconds = diff % 60
	const minutes = (diff - seconds) / 60
	return (
		minutes.toString().padStart(2, "0") +
		":" +
		seconds.toString().padStart(2, "0") +
		":" +
		milliseconds.toString().padStart(2, "0")
	)
})

const wpm = computed(() => {
	return Math.ceil((cursorPosition.value / 5 / parseInt((time.value / 100))) * 60)
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
				time.value += 1
			}, 10)
		}

		if (cursorPosition.value === characters.value.length) {
			alert("Finished")
			clearInterval(timerInterval.value)
		}
	} else if (event.key === "Backspace" && cursorPosition.value > 0) {
		/* cursorPosition.value--
		let character = characters.value.find(
			(char) => char.position === cursorPosition.value
		)
		character.status = "pending" */
	}
}
</script>

<style></style>
