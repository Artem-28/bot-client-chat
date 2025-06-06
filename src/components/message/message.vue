<template>
  <div :class="rootClasses">
    <div class="message-content">
      <span v-text="message.text" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const isRespondent = computed(() => props.message.author_type === 'respondent');

const rootClasses = computed(() => {
  const classes = ['message'];
  isRespondent.value ? classes.push('message--outgoing') : classes.push('message--incoming');
  return classes;
});
</script>

<style scoped lang="scss">
.message {
  display: flex;
  width: 100%;
  .message-content {
    color: $text-dark;
    padding: 8px;
    border-radius: 4px;
  }
}

.message--outgoing {
  .message-content {
    background-color: $light-primary;
    margin-left: auto;
  }
}

.message--incoming {
  .message-content {
    background-color: #FFFFFF;
    margin-right: auto;
  }
}

</style>
