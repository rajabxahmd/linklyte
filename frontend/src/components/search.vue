<template>
<div>
  <TextInput type="text" placeholder="Search...">
    <template #prefix>
      <FeatherIcon
        class="w-4"
        name="search"
      />
    </template>
  </TextInput>
</div>


</template>
    
<script setup>
import {TextInput, FeatherIcon} from 'frappe-ui'
</script>