<script>
	import { Button, Modal, ComboBox } from 'carbon-components-svelte';
	import { subject, num, numbers } from './stores.js';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import Course from './Course.svelte';

	export let semesterNum, classes, schedule;
	let sub;
	schedule.subscribe((value) => {
		sub = value;
	});

	// filter function for typing into the combobox in modal
	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	let open = false;
	// disable number combobox if subject isn't chosen
	$: disabled = $subject === undefined;

	// change current number when the subject changes
	$: num.set($numbers[0]);

	// create list of courses that are in this semester
	let semCourses = [];
	$: if (sub !== null) {
		semCourses = sub.filter((course) => course.semID === semesterNum);
	}

	// display selected class in modal
	let classObj;
	$: if ($subject !== undefined && $num !== undefined) {
		classObj = classes[$subject][$num];
	} else {
		classObj = undefined;
	}

	// Add class in modal
	const addClass = () => {
		if (warn || $subject === undefined) {
			return;
		}
		open = false;
		let newClass = {
			semID: semesterNum,
			subject: $subject,
			code: $num,
			id: semesterNum + $subject + $num
		};
		schedule.update((n) => [...n, newClass]);
	};

	// warning if courses already exists in users schedule
	let warn = false;
	$: if (sub !== null) {
		warn = sub.filter((course) => $subject === course.subject && $num === course.code).length > 0;
	}

	// list of all subjects
	const subjects = Object.keys(classes);

	// drag and drop animation constant
	const flipDurationMs = 150;

	// change courses in current semester when course is being dragged
	function handleDndConsider(e) {
		semCourses = e.detail.items;
	}

	// called when course is dropped after being dragged
	function handleDndFinalize(e) {
		// if course was picked up but not dropped into any zone return nothing
		if (e.detail.info.trigger === 'droppedOutsideOfAny') {
			semCourses = e.detail.items;
			return;
		}

		// if the function was called from the zone that the course was dropped into
		if (e.detail.info.trigger === 'droppedIntoZone') {
			// filter out courses in dropped semester and one that was dropped
			let newSchedule = sub.filter((course) => course.semID !== semesterNum && course.id !== e.detail.info.id);

			// create new schedule array with semester items in correct order
			newSchedule = [...newSchedule, ...e.detail.items];

			// change dropped course semester id to dropped semester
			newSchedule = newSchedule.map((course) => {
				if (course.id === e.detail.info.id) {
					course.semID = semesterNum;
					course.id = semesterNum + course.subject + course.code;
				}
				return course;
			});

			schedule.set(newSchedule);
		}
	}
</script>

<div class="p-4 w-64 flex-shrink-0">
	<h2>Semester {semesterNum}</h2>
	<section
		use:dndzone={{ items: semCourses, flipDurationMs }}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
		class="min-h-10"
	>
		{#each semCourses as course (course.id)}
			<div animate:flip={{ duration: flipDurationMs }}>
				<Course {course} {classes} {schedule} />
			</div>
		{/each}
	</section>
	<div class="mt-2">
		<Button on:click={() => (open = true)} icon={Add}>Add Class</Button>
	</div>
	<Modal
		bind:open
		modalHeading="Add Class"
		primaryButtonText="Add"
		secondaryButtonText="Cancel"
		on:click:button--primary={() => addClass()}
		on:click:button--secondary={() => (open = false)}
	>
		<div class="flex flex-col align-middle">
			<div class="flex flex-row justify-around">
				<div>
					<ComboBox
						titleText="Subject"
						placeholder="Select Subject"
						items={subjects.map((sub) => ({ id: sub, text: sub }))}
						bind:selectedId={$subject}
						on:clear={() => num.set('')}
						{shouldFilterItem}
					/>
				</div>
				<div>
					<ComboBox
						titleText="Number"
						items={$numbers.map((n) => ({ id: n, text: n }))}
						bind:selectedId={$num}
						{disabled}
						{warn}
						warnText="This course already exists in your plan."
					/>
				</div>
			</div>
			{#if classObj !== undefined}
				<div class="mt-4">
					<h4>{$subject} {$num}: {classObj.title}</h4>
					<p class="my-1">{classObj.description}</p>
					<h4>Credit Hours: {classObj.hours}</h4>
				</div>
			{/if}
		</div>
	</Modal>
</div>

<style>
	:global(.bx--modal-content) {
		overflow: visible;
	}

	:global(.bx--modal-content p) {
		padding-right: 0;
	}

	:global(.bx--modal-header) {
		padding-right: 0;
	}

	:global(.bx--modal.is-visible .bx--modal-container) {
		overflow: visible;
		padding-right: 0;
	}
</style>
