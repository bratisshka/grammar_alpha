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
                        <content-viewer :blocks="main_data"></content-viewer>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>

    import ContentViewer from "../components/ContentViewer";
    import main_data from "../assets/main_content";

    export default {
        name: 'home',
        components: {ContentViewer},
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