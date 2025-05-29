import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { call } from 'frappe-ui'
import rawValues from '@/json_values/doctype_info.json'

export const useFilesStore = defineStore('files', () => {
	const fileBlocks = ref([])
	const limit = ref(2)
	const isLoading = ref(false)
	const values = ref({ ...rawValues })
	const docCount = ref(0)

	async function fetchFiles() {
		isLoading.value = true
		try {
			const totalCount = await call('frappe.client.get_count', {
				doctype: values.value.doctype,
			})
			console.log('values', values)
			docCount.value = totalCount
			if (limit.value > docCount.value) {
				limit.value = docCount.value
			} 

			const response = await call('frappe.client.get_list', {
				...values.value,
				limit_page_length: limit.value,
			})
			fileBlocks.value = response
		} finally {
			isLoading.value = false
		}
	}

	return { fileBlocks, limit, isLoading, fetchFiles, values, docCount }
})
