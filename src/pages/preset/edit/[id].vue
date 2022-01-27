<template>
    <n-spin :show="loading">
        <h3>Edit Preset {{ preset.name }}</h3>
        <n-divider />
        <n-row gutter="12">
            <n-col :span="10">
                <div>
                    <h2>Data Preset</h2>
                    <n-form :model="preset" :rules="rules" size="medium" ref="formRef">
                        <n-form-item label="Preset Name" path="name">
                            <n-input v-model:value="preset.name" placeholder="Input Name" />
                        </n-form-item>
                        <n-form-item label="Preset Description" path="description">
                            <n-input
                                v-model:value="preset.description"
                                placeholder="Input Description"
                                type="textarea"
                            />
                        </n-form-item>
                        <n-form-item>
                            <n-button @click="saveData">Save Preset</n-button>
                        </n-form-item>
                    </n-form>
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
import { Preset } from '~/types/preset';
import { useMessage } from 'naive-ui';


const message = useMessage()
const loading = ref(false)
const formRef = ref()
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
        loading.value = false
    })
})

const rules = {
    name: {
        required: true,
        message: 'Please input preset name',
        trigger: 'blur'
    },
    description: {
        required: true,
        message: 'Please input preset description',
        trigger: 'blur'
    }
}

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
    formRef.value.validate((errors: any) => {
        if (!errors) {
            loading.value = true
            let sumOfWeight = preset.value.criteria!.reduce((a, b) => a + b.weight, 0)
            if ((preset.value.criteria!.length < 1) || (sumOfWeight != 100)) {
                message.error("Criteria must have 100 of total weight")
                loading.value = false
            }
            else {
                presetDb.doc(props.id).update(preset.value).then((data) => {
                    loading.value = false
                    message.success("Success Edit preset");
                })
            }
        } else {
            console.log(errors)
            message.error('Invalid')
        }
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