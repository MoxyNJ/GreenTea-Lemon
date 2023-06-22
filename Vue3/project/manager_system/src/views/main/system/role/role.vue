<template>
  <div class="role">
    <page-search :search-config="searchConfig" />
  </div>
</template>

<script setup lang="ts" name="role">
import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/role.config'
</script>

<style scoped></style>
