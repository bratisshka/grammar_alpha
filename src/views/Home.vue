<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <h1>Практическая грамматика английского языка</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <main-viewer :blocks="main_data"></main-viewer>
                        <router-link :to="{name: 'lessons'}">
                            <div class="text-right">
                                <div class="btn btn-success">
                                    Перейти к урокам
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>

            </div>
        </div>
        <!--<router-link :to="{name: 'lessons'}">-->
        <!--<div class="row mt-2">-->
        <!--<div class="col-md-12">-->
        <!--<div class="card">-->
        <!--<div class="card-body">-->

        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->

        <!--</router-link>-->
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