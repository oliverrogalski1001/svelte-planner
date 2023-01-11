<script>
	import { Button, Modal, Select, SelectItem } from 'carbon-components-svelte';

	export let num
	let open = false
</script>

<div>
	<h2>Semester {num}</h2>
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
				<Select>
					<SelectItem value="STAT"/>
				</Select>
			</div>
			<div>
				<p>Number</p>
				<Select>
					<SelectItem value="400"/>
				</Select>
			</div>
		</div>
	</Modal>
</div>