<template>
  <q-header class="app-header">
    <q-btn
      v-if="canResetMode"
      icon="minimize"
      color="primary"
      flat
      padding="0"
      no-caps
      class="app-header__action"
      @click="resetMode"
    />
    <q-btn
      :icon="nextViewMode.icon"
      color="primary"
      flat
      padding="0"
      no-caps
      class="app-header__action"
      @click="nextMode"
    />
    <q-btn
      icon="close"
      color="primary"
      flat
      padding="0"
      no-caps
      class="app-header__action"
      @click="closeHandler"
    />
  </q-header>
</template>

<script setup>
import { computed } from 'vue'
import { useMessengerState } from 'src/stores'
import { messengerViewMode } from 'stores/messenger-state.store'

defineOptions({
  name: 'app-header'
})

const { state, updateState } = useMessengerState()

const nextViewMode = computed(() => {
  switch (state.value.mode) {
    case messengerViewMode.STANDARD:
    case messengerViewMode.FULLSCREEN:
      return { icon: 'aspect_ratio', mode: messengerViewMode.POPUP }
    case messengerViewMode.POPUP:
      return { icon: 'web_asset', mode: messengerViewMode.FULLSCREEN }
    default:
      return { icon: 'aspect_ratio', mode: messengerViewMode.STANDARD }
  }
})

const canResetMode = computed(() => state.value.mode !== messengerViewMode.STANDARD)

function closeHandler () {
  updateState({ mode: messengerViewMode.STANDARD, open: false })
}

function nextMode () {
  updateState({ mode: nextViewMode.value.mode })
}
function resetMode () {
  updateState({ mode: messengerViewMode.STANDARD })
}
</script>

<style scoped lang="scss">
.app-header {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 4px;
  justify-content: end;
  background: transparent;
}

</style>
