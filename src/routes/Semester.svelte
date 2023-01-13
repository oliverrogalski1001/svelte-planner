<script>
	import { Button, Modal, Select, SelectItem } from 'carbon-components-svelte';
	import { subject, num, numbers } from './stores.js';

	export let semesterNum, classes

	let open = false

	const subjects = Object.keys(classes)
</script>

<div>
	<h2>Semester {semesterNum}</h2>
	<Button on:click={() => open = true}>Add Class</Button>
	<Modal
		bind:open
		modalHeading='Add Class'
		primaryButtonText="Add"
		secondaryButtonText="Cancel"
		on:click:button--primary={() => open = false}
		on:click:button--secondary={() => open = false}
	>
		<div class='flex flex-row justify-around'>
			<div>
				<p>Subject</p>
				<Select bind:selected={$subject}>
					{#each subjects as subject}
						<SelectItem value={subject}/>
					{/each}
				</Select>
			</div>
			<div>
				<p>Number</p>
				<Select bind:selected={$num}>
					{#each $numbers as number}
						<SelectItem value={number}/>
					{/each}
				</Select>
			</div>
		</div>
	</Modal>
</div>