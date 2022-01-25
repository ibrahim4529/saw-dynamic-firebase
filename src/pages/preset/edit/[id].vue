<template>
    <n-spin :show="loading">
        <h3>Edit Preset {{ preset.name }}</h3>
        <n-divider />
        <n-row gutter="12">
            <n-col :span="10">
                <div>
                    <h2>Data Preset</h2>
                    <n-space vertical>
                        <n-input placeholder="Preset Name" type="text" v-model:value="preset.name" />
                        <n-input
                            v-model:value="preset.description"
                            type="textarea"
                            placeholder="Description preset: eg: Preset for comparing phone by spec"
                        />
                        <n-button type="primary" size="medium" @click="saveData">Save Preset</n-button>
                    </n-space>
                </div>
            </n-col>
            <n-col :span="14">
                <div>
                    <h2>Criteria</h2>
                    <n-dynamic-input
                        v-model:value="preset.criteria"
                        :on-create="onCreate"
                        #="{ value }"
                    >
                        <div style="display: flex; width: 100%;">
                            <n-select
                                placeholder="Type Criteria"
                                v-model:value="value.type"
                                :options="options"
                                style="width: 40%;"
                            />
                            <n-input
                                placeholder="Criteria Name"
                                v-model:value="value.name"
                                type="text"
                                style="margin-left: 16px; margin-right: 16px; width: 40%;"
                            />

                            <n-input-number placeholder="Bobot" v-model:value="value.weight" />
                        </div>
                    </n-dynamic-input>
                </div>
            </n-col>
        </n-row>
    </n-spin>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Type } from '~/types/criteria';
import { presetDb } from '~/composable/preset';
const message = useMessage()
const loading = ref(false)
import { Preset } from '~/types/preset';
import { useMessage } from 'naive-ui';
const props = defineProps<{ id: string }>()
const preset = ref<Preset>({
    name: '',
    description: '',
    criteria: [],
    id: ''
})
onMounted(() => {
    loading.value = true;
    const presetDoc = presetDb.doc(props.id)
    presetDoc.get().then((doc) => {
        preset.value = doc.data() as Preset
        loading.value= false
    })
})
const options = [
    {
        label: "BENEFIT",
        value: Type.BENEFIT
    },
    {
        label: "COST",
        value: Type.COST
    }
]

const saveData = () => {
    presetDb.doc(props.id).update(preset.value).then((data) => {
        message.success("Success Edit preset");
    })
}

const onCreate = () => {
    return {
        name: '',
        type: null,
        weight: null,
    }
}
</script>