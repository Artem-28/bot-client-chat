import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { outgoingCall, useCommand } from 'src/composable'

export const messengerViewMode = {
  STANDARD: 'standard',
  POPUP: 'popup',
  FULLSCREEN: 'fullscreen'
}

export const useMessengerState = defineStore('messenger-state', () => {
  const { sendCommand } = useCommand()
  const state = ref({
    open: false,
    mode: messengerViewMode.STANDARD
  })

  function updateState (payload) {
    state.value = { ...state.value, ...payload }
    sendCommand(outgoingCall.UPDATE_STATE, { ...state.value })
  }

  return {
    state: computed(() => state),
    updateState
  }
})
