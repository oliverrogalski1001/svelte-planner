<script>
	import "../app.css"
	import "carbon-components-svelte/css/all.css"
	import { queryParam } from 'sveltekit-search-params';
	import { subject, num, numbers } from './stores.js';
	import classes from '../spring2023.json'
	import Semester from "./Semester.svelte"

	let semesters = Array.from(Array(8).keys()).map(i => i + 1);

	let currentSubject
	subject.subscribe(value => {
		currentSubject = value
	})

	let currentNumbers
	numbers.subscribe(value => {
		currentNumbers = value
	})

	let currentNum
	num.subscribe(value => {
		currentNum = value
	})

	const main = queryParam("main", {
		encode: value => value !== "" ? value : btoa(value),
		decode: value => value !== "" ? value : atob(value),
		defaultValue: "hello"
	})

</script>

<div class='text-center'>
	<h1 class='p-4'>UIUC Class Planner</h1>
	<h2 class='p-4'>{$main !== null ? $main : ""}</h2>
	<input bind:value={$main} class='border-2' />
	<div class='flex flex-row'>
		{#each semesters as semester}
			<Semester semesterNum={semester} classes={classes} />
		{/each}
	</div>
</div>