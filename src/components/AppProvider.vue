<template>
  <n-config-provider :theme="theme">
    <n-global-style />
      <n-message-provider>
        <n-dialog-provider>
            <n-loading-bar-provider>
                <slot />
            </n-loading-bar-provider>
        </n-dialog-provider>
      </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { darkTheme, commonLight } from 'naive-ui'
import { isDark } from '~/composable';
const theme = computed(() => (isDark.value ? darkTheme : commonLight))
</script>