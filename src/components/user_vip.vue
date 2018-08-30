<template>
    <div class="user-head">
        <div class="user-bg" @mouseenter="enter"
             @mouseleave="leave">
            <div class="star1" v-for="(item,index) in current" :key="index"
                 :style="{left:item.left,top:item.top,animation:item.animation}" :class="item.className"></div>
        </div>
        <div class="user-level" :class='"level"+level.value'></div>
    </div>
</template>

<script>
import {mapMutations, mapActions, mapState} from 'vuex'

export default {
    name: 'user-head',
    data() {
        return {
            star: [
                {left: "40%", top: "-5%"},
                {left: "60%", top: "0%"},
                {left: "75%", top: "15%"},
                {left: "80%", top: "40%"},
                {left: "75%", top: "60%"},
                {left: "60%", top: "75%"},
                {left: "40%", top: "80%"},
                {left: "15%", top: "75%"},
                {left: "0%", top: "60%"},
                {left: "-5%", top: "40%"},
                {left: "0%", top: "15%"},
                {left: "15%", top: "0%"}
            ],
            oddList: [
                {left: "60%", top: "0%"},
                {left: "80%", top: "40%"},
                {left: "60%", top: "75%"},
                {left: "15%", top: "75%"},
                {left: "-5%", top: "40%"},
                {left: "15%", top: "0%"}
            ],
            evenList: [
                {left: "40%", top: "-5%"},
                {left: "75%", top: "15%"},
                {left: "75%", top: "60%"},
                {left: "40%", top: "80%"},
                {left: "0%", top: "60%"},
                {left: "0%", top: "15%"},
            ],
            current: null,
            odd: 0,
            all: false,
            timer: null
        };
    },
    props: [],
    methods: {
        start() {
            getTestLoginURL(this.startGame).then(res => {
            })
        },
        enter() {
            clearInterval(this.timer);
            this.current = this.star;
        },
        leave() {
            this.current = this.oddList;
            this.init();
        },
        init() {
            this.current = this.oddList;
            this.timer = setInterval(() => {
                if (this.current == this.oddList) {
                    this.current = this.evenList;
                } else {
                    this.current = this.oddList;
                }
            }, 800)
        }
    },
    mounted() {
        this.init();
    },
    created() {
    },
    computed: {
        ...mapState(['level'])
    }
};
</script>
