<template>
    <div id="article">
        <div v-for="(block, index) in blocks">
            <div class="m-1">
                <div v-if="block.type===contentType.IMAGE">
                    <img v-if="block.content" class="img-fluid" :src="block.content"/>
                    <img v-else class="img-fluid" :src="DEFAULT_IMAGE_URL"/>
                </div>
                <div v-else-if="block.type===contentType.YOUTUBE">
                    <div v-html="block.content" v-if="block.content"></div>
                    <div v-html="DEFAULT_YOUTUBE_URL" v-else></div>
                </div>
                <div v-else-if="block.type===contentType.LABELED_TEXT" :class="block.type">
                    <div class="labeled_emoji" v-if="block.emoji">
                        <emoji :emoji="block.emoji" :size="40"/>
                    </div>
                    <div class="labeled_content">
                        <div v-html="block.content"></div>
                    </div>
                </div>
                <div :class="block.type" v-else>
                    <div v-html="block.content"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Picker, Emoji} from 'emoji-mart-vue'

    export default {
        name: "content-viewer",
        components: {
            Emoji,
            Picker
        },
        props: ['blocks'],
        data() {
            return {
                DEFAULT_IMAGE_URL: "http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg",
                DEFAULT_YOUTUBE_URL: "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&amp;showinfo=0\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>",
                contentType: {
                    "IMAGE": "image",
                    "GOALS": "goals",
                    "EXAMPLE": "example",
                    "TEXT": "text",
                    "LABELED_TEXT": "labeled_text",
                    "YOUTUBE": "youtube"
                },
            }
        }
    }
</script>

<style scoped>
    .goals {
        border-radius: .25rem;
        background: rgb(255, 242, 204);
        border: 1px solid rgba(0, 0, 0, .125);
        margin: 10px 0px;
        padding: 5px;
    }

    .example {
        border-radius: .25rem;
        background: #f5f5f5;
        border: 1px solid rgba(0, 0, 0, .125);
        margin: 10px 0px;
        padding: 5px;
    }

    .labeled_text {
        border-radius: .25rem;
        border: 1px solid rgba(255, 21, 31, 0.75);
        margin: 10px 0px;
        padding: 5px;
        display: flex;
    }

    .labeled_emoji {
        width: 60px;
    }

    #article {
        font-family: 'Roboto', sans-serif;
        font-size: 1rem;
        font-weight: 300;
        color: black;
    }

    #article >>> img {
        width: 100%;
    }

    #article >>> h1 {
        font-size: 3rem;
        text-transform: uppercase;
        font-weight: 900;
    }

    #article >>> h2 {
        font-size: 1.8rem;
        text-transform: uppercase;
        font-weight: 900;
    }

    #article >>> h3 {
        font-size: 1.4rem;
        text-transform: uppercase;
        font-weight: 900;
        color: #2c3e50;
    }

    #article >>> p {
        margin-bottom: 0;
    }
    #article >>> ul, #article >>> ol {
        margin-bottom: 0;
    }

    #article >>> em {
        font-family: 'EB Garamond', serif;
    }
</style>