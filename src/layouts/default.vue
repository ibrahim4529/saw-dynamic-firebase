<template>
    <n-layout position="absolute">
        <n-layout-header bordered>
            <div class="logo">
                SAW DYNAMIC CRITERIA
            </div>
            <!-- <n-space justify="end"> -->
            <n-menu :options="menuOptions" mode="horizontal" />
            <!-- </n-space> -->
            <n-space style="line-height: 1; margin-left: auto;">
                <n-button circle @click="toggleDark">
                    <template #icon>
                        <n-icon>
                            <moon v-if="isDark" />
                            <sun v-else />
                        </n-icon>
                    </template>
                </n-button>
            </n-space>
        </n-layout-header>
        <n-layout-content style="padding: 16px; min-height: 100vh;">
            <router-view />
        </n-layout-content>
        <n-layout-footer
            bordered
            style="height: 64px; padding: 24px;"
        >Created By Ibrahim Hanif</n-layout-footer>
    </n-layout>
</template>

<script lang="ts" setup>
import { NIcon } from 'naive-ui'
import { isDark, toggleDark } from '~/composable';
import { Sun, Moon } from '@vicons/carbon'
import { h } from 'vue';
import { RouterLink } from 'vue-router';
const renderLink = (link: string, label: string) =>{
    return h(
        RouterLink,
        {
            to: link.toLowerCase()
        },
        {
            default:() => label
        }
    )
}
const menuOptions = [
    {
        label: () => renderLink('/','Home'),
        key: 'home',
    },
    {
        label: () => renderLink('/about','About'),
        key: 'about',
    },
     {
        label: () => renderLink('/help','Help'),
        key: 'help',
    },
]
</script>

<style scoped>
.n-layout-header {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    padding: 9px 18px;
}
.logo{
    margin-right: 16px;
    font-size: 16px;
    font-weight: bold;
}
</style>