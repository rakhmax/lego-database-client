<template>
  <v-badge
    class="mx-auto"
    color="success"
    overlap
    :style="{ width: '100%' }"
    :value="item.sealed || 0"
  >
    <v-card
      outlined
      :ripple="false"
      :to="{
        name: itemType === 'Set' ? 'Set' : 'Minifigure',
        params: item
      }"
    >
      <v-img
        contain
        height="200px"
        :lazy-src="item.thumbnail"
        light
        :src="item.image"
        :style="{ background: '#fff' }"
        width="auto"
      ></v-img>
      <v-card-title
        class="d-block"
        :style="{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }"
        :title="item.name"
        v-html="item.name"
      ></v-card-title>
      <v-card-subtitle>
        {{ formatSetId(item.itemId) }} | {{ categoryName(item.categoryId) }}
      </v-card-subtitle>
      <v-card-actions>
        <v-card-subtitle class="pa-2">
          {{ $t('qty') }}: {{ item.qty }}
        </v-card-subtitle>
        <v-spacer></v-spacer>
        <actions
          :item="item"
          :item-type="itemType"
        ></actions>
      </v-card-actions>
    </v-card>
  </v-badge>
</template>

<script>
import Actions from '@/components/Actions.vue';

export default {
  name: 'CardItem',

  components: {
    Actions,
  },

  props: {
    item: Object,
    itemType: String,
  },
};
</script>
