<template>
	<div>hii</div>
	<div>{{ bulshit.name }}</div>
	<div>{{ bulshit.age }}</div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import values from '@/json_values/test.json'
import { onBeforeMount, ref } from 'vue'
console.log('values', values)

const route = useRoute()
const bulshit = ref({})

console.log(route)
console.log(route.params.id)
const id = route.params.id
console.log('id', id)

bulshit.value = values.find((v) => v.id === parseInt(id))
</script>
