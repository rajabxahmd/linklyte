<template>
	<Dropdown
		:options="[
			{
				label: 'Edit Title',
				onClick: () => {},
			},
			{
				label: 'Manage Members',
				onClick: () => {},
			},
			{
				label: 'Delete this project',
				onClick: () => {},
			},
		]"
		:button="{
			label: 'Help',
		}"
		placement="left"
	/>
</template>

<script setup>
import { Dropdown } from 'frappe-ui'
</script>
