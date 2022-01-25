<script lang="ts" setup>
import { PropType } from 'vue';
import { Preset } from '~/types/preset';
import { Edit, OpenPanelRight } from '@vicons/carbon'
import { useRouter } from 'vue-router';
const props = defineProps({
    preset: Object as PropType<Preset>
})
const router = useRouter()
const editData = () =>{
    router.push(`/preset/edit/${props.preset?.id}`)
}
const usePreset = () =>{
    router.push(`/preset/use/${props.preset?.id}`)
}
</script>
<template>
    <n-card
        :title="props.preset?.name"
        :segmented="{
            content: true,
            footer: 'soft'
        }"
    >
        {{ props.preset?.description }}
        <template #footer>
            <n-space>
                <n-tag v-for="criteria, index in props.preset?.criteria" :key="index">{{ criteria.name }}</n-tag>
            </n-space>
        </template>
        <template #action>
            <n-space>
                <n-button type="primary" @click="usePreset">
                    <template #icon>
                        <n-icon>
                            <open-panel-right />
                        </n-icon>
                    </template>
                    Use This Preset
                </n-button>
                <n-button type="warning" @click="editData">
                    <template #icon>
                        <n-icon>
                            <edit />
                        </n-icon>
                    </template>
                    Edit Preset
                </n-button>
            </n-space>
        </template>
    </n-card>
</template>