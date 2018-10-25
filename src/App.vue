<template>
    <div id="app">
        <heading></heading>
        <div class="container main-container">
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
        min-height: 100vh;
    }

    body {
        font-family: "Roboto", sans-serif;
        font-size: 1rem;
        color: #0D2D44;
        height: 100vh;
    }

    .main-container {
        min-height: 100vh;
    }

    .red {
        color: #D10000;
    }

    .bg-red {
        color: white;
        background-color: #D10000;
    }

    .black {
        color: #0D2D44;
    }

    .bg-black {
        color: white;
        background-color: #0D2D44;;
    }

    .lesson-header {
        text-transform: uppercase;
        padding: 15px
    }
    /*Ебаный костыль для библиотеки прогресса*/
    .circle-percent-text-body {
        top: 0 !important;
    }
</style>
