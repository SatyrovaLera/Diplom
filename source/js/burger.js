Vue.createApp({
  data() {
    return {};
  },
  methods: {
    burgerMenu() {
      this.$refs.headerBurger.classList.toggle('active');
      this.$refs.headerMenu.classList.toggle('active');
      this.$refs.body.classList.toggle('lock');
    },
  },
}).mount('.header__body');
