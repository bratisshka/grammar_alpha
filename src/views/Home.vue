<template>
    <div>
        <div class="row">
            <div class="col-md-10">
                <h1>Курс "Практическая грамматика английского языка"</h1>
            </div>
            <div class="col-md-2">
                <span class="gray">6 ч. 16 мин.</span>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <main-viewer :blocks="main_data"></main-viewer>
                    </div>
                </div>
            </div>
        </div>
        <router-link :to="{name: 'lessons'}">
            <div class="row mt-2">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                            <div class="text-right">Приступить</div>
                        </div>
                    </div>
                </div>
            </div>

        </router-link>
    </div>


</template>

<script>

    import MainViewer from "../components/MainViewer";
    import main_data from "../assets/main_content";

    export default {
        name: 'home',
        components: {MainViewer},
        data() {
            return {
                main_data: []
            }
        },
        created() {
            this.main_data = main_data;
        }
    }
</script>
<style scoped>
    .gray {
        color: #a5a5a5;
    }
</style>