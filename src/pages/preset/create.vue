<template>
<n-spin :show="loading">
    <h3>Create Preset</h3>
    <n-divider />
    <n-row gutter="12">
        <n-col :span="10">
            <div>
                <h2>Data Preset</h2>
                <n-form
                    :model="presetRef"
                    :rules="rules"
                    size="medium"
                    ref="formRef"
                >
                    <n-form-item label="Preset Name" path="name">
                        <n-input v-model:value="presetRef.name" placeholder="Input Name" />
                    </n-form-item>
                    <n-form-item label="Preset Description" path="description">
                        <n-input v-model:value="presetRef.description" placeholder="Input Description" type="textarea"/>
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
                <n-dynamic-input v-model:value="presetRef.criteria" :on-create="onCreate" #="{ value }">
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

                        <n-input-number placeholder="Weight" v-model:value="value.weight" />
                    </div>
                </n-dynamic-input>
            </div>
        </n-col>
    </n-row>
    </n-spin>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Type } from '~/types/criteria';
import { Preset } from '~/types/preset';
import { useMessage } from 'naive-ui'
import { presetDb } from '~/composable/preset';
const message = useMessage()
const formRef = ref()
const loading = ref(false)
const presetRef = ref<Preset>({
    id: '',
    criteria: [],
    description: '',
    name: ''
})
const rules = {
    name: {
        required: true,
        message: 'Please input preset name',
        trigger: 'blur'
    },
    description:{
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

const saveData = (e: any) => {
    e.preventDefault()
    formRef.value.validate((errors: any) => {
        if (!errors) {
            loading.value = true
            let sumOfWeight = presetRef.value.criteria!.reduce((a, b) => a + b.weight, 0)
            if ((presetRef.value.criteria!.length < 1) || (sumOfWeight != 100)) {
                message.error("Criteria must have 100 of total weight")
                loading.value = false
            }
            else {
                presetDb.add(presetRef.value).then(() => {
                    message.success("Success add a preset")
                    loading.value = false
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