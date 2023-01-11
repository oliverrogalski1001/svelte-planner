<script>
	import "../app.css"
	import "carbon-components-svelte/css/all.css"
	import Semester from "./Semester.svelte"

	let semesters = Array.from(Array(8).keys()).map(i => i + 1);
</script>

<div class='text-center'>
	<h1 class='p-4'>UIUC Class Planner</h1>
	<div class='flex flex-row'>
		{#each semesters as semester}
			<Semester num={semester} />
		{/each}
	</div>
</div>