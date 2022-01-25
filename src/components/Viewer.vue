<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useLoadingBar } from 'naive-ui'
import {useRouter} from 'vue-router'
const router = useRouter()
const loadingBar = useLoadingBar()
router.beforeEach(() => loadingBar.start())
router.afterEach(() => loadingBar.finish())
</script>
