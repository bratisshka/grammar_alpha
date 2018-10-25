<template>
    <div class="step-progress__wrapper">
        <div class="step-progress__wrapper-before"></div>
        <div class="step-progress__bar">
            <div class="step-progress__step" v-for="(step, index) in steps"
                 :class="{'step-progress__step--active': index === currentStep, 'step-progress__step--valid': index < currentStep}">
                <span>{{ index + 1 }}</span>
                <div class="step-progress__step-icon" :class="iconClass"></div>
                <div class="step-progress__step-label">{{ step }}</div>
            </div>
        </div>
        <div class="step-progress__wrapper-after"
             :style="{transform: 'scaleX(' + scaleX + ') translateY(-50%) perspective(1000px)'}"></div>
    </div>
</template>

<script>

    export default {
        name: 'StepProgress',
        props: {
            steps: {
                type: Array,
                default() {
                    return [];
                },
                validator(val) {
                    return val && val.length > 0;
                }
            },
            currentStep: {
                type: Number,
                default: 0
            },
            iconClass: {
                type: String,
                default: 'fa fa-check'
            }
        },
        computed: {
            scaleX() {
                let step = this.currentStep;
                if (step < 0) {
                    step = 0;
                } else if (step >= this.steps.length) {
                    step = this.steps.length - 1;
                }
                return step / (this.steps.length - 1);
            }
        }
    };
</script>

<style>
    .step-progress__wrapper {
        width: 90%;
        margin: 0 auto;
        position: relative;
    }

    .step-progress__wrapper-before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        height: 12px;
        width: 100%;
        background-color: gray;
        transform: translateY(-50%) perspective(1000px);
    }

    .step-progress__wrapper-after {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        height: 12px;
        width: 100%;
        background-color: red;
        transform: scaleX(0) translateY(-50%) perspective(1000px);
        transform-origin: left center;
        transition: transform 0.5s ease;
    }

    .step-progress__bar {
        width: 100%;
        display: flex;
        height: 100px;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
    }

    .step-progress__step {
        z-index: 2;
        position: relative;
    }

    .step-progress__step span {
        color: gray;
        transition: 0.3s ease;
        display: block;
        font-size: 50px;
        transform: translate3d(0, 0, 0) scale(1) perspective(1000px);
        font-weight: 900;
        text-align: center;
        opacity: 1;
    }

    @media (max-width: 767px) {
        .step-progress__step span {
            font-size: 28px;
        }
    }

    .step-progress__step--active span {
        color: red;
    }

    .step-progress__step--active .step-progress__step-label {
        color: red;
    }

    .step-progress__step--active .step-progress__step-icon {
        opacity: 1;
    }

    .step-progress__step--valid .step-progress__step-icon {
        opacity: 1;
        transform: translate3d(-50%, -50%, 0) scale(1) perspective(1000px);
    }

    .step-progress__step--valid span {
        color: red;
        opacity: 0;
        transform: translate3d(0, 0, 0) scale(2) perspective(1000px);
    }

    .step-progress__step--valid .step-progress__step-label {
        color: red;
    }

    .step-progress__step:after {
        content: "";
        position: absolute;
        z-index: -1;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) perspective(1000px);
        width: 75px;
        height: 75px;
        background-color: #fff;
        border-radius: 50%;
        border: 5px solid gray;
        transition: 0.3s ease;
    }

    @media (max-width: 767px) {
        .step-progress__step:after {
            width: 40px;
            height: 40px;
        }
    }

    .step-progress__step--active:after {
        border: 5px solid red;
    }

    .step-progress__step--valid:after {
        background-color: red;
        border: 5px solid red;
    }

    .step-progress__step-label {
        position: absolute;
        top: calc(100% + 25px);
        left: 50%;
        transform: translateX(-50%) perspective(1000px);
        white-space: nowrap;
        font-size: 18px;
        font-weight: 600;
        color: gray;
        transition: 0.3s ease;
    }

    .step-progress__step-icon {
        font-size: 36px;
        color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transition: transform 0.3s ease;
        opacity: 0;
        transform: translate3d(-50%, -50%, 0) scale(0) perspective(1000px);
    }

    @media (max-width: 767px) {
        .step-progress__step-icon {
            font-size: 22px;
        }
    }
</style>