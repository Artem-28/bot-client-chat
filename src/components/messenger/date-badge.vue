<template>
  <q-badge class="date-badge base-text--sm" rounded>
    <span v-text="displayValue" />
  </q-badge>
</template>

<script setup>

import { useI18n } from 'vue-i18n';

const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
});

const i18n = useI18n();

const monthIndex = props.date.getMonth();
const month = i18n.t(`months.genitive.${monthIndex}`);
const displayValue = `${props.date.getDate()} ${month}`;

</script>

<style scoped lang="scss">
.date-badge {
  background-color: $primary;
}

</style>
