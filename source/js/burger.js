Vue.createApp({
  data() {
    return {
      about: 'about',
      forecast: 'forecast',
      favorites: 'favorites',
      ru: 'RU',
      en: 'EN',
    };
  },
  methods: {
    burgerMenu() {
      this.$refs.headerBurger.classList.toggle('active');
      this.$refs.headerMenu.classList.toggle('active');
      this.$refs.body.classList.toggle('lock');
    },
    languageRu() {
      this.about = 'о сайте';
      this.forecast = 'прогноз';
      this.favorites = 'избранное';
    },
    languageEn() {
      this.about = 'about';
      this.forecast = 'forecast';
      this.favorites = 'favorites';
    },
  },
}).mount('.header__body');
