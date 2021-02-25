<template>
  <div>
    <div v-if="nav_data.length">
      {
      <div v-for="(item, index) in nav_data" :key="index" class="tab">
        <div
          v-if="
            !!items[item] &&
            !Array.isArray(items[item]) &&
            typeof items[item] == 'object'
          "
        >
          {{ item }} :
          <reddfishItem
            :item-data="items[item]"
            v-on="$listeners"
          ></reddfishItem>
        </div>
        <div v-else>
          {{ item }} : "
          <template v-if="item === '@odata.id'">
            <span class="link" @click="changeUrl(items[item])">{{
              items[item]
            }}</span>
          </template>
          <template v-else>
            {{ items[item] }}
          </template>
          ",
        </div>
      </div>
      },
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReddfishItem',
  props: {
    itemData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    items: function () {
      return this.itemData;
    },
    nav_data: function () {
      return Object.keys(this.items);
    },
  },
  methods: {
    changeUrl: function (url) {
      this.$emit('changeData', url);
    },
  },
};
</script>
<style type="text/css">
.tab {
  margin-left: 2em;
}
.link {
  color: #1640b0;
}
.link:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
