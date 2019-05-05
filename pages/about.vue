<template lang="pug">
  section
    .container
        h1(v-on:click="tt") {{innertext}}
</template>

<script>
export default {
    data() {
        return {
            arrow: 0,

        }
    },
    computed(){
        aa 
    },
    methods: {
        tt: function(){
            console.log("test")
            
        }
    }
}
</script>

<style lang="sass">
@mixin cen
    display: flex
    justify-content: center
    align-items: center
@mixin wh($w, $h)
    width: $w
    height: $h
    
html,body
    margin: 0
    overflow: hidden
    height: 100vh
    width: 100vw
    background-color: #2c2c2c
.container
    +cen
    +wh(100vw, 100vh)
    h1
        color: white
        transition: .8s
        cursor: pointer
        &:hover
            transform: scale(2)
</style>