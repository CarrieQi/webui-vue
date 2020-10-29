const LoadingBarMixin = {
  data() {
    return {
      loading: true
    };
  },
  methods: {
    startLoader() {
      this.$root.$emit('loader-start');
      this.loading = true;
    },
    endLoader() {
      this.$root.$emit('loader-end');
      this.loading = false;
    },
    hideLoader() {
<<<<<<< HEAD
      this.$root.$emit('loader::hide');
    }
  }
=======
      this.$root.$emit('loader-hide');
    },
  },
>>>>>>> Resolve custom-event-name-casing lint warnings
};

export default LoadingBarMixin;
