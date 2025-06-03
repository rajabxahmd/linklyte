<template>
	<button
		v-if="showButton"
		label="Show More"
		class="shadow-md rounded p-2 text-gray-700 text-sm hover:bg-gray-200 active:bg-gray-300"
		@click="showMore()"
	>
		Show More
	</button>
</template>
<script setup>
import { useFilesStore } from '@/stores/files'
import { call } from 'frappe-ui'
import { computed, ref } from 'vue'
import rawValues from '@/json_values/doctype_info.json'
import { defineProps } from 'vue'
const emit = defineEmits(['update:fileBlocks', 'update:limit'])
const props = defineProps({
	btnstate: Number,
	docCount: Number,
	limit: Number,
	fileBlocks: Array,
	displayLimit: Number,
})
const filesStore = useFilesStore()
const showButton = computed(() => props.limit < props.docCount)
const values = ref({ ...rawValues })

function debounce(fn, delay) {
	let timeout
	return (...args) => {
		clearTimeout(timeout)
		timeout = setTimeout(() => fn(...args), delay)
	}
}

const showMore = debounce(() => {
	async function fetchFilesB() {
		const responseB = await call('frappe.client.get_list', {
			...values.value,
			limit_page_length: props.btnstate,
			limit_start: props.fileBlocks.length,
		})

		// props.fileBlocks.push(...responseB)
		emit('update:fileBlocks', [...props.fileBlocks, ...responseB])
		emit('update:limit', props.fileBlocks.length + responseB.length)
	}
	fetchFilesB()
}, 500)
</script>
