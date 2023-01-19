<script>
	import { Tile, Link, Button } from 'carbon-components-svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';

	export let course, classes, schedule;

	let sub;
	schedule.subscribe((value) => {
		sub = value;
	});

	const removeClass = () => {
		schedule.set(sub.filter((arrCourse) => arrCourse.subject !== course.subject || arrCourse.code !== course.code));
	};
	const courseObj = classes[course.subject][course.code];
</script>

<div class="my-2">
	<Tile>
		<div class="text-left">
			<div class="flex flex-row justify-between items-center">
				<h4>{course.subject} {course.code}</h4>
				<h4>{courseObj.hours}</h4>
			</div>
			<p class="w-3/4 my-2">{courseObj.title}</p>
			<div class="flex flex-row justify-between items-center">
				<Link class="w-24" href={courseObj.explorerURL} target="_blank">Course Explorer Link</Link>
				<Button kind="danger" iconDescription="Remove Course" icon={TrashCan} on:click={() => removeClass()} />
			</div>
		</div>
	</Tile>
</div>

<style>
	:global(.bx--btn--danger) {
		padding: 1px 4px 1px 4px;
		min-height: 24px;
	}

	:global(.bx--link) {
		font-size: 0.75rem;
	}
</style>
