<template>
  <div class="messenger-panel">
    <app-button
      icon="attach_file"
      class="messenger-panel__action action-attach" />
    <q-input
      ref="fieldRef"
      :autogrow="autogrow"
      dense
      borderless
      color="primary"
      class="messenger-panel__field"
      v-model.trim="textMessage"
      @keydown.enter="sendMessage"
      @focus="onFocus"
      :placeholder="$t('field.placeholder.message')"
    />
    <app-button
      icon="sentiment_satisfied"
      class="messenger-panel__action"
    />
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';
import { useMessenger } from 'src/composable';
import AppButton from 'components/app/app-button/app-button.vue';

defineOptions({
  name: 'app-footer',
});

const messenger = useMessenger();

const fieldRef = ref(null);
const textMessage = ref('');
const autogrow = ref(false);

function onFocus() {
  autogrow.value = true;
  nextTick(() => {
    fieldRef.value.focus();
  });
}

function clearField() {
  textMessage.value = '';
}

function sendMessage(e) {
  if (e.shiftKey) return;
  e.preventDefault();
  e.stopPropagation();
  if (!textMessage.value) return;
  const message = {
    text: textMessage.value,
  };
  if (!messenger.isConnected.value) {
    messenger.connection();
  }
  messenger.sendMessage(message);
  clearField();
}
</script>

<style scoped lang="scss">
.messenger-panel {
  display: flex;
  align-items: end;
  gap: 4px;
  justify-content: end;
  padding: 8px;
  background-color: white;
  &__field {
    width: 100%;
    background: #F6F6F7;
    padding: 0 8px;
  }
  &__action {
    margin-bottom: 6px;
  }
  .action-attach {
    rotate: 45deg;
  }
}

</style>
