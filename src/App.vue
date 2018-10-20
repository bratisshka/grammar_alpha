<template>
    <div id="app">
        <heading></heading>
        <div class="container">
            <router-view/>
        </div>
        <footing></footing>
    </div>
</template>
<script>
    import Heading from './components/SiteHeader.vue'
    import Footing from './components/SiteFooter.vue'

    export default {
        components: {
            Heading,
            Footing
        }
    }
</script>
<style>
    html {
        position: relative;
        min-height: 100%;
    }

    body {
        margin-bottom: 60px; /* Margin bottom by footer height */
        font-family: "IBM Plex Sans", sans-serif;
        font-size: 1rem;
    }


</style>
