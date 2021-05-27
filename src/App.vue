<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    assetTag() {
      return this.$store.getters['global/assetTag'];
    },
  },
  watch: {
    assetTag: function (tag) {
      if (tag) {
        document.title = `${tag} - ${this.$t(this.$route.meta.title)}`;
      }
    },
    $route: function (to) {
      document.title = this.$t(to.meta.title) || 'Page is missing title';
      if (this.assetTag) {
        document.title = `${this.assetTag} - ${this.$t(to.meta.title)}`;
      }
    },
  },
  created() {
    document.title = this.$t(this.$route.meta.title) || 'Page is missing title';
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/_obmc-custom';
</style>
