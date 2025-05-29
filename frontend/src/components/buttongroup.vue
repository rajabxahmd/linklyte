<template>
	<button
		v-for="(btnLimit, idx) in [20, 100, 2500]"
		:key="btnLimit"
		type="button"
		@click="setLimit(btnLimit)"
		:class="[
			'px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-2 focus:ring-gray-600 focus:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white',
			idx === 0 ? 'rounded-s-lg' : '',
			idx === 2 ? 'rounded-e-lg' : '',
			idx !== 0 && idx !== 2 ? 'border-t border-b' : '',
		]"
	>
		{{ btnLimit }}
	</button>
</template>
<script setup>
import {watch} from 'vue'

const limit = ref(2)

watch(limit, () => {
	fetchFiles()
})

const setLimit = (value) => {
	limit.value = value
	console.log('value of setlimit', value)
}
</script>
