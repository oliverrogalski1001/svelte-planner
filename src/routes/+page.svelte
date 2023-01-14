<script>
	import "../app.css"
	import "carbon-components-svelte/css/all.css"
	import { queryParam } from 'sveltekit-search-params';
	import { subject, num, numbers } from './stores.js';
	import classes from '../spring2023.json'
	import Semester from "./Semester.svelte"
	import { Button } from 'carbon-components-svelte';

	let semesters = Array.from(Array(8).keys()).map(i => i + 1);

	const schedule = queryParam("schedule", {
		encode: value => JSON.stringify(value),
		decode: value => JSON.parse(value),
		defaultValue: [{
			semID: 1,
			subject: "STAT",
			code: "400"
		}]
	})

</script>

<div class='text-center'>
	<h1 class='p-4'>UIUC Class Planner</h1>
	<Button on:click={() => console.log($schedule)}>check</Button>
	<h2>{$subject}</h2>
	<h2>{$numbers}</h2>
	<h2>{$num}</h2>
	<div class='flex flex-row overflow-x-scroll'>
		{#each semesters as semester}
			<Semester semesterNum={semester} classes={classes} />
		{/each}
	</div>
</div>