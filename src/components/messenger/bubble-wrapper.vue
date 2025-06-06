<template>
  <div class="bubble-wrapper" >
    <div :class="rootClasses" :style="styles.root">
      <div class="bubble-header base-text--medium base-text--sm">
        <span :style="styles.author" v-text="authorName" />
      </div>
      <div class="bubble-message">
        <span v-text="message.text" />
        <div :style="styles.time" class="bubble-time base-text--xs">
          <span class="bubble-time__inner" v-text="time" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { MESSENGER_TEMPLATE_KEY } from 'src/utils';
import moment from 'moment';

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const { theme } = inject(MESSENGER_TEMPLATE_KEY, {});

const incoming = props.message.author_type !== 'respondent';
const authorName = getAuthorName();

const styles = theme.messageStyle(props.message.author_type);
const time = moment(props.message.created_at).format('HH:mm');

const rootClasses = computed(() => {
  const classes = ['bubble-content base-text--md'];
  classes.push(incoming ? 'bubble-incoming' : 'bubble-outgoing');
  return classes;
});

function getAuthorName() {
  switch (props.message.author_type) {
    case 'respondent':
      return 'Вы';
    case 'operator':
      return props.message.operator.name;
    case 'system':
      return 'Бот';
  }
}
</script>

<style scoped lang="scss">
.bubble-wrapper {
  display: flex;
  width: 100%;
}

.bubble-content {
  padding: 6px;
  border-radius: 12px;
  word-break: break-word;
  white-space: pre-wrap;
  max-width: 260px;
}

.bubble-incoming {
  margin-right: auto;
}

.bubble-outgoing {
  margin-left: auto;
}

.bubble-time {
  position: relative;
  float: right;
  direction: ltr;
  vertical-align: middle;
  line-height: 1;
  height: 22px;
  width: 48px;
  &__inner {
    bottom: 0;
    right: 0;
    position: absolute;
  }
}

</style>
