<template>
  <q-layout class="app-layout">
    <app-header/>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import AppHeader from 'components/app/app-header/app-header.vue'
import { incomingCall, useCommand } from 'src/composable'
import { useMessengerState } from 'src/stores'
import { messengerViewMode } from 'stores/messenger-state.store'

defineOptions({
  name: 'MainLayout'
})
const { subscribe } = useCommand()
const { updateState } = useMessengerState()

// Входящие команды из виджета
function commandHandler ({ type, payload }) {
  switch (type) {
    case incomingCall.OPEN_MESSENGER:
      updateState({ open: true })
      break
    case incomingCall.CLOSE_MESSENGER:
      updateState({ mode: messengerViewMode.STANDARD, open: false })
      break
    default:
      break
  }
}
subscribe(commandHandler)
</script>

<style scoped lang="scss">
.app-layout {
  background: #fff;
}
</style>
