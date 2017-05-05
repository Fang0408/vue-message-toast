<template>
    <transition name="fadeIn">
        <div class="msg-mode" v-show="visible">
            <div class="msg-text text-center">{{msg}}</div>
        </div>
    </transition>
</template>
<script>
    export default {
        data() {
            return {
                visible: false,
                timer: null,
                durations: 3000,
                msg: '',
                closed: false
            }
        },
        methods: {
            startTimer() {
                if(this.durations) {
                    this.timer = setTimeout(() => {
                        if (!this.closed) {
                            this.close();
                        }
                    }, this.durations);
                }
            },
            destoryElement() {
                this.$el.removeEventListener('transitionend', this.destroyElement); 
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el);
            },
            clearTimer() {
                clearTimeout(this.timer);
            },
            close() {
                this.closed = true;
                if(typeof this.onClose === 'function') {
                    this.onClose(this);
                }
            }
        },
        watch: {
            closed(newVal) {
                if(newVal) {
                    this.visible = false;
                    this.$el.addEventListener('transitionend', this.destoryElement)
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.startTimer();
            })
        }
    }
</script>
<style>
    .fadeIn-enter-active, .fadeIn-leave-active {
        transition: all .3s ease-in;
    }

    .fadeIn-enter, .fadeIn-leave-active {
        opacity: 0;
        transform: translateY(-10px);
    }

    .msg-mode {
        position: fixed;
        top: 40%;
        left: 50%;
        width: 260px;
        margin-left: -130px;
        z-index: 999
    }

    .msg-mode .msg-text {
        padding: 15px;
        border-radius: 2px;
        text-align: center;
        color: #fff;
        background-color: rgba(51,51,51,.9)
    }
</style>