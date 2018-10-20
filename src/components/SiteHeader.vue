<template>
    <nav class="navbar navbar-expand-md navbar-light bg-light mb-2">
        <router-link to="/">
            <a class="navbar-brand" href="#">Grammar English</a>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav center mr-auto">
                <li class="nav-item">
                    <router-link to="/lessons"><span class="nav-link">Уроки</span></router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/grammar-tren"><span class="nav-link">Плеер-тренажер</span></router-link>
                </li>
            </ul>
            <form class="form-inline mt-2 mt-md-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                <button class="btn btn-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "SiteHeader"
    }
</script>

<style scoped>
</style>