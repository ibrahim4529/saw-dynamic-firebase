<template>
    <n-spin :show="loading">
        <n-page-header :subtitle="presetRef?.name">
            <n-grid :cols="5">
                <n-gi v-for="criteria, index in presetRef?.criteria" :key="index">
                    <n-statistic :label="criteria.name" :value="criteria.weight" />
                </n-gi>
            </n-grid>
            <template #title>
                <a>Preset</a>
            </template>
            <template #footer>{{ presetRef?.description }}</template>
            <template #extra>
                <n-space>
                    <n-button type="primary" @click="showModal = true">Add New Alternative</n-button>
                    <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog">
                        <template #header>
                            <div>Add Alternative</div>
                        </template>
                        <n-divider />
                        <n-space vertical>
                            <n-input
                                type="text"
                                v-model:value="alternative.name"
                                placeholder="Alternative Name"
                                size="medium"
                            />
                            <n-input-number
                                v-for="criteria, index in presetRef.criteria"
                                :key="index"
                                v-model:value="alternative.values[index]"
                                :placeholder="criteria.name"
                            />
                        </n-space>
                        <template #action>
                            <n-space>
                                <n-button
                                    type="warning"
                                    size="medium"
                                    @click="onNegativeClick"
                                >Cancel</n-button>
                                <n-button
                                    type="primary"
                                    size="medium"
                                    @click="onPositiveClick"
                                >Save Alternative</n-button>
                            </n-space>
                        </template>
                    </n-modal>
                    <n-button type="info" @click="processSaw" :loading="sawState.isProcess">Process</n-button>
                </n-space>
            </template>
        </n-page-header>
        <n-divider />
        <n-data-table :columns="columns" :data="alternatives" />
        <n-divider />
        <n-data-table
            v-if="sawState.ranks.length > 0"
            :columns="column_rank"
            :data="sawState.ranks"
        />
    </n-spin>
</template>
<script setup lang="ts">
import { onMounted, ref, h } from 'vue';
import { presetDb } from '~/composable/preset';
import { Preset } from '~/types';
import { Alternative } from '~/types/alternative';
import { NTag } from 'naive-ui';
import { calculateSaw } from '~/composable/saw';
import { sawStore } from '~/stores/sawstore';
const loading = ref(false)
const showModal = ref(false)
const sawState = sawStore.getState()
const presetRef = ref<Preset>({
    name: '',
    description: '',
    criteria: [],
    id: ''
})
const props = defineProps({
    id: String
})
onMounted(() => {
    loading.value = true
    sawStore.reset()
    presetDb.doc(props.id).get().then((doc) => {
        console.log(doc.data())
        presetRef.value = doc.data() as Preset
        loading.value = false
    })
})
const onPositiveClick = () => {
    alternatives.value.push(alternative.value);
    alternative.value = {
        name: '',
        values: []
    }
    showModal.value = false;
    sawStore.reset();
}

const processSaw = () => {
    calculateSaw(alternatives.value, presetRef.value)
}
const onNegativeClick = () => {

}
const columns = [
    {
        title: 'Alternative Name',
        key: 'name'
    },
    {
        title: 'Values',
        key: 'values',
        render(row: any) {
            const values = row.values.map((val: number) => {
                return h(
                    NTag,
                    {
                        style: {
                            marginRight: '6px'
                        },
                        type: 'info'
                    },
                    {
                        default: () => val
                    }
                )
            })
            return values
        }
    },
]
const column_rank = [
    {
        title: 'Alternative Name',
        key: 'alternative.name'
    },
    {
        title: 'Values',
        key: 'alternative.values',
        render(row: any) {
            const values = row.alternative.values.map((val: number) => {
                return h(
                    NTag,
                    {
                        style: {
                            marginRight: '6px'
                        },
                        type: 'info'
                    },
                    {
                        default: () => val
                    }
                )
            })
            return values
        }
    },
    {
        title: 'Result Calculation',
        key: 'result',
    },
]
const alternative = ref<Alternative>({
    name: '',
    values: []
})
const alternatives = ref<Array<Alternative>>([])
</script>
