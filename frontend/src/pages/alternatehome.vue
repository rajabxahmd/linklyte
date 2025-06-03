<template>
	<div class="max-h-screen">
		<Header class="fixed"/>
		<div class="mt-[4.5rem] px-4 sm:px-12 mx-auto">
			<section class="flex justify-end items-center mb-5">
				<Tooltip :text="sortBtnTooltip" :placement="'top'">
					<button
						@click="
							setOrderBy(
								selectedDoctype.order_by === 'creation asc'
									? 'creation desc'
									: 'creation asc',
							)
						"
						class="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 px-3 py-1 rounded text-base text-gray-700"
					>
						<img :src="sortBtnSrc" alt="Sort Order Icon" class="w-4 h-4 inline" />
						<span>sort</span>
					</button>
				</Tooltip>
			</section>
			<div class="flex-col justify-between">
				<section
					v-if="!fileBlocks.length || isLoadingFiles === true"
					class="flex justify-center items-center"
				>
					<div
						class="animate-spin rounded-full h-6 w-6 border-4 border-gray-200 border-t-gray-500"
					></div>
				</section>

				<section v-else>
					<ListView
						class="overflow-auto"
						:columns="columns"
						:rows="fileBlocks"
						:options="{
							// getRowRoute: (row) => ({ name: `User`, params: { userId: row.id } }),
							selectable: true,
							showTooltip: true,
							resizeColumn: true,
						}"
						row-key="file_name"
					/>
				</section>

				<section
					id="fixed-bottom"
					class="flex justify-between px-4 sm:px-12 py-3 sm:py-4 z-1 items-center shadow-xs"
				>
					<div>
						<button
							v-for="(btnLimit, idx) in [2, 4, 8]"
							:key="btnLimit"
							type="button"
							@click="setLimit(btnLimit)"
							:class="[
								`px-4 py-2 text-sm font-medium text-gray-900 
            border border-gray-300 hover:bg-gray-200  bg-gray-100
            `,
								idx === 0 ? 'rounded-s-lg' : '',
								idx === 2 ? 'rounded-e-lg' : '',
								idx !== 0 && idx !== 2 ? 'border-t border-b' : '',
								btnstate === btnLimit ? 'shadow-md' : 'shadow-none',
							]"
						>
							{{ btnLimit }}
						</button>
					</div>
					<div class="flex items-center gap-4">
						<Showmore
						 :fileBlocks="fileBlocks"
						 :limit="limit"
						 :docCount="docCount"
						 :btnstate="btnstate"
						 :displayLimit="displayLimit" 
						 @update:fileBlocks="fileBlocks = $event"
						 @update:limit="limit = $event"
						 />
						<span class="text-gray-700">{{ displayLimit }} of {{ docCount }}</span>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, watch, computed, reactive } from 'vue'
import { call, ListView, Tooltip } from 'frappe-ui'
import { useRoute } from 'vue-router'
import rawValues from '@/json_values/test.json'
import Header from '../components/header.vue'
import ascc from '@/assets/Inter/sort-asc-16.svg'
import desc from '@/assets/Inter/sort-desc-16.svg'
import Showmore from '../components/showmore.vue'

const fileBlocks = ref([])
const limit = ref(2)
const isLoadingFiles = ref(false)
const docCount = ref(0)
const btnstate = ref(2)

const route = useRoute()
const selectedDoctype = reactive(
  rawValues.find(obj => obj.doctype.toLowerCase() === route.params.doctype)
)

const fetchFiles = async () => {
	isLoadingFiles.value = true
	try {
		const totalCount = await call('frappe.client.get_count', {
				doctype: selectedDoctype.doctype
			})
		docCount.value = totalCount

		const response = await call('frappe.client.get_list', {
			...selectedDoctype,
			limit_page_length: limit.value,
		})
		fileBlocks.value = response
	} finally {
		isLoadingFiles.value = false
	}
}

const displayLimit = computed(() => {
  return Math.min(limit.value, docCount.value)
})

const columns = computed(() =>
	selectedDoctype.columns.map((c) => ({
		key: c.field,
		label: c.label,
		width: '12rem',
	})),
)

onMounted(() => {
	fetchFiles()
})

const setLimit = (value) => {
	limit.value = value
	btnstate.value = value
	fetchFiles()
}
const setOrderBy = (orderby) => {
	selectedDoctype.order_by = orderby
	fetchFiles()
	console.log("orderby",selectedDoctype.order_by)
}

const sortBtnSrc = computed(() => (selectedDoctype.order_by === 'creation asc' ? ascc : desc))
console.log("sortbtn ", sortBtnSrc.value)
const sortBtnTooltip = computed(() =>
	selectedDoctype.order_by === 'creation asc' ? 'sort in descending' : 'sort in ascending',
)
</script>

<style scoped>
#fixed-bottom {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background: rgba(255, 255, 255, 0.76);
	color: white;
	text-align: center;
}
</style>
