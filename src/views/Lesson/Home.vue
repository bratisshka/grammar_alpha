<template>

    <content-viewer :blocks="lesson_content"></content-viewer>

</template>

<script>
    import ContentViewer from "../../components/ContentViewer";
    import lesson_content from "../../assets/lesson_content"

    export default {
        name: "home",
        components: {
            ContentViewer,
        },
        data() {
            return {
                lesson_content: []
            }
        },
        created() {
            this.lesson_content = lesson_content;
        }
    }
</script>

<style scoped>

</style>