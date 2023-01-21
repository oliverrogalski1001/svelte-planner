<script>
	import '../app.css';
	import 'carbon-components-svelte/css/all.css';
	import Semester from './Semester.svelte';
	import classes from '../newSpring2023';
	import { Button } from 'carbon-components-svelte';
	import { queryParam } from 'sveltekit-search-params';

	let semesters = Array.from(Array(8).keys()).map((i) => i + 1);

	const schedule = queryParam('schedule', {
		encode: (value) => value.reduce((string, c) => (string += c.semID + c.subject + '~' + c.code + '-'), ''),
		decode: (value) => {
			if (value === null) {
				return [];
			}
			value = value.split('-');
			value.pop();
			value = value.map((code) => {
				const tempSub = code.slice(1, code.indexOf('~'));
				const tempCode = code.slice(code.indexOf('~') + 1);
				const tempSemID = parseInt(code.slice(0, 1));
				return {
					semID: tempSemID,
					subject: tempSub,
					code: tempCode,
					id: tempSemID + tempSub + tempCode
				};
			});
			console.log(value);
			return value;
		},
		defaultValue: [
			{
				semID: 1,
				subject: 'STAT',
				code: '400',
				id: '1STAT400'
			}
		]
	});

	let sub;
	schedule.subscribe((value) => {
		sub = value;
	});
</script>

<div class="text-center">
	<h1 class="p-4">UIUC Class Planner</h1>
	<Button on:click={() => console.log($schedule)}>check</Button>
	<div class="flex flex-row overflow-x-scroll">
		{#each semesters as semester}
			<Semester semesterNum={semester} {classes} {schedule} />
		{/each}
	</div>
</div>
