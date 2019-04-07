<template lang="pug">
  section
    .statusbar
      .status_items
        .status_item.appleicon
        .status_item.application {{application}}
        .status_item.file 檔案
        .status_item.edit 編輯
        .status_item.show 顯示方式
        .status_item.goto 前往
    .container
      VueDragResize(:isActive="false" :parentLimitation="true" :w="800" :h="600" :x="90" :y="90" v-on:resizing="resize" v-on:dragging="resize"  @activated="onActivated(true)" @deactivated="onActivated(false)")
        .window#windows
          .bar
            .close.round_btn
            .small.round_btn
            .full.round_btn
          .content
            img(src="https://www.google.com/logos/doodles/2019/sawong-lor-tok-supsamruays-105th-birthday-4877433739149312.2-2x.jpg" style="width: 700px")
            input(type="email" style="width: 500px; margin-top: 10px; z-index: 999" @click="test")
            .btngroup
              button Google搜尋
              button 好手氣
      .toolbar
        .cover
          - for(var i = 0; i < 8; i++)
            .item
              img.icon(src="https://blog.macsales.com/wp-content/uploads/2017/12/finder-icon.png", class=`item-${i}`)
      
</template>

<script>
import Logo from '~/components/Logo.vue'
import VueDragResize from 'vue-drag-resize'

export default {
  components: {
    Logo,
    VueDragResize
  },
  data(){ 
    return {
      application: "vue"
    }
  },
  mounted() {
    this.tunami_effect()
  },
  methods: {
    tunami_effect: function(){
      $(document).ready(function(){
        $('.item img').resizeOnApproach({
          elementDefault: 80,
          elementClosest: 140,
          triggerDistance: 200,
          setWidthAndHeight: false
        });
      });
    },
    resize: function(newRect) {
        this.width = newRect.width;
        this.height = newRect.height;
        this.top = newRect.top;
        this.left = newRect.left;
    },
    onActivated: function(active){
      console.log("act");
      let element = document.getElementById("windows")
      if(active){
        element.style.boxShadow = "30px 30px 50px #1c1c1c"
      }else{
        element.style.boxShadow = "none"
      }

    },
    test: function(){
      console.log("test");
    }
  }
}
</script>

<style lang="sass">
@mixin tt($name)
  &:after
    font-size: .8rem
    font-weight: bold
    content: $name
    color: black
    opacity: 0.4
    text-align: center
    position: relative
    top: -55%
    left: 16%

html, body
  margin: 0
  overflow: hidden

section
  width: 100vw
  height: 100vh
  display: flex
  flex-direction: column


.container
  width: 100%
  height: 100%
  background: url(/wallpaper.jpg) center center / cover no-repeat fixed
  display: flex
  position: relative

.toolbar
  height: 6rem
  position: fixed
  bottom: 0rem
  left: 50%
  transform: translateX(-50%)
  
  // filter: blur(8px)
  // opacity: 0.6

.toolbar:hover .cover
  margin-top: 0rem
  

.cover
  width: 100%
  height: 6rem
  background: #000
  pointer-events: auto
  background-color: #262F3C
  // opacity: 0.7
  margin-top: 6rem
  transition: .5s
  border-radius: 5px 5px 0px 0px
  display: flex
  flex-direction: row

.item
  flex: 1
  // background-color: red
  margin: 5px
  display: flex
  justify-content: center
  align-items: center
  transition: .1s
  
.icon
  width: 80%
  margin: 0 auto
  padding-bottom: 10px
  position: relative
.item-1
  content:url("http://icons.iconarchive.com/icons/osullivanluke/orb-os-x/256/Safari-icon.png")
.item-2
  content:url("http://icons.iconarchive.com/icons/johanchalibert/mac-osx-yosemite/1024/launchpad-icon.png")
.item-3
  content:url("https://developer.apple.com/design/human-interface-guidelines/macos/images/icons/appIcons/AppIcon_Photos_2x.png")
.item-4
  content:url("https://user-images.githubusercontent.com/49339/32078472-5053adea-baa7-11e7-9034-519002f12ac7.png")
.item-5
  content:url("https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1200px-Steam_icon_logo.svg.png")
.item-6
  content:url("https://developer.apple.com/design/human-interface-guidelines/macos/images/icons/appIcons/AppIcon_Photos_2x.png")
.item-7
  content:url("https://www.macupdate.com/images/icons256/58607.png?d=1504272826")
.icon :hover
  width: 120%
  
  
.window
  width: 100%
  height: 100%
  background-color: white
  border-radius: 5px 
  overflow: hidden
  position: relative
  display: flex
  flex-direction: column
  &:onfocus
    background-color: orange

.bar
  height: 2.2rem
  width: 100%
  background-color: #3C393E
  border: solid #878689
  border-width: 1px 0px 0px 0px
  display: flex
  align-items: center

.content
  background-color: white
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  overflow: auto

.btngroup
  margin-top: 30px
  button
    width: 100px
    height: 30px
    background-color: #F2F2F2
    border: none
    border-radius: 5px
    color: #5F6368
    padding: 5px 7px
    margin: 8px 7px
  
.round_btn
  width: 12px
  height: 12px
  border-radius: 6px
  margin: .3rem

.close
  margin-left: .8rem
  background-color: #FF544D
  @include tt('x')
.small
  background-color: #FFC12F
  @include tt('-')
.full
  background-color: #28CA41
  @include tt('A')


.vdr.active:before
    content: ''
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    box-sizing: border-box
    outline: none
.vdr-stick 
    box-sizing: border-box
    position: absolute
    font-size: 1px
    background: red
    border: 1px solid red
    box-shadow: 0 0 2px red
    opacity: 0
  
.statusbar
  width: 100%
  height: 1.5rem
  background-color: #1d1e1e

.status_items
  height: 100%
  display: flex
  flex-direction: row
  color: white

.status_item
  height: 100%
  margin-right: 15px
  font-weight: bold
  cursor: pointer

.application
  font-weight: bolder

.appleicon
  margin-left: 20px
  width: 20px
  background: url(/apple.png) no-repeat 
  background-size: contain

    


</style>
