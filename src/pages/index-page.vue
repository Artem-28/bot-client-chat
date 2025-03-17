<template>
  <q-page class="flex flex-center column">
    <span>projectId: {{ projectId }}</span>
    <span>scriptId: {{ scriptId }}</span>
  </q-page>
</template>

<script setup>
import { useParams } from 'src/composable'
import useApi from 'src/api'

defineOptions({
  name: 'IndexPage'
})

const { projectId, scriptId } = useParams()
const api = useApi()

async function connection () {
  const { data } = await api.connection({ projectId }, { scriptId })
  console.log(data)
}
connection()
</script>
