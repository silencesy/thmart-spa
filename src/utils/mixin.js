export default {
    mounted() {
        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goBack, false);
        }
    },
    methods: {
        goBack() {
            this.$router.animate = 1;
            console.log(this.$router.animate);
        }
    }
}