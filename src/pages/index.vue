<template>
    <n-space vertical>
        <n-input size="large" placeholder="Cari Preset Saw Rules" :on-change="searchData">
            <template #suffix>
                <n-icon>
                    <search />
                </n-icon>
            </template>
        </n-input>
        <n-divider />
        <n-grid :x-gap="12" :y-gap="8" :cols="3">
            <n-grid-item>
                <n-card
                    title="Create New Preset"
                    style="align-items: center;"
                    @click="createPreset"
                >
                    <n-divider />
                    <n-icon size="100">
                        <add />
                    </n-icon>
                </n-card>
            </n-grid-item>
            <n-grid-item v-if="loading" v-for="index in 6" :key="index">
                <n-card>
                    <template #header>
                        <n-skeleton text width="60%" />
                    </template>
                    <n-skeleton text :repeat="6" />
                </n-card>
            </n-grid-item>
            <n-grid-item v-for="preset, index in presets" :key="index">
                <PresetCard :preset="preset" />
            </n-grid-item>
        </n-grid>
    </n-space>
</template>

<script lang="ts" setup>
import { Search, Add } from '@vicons/carbon'
import { useRouter } from 'vue-router';
import { Preset } from '~/types/preset'
import { presetDb } from '~/composable/preset'
import { onMounted, ref } from 'vue';
const presets = ref<Array<Preset>>([])
const loading = ref(false);
const searchData = (value: string) => {
    presets.value = [];
    loading.value = true;
    presetDb.orderBy('name').startAt(value).endAt(`${value}\uf8ff`).onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
            let presetTemp = doc.data() as Preset
            presetTemp.id = doc.id;
            presets.value.push(presetTemp)
        })
        loading.value = false;
    })
}
onMounted(() => {
    console.log("On Mounted")
    loading.value = true;
    presetDb.onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
            let presetTemp = doc.data() as Preset
            presetTemp.id = doc.id;
            presets.value.push(presetTemp)
        })
        loading.value = false;
    })
})
const router = useRouter()
const createPreset = () => {
    router.push('/preset/create')
}
</script>
<style>
.light-green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.12);
}
.green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.24);
}
</style>