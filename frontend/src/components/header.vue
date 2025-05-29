<template>
	<header
		class="flex items-center justify-between border-b border-gray-100 shadow-lg py-3 px-5 sm:px-15 bg-white max-h-[4rem] tracking-wide z-50 fixed top-0 w-full"
	>
		<section class="min-w-8 mr-4 flex items-center gap-4">
			<img
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzUqmONq4LbR6wVgKgFg2zIhY4EgRpBd1iaw&s"
				alt="Frappe logo"
				class="h-7 cursor-pointer"
			/>
			<span
				class="hidden sm:flex font-bold text-gray-700 text-base tracking-widest uppercase bg-gray-50 px-3 py-1 rounded"
				>{{ rawValues.doctype }}</span
			>
		</section>
		<section class="flex gap-5 sm:gap-15 items-center">
			<Search />
			<div class="flex items-center gap-1 sm:gap-6 sm:w-[9.5rem]">
				<div class="hidden sm:flex">
					<img src="@/assets/Inter/bell-16.svg" alt="" class="cursor-pointer" />
				</div>
				<div class="hidden sm:flex">
					<Help />
				</div>
				<div>
					<Avatar />
				</div>
			</div>
		</section>
	</header>
</template>
<script setup>
import Help from './help.vue'
import Search from './search.vue'
import Avatar from './avatar.vue'
import rawValues from '@/json_values/doctype_info.json'
</script>
