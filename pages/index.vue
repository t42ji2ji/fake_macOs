<template lang="pug">
  section(v-on:click="white_space")
    .statusbar
      .status_items
        .status_item.appleicon(v-on:click="did_select($event, 0)"
        v-on:mouseenter="did_select($event, 0)")
          img(src="/apple.png")
        .status_item.application(v-on:click="did_select($event, 1)" v-on:mouseenter="did_select($event, 1)") {{application}}
          .down_list(v-if="down_list[1]" v-on:mouseleave="out_list")
            .list_item(v-on:mouseenter="did_select($event, 1)" v-on:mouseout="no_select" v-for="item in select[0]" :class="{down_line: item.down_line}") {{item.title}}
              span.sub_item {{item.subtitle}}

        .status_item.file(v-on:click="did_select($event, 2)" v-on:mouseenter="did_select($event, 2)") 檔案
          .down_list(v-if="down_list[2]" v-on:mouseleave="out_list")
            .list_item(v-on:mouseenter="did_select($event, 2)" v-on:mouseout="no_select" v-for="item in select[1]" :class="{down_line: item.down_line}") {{item.title}}
              span.sub_item {{item.subtitle}}
        .status_item.edit(v-on:click="did_select($event, 3)" v-on:mouseenter="did_select($event, 3)") 編輯
          .down_list(v-if="down_list[3]" v-on:mouseleave="out_list")
            .list_item(v-on:mouseenter="did_select($event, 3)" v-on:mouseout="no_select" v-for="item in select[2]" :class="{down_line: item.down_line}") {{item.title}}
              span.sub_item {{item.subtitle}}
        //- .status_item.show(v-on:click="did_select($event, 4)" v-on:mouseenter="did_select($event, 0)") 顯示方式
        //- .status_item.goto(v-on:click="did_select($event, 5)" v-on:mouseenter="did_select($event, 0)") 前往
        .status_item.time(v-on:click="did_select($event, 6)") {{time}}
        .status_item.siricon(v-on:click="did_select($event, 7)")
    .container
      VueDragResize(:isActive="false" :parentLimitation="false" :w="800" :h="600" :x="90" :y="90" v-on:resizing="resize" v-on:dragging="resize"  @activated="onActivated(true)" @deactivated="onActivated(false)")
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
import Logo from "~/components/Logo.vue";
import VueDragResize from "vue-drag-resize";

export default {
  components: {
    Logo,
    VueDragResize
  },
  data() {
    return {
      application: "VUE",
      time: "",
      last_state: null,
      now_list: null,
      downlist_number: null,
      focus: false,
      select: [
        [
          {
            title: "關於VUE",
            subtitle: "",
            down_line: true
          },
          {
            title: "偏好設定...",
            subtitle: "⌘,",
            down_line: true
          },
          {
            title: "隱藏VUE",
            subtitle: "⌘H",
            down_line: false
          },
          {
            title: "隱藏其他",
            subtitle: "⌘⌥H",
            down_line: true
          },
          {
            title: "結束VUE",
            subtitle: "⌘Q",
            down_line: true
          }
        ],
        [
          {
            title: "打開",
            subtitle: "",
            down_line: false
          },
          {
            title: "打開新檔案",
            subtitle: "⌘,",
            down_line: true
          },
          {
            title: "複製",
            subtitle: "",
            down_line: false
          },
          {
            title: "重新命名",
            subtitle: "",
            down_line: false
          }
        ],
        [
          {
            title: "復原",
            subtitle: "⌘Z",
            down_line: false
          },
          {
            title: "取消復原",
            subtitle: "⇧⌘Z",
            down_line: true
          },
          {
            title: "複製",
            subtitle: "⌘C",
            down_line: false
          },
          {
            title: "貼上",
            subtitle: "⌘V",
            down_line: false
          }
        ]
      ]
    };
  },
  mounted() {
    this.tunami_effect();
    this.setDates();
  },
  computed: {
    down_list() {
      var list = [];
      for (var i = 0; i < 6; i++) {
        if (i != this.downlist_number) list.push(false);
        else list.push(true);
      }
      return list;
    }
  },
  methods: {
    tunami_effect: function() {
      $(document).ready(function() {
        $(".item img").resizeOnApproach({
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
    onActivated: function(active) {
      let element = document.getElementById("windows");
      if (active) {
        element.style.boxShadow = "20px 20px 50px #1c1c1c";
      } else {
        element.style.boxShadow = "none";
      }
    },
    setDates: function() {
      var month = new Array(7);
      month[1] = "週一";
      month[2] = "週二";
      month[3] = "週三";
      month[4] = "週四";
      month[5] = "週五";
      month[6] = "週六";
      month[0] = "週日";
      let timmer = () => {
        var dt = new Date();
        let min =
          dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
        this.time = month[dt.getDay()] + " " + dt.getHours() + ":" + min;
      };
      timmer();
      let timer = setInterval(timmer, 60000);
    },
    test: function() {
      console.log("test");
    },
    did_select: function(obj, target) {
      // console.log(obj.target.parentNode.className)
      if (obj.target.parentNode.className == "status_items") {
        if (this.now_list) {
          console.log("ttt");
          this.now_list.style.backgroundColor = "transparent";
        }
        this.now_list = obj.target;
      }
      this.downlist_number = target;
      if (this.last_state) {
        this.last_state.style.backgroundColor = "transparent";
      }
      this.last_state = obj.target;
      obj.target.style.backgroundColor = "#005CC0";

      //標題還要是藍色
      this.now_list.style.backgroundColor = "#005CC0";
    },
    no_select: function() {
      this.last_state.style.backgroundColor = "transparent";
    },
    out_list: function() {
      // this.downlist_number = null
    },
    white_space: function() {
      this.downlist_number = null;
      if (this.now_list) this.now_list.style.backgroundColor = "transparent";
    }
  }
};
</script>

<style lang="sass">
@mixin tt($name)
  &:after:hover
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
  content: url("http://icons.iconarchive.com/icons/osullivanluke/orb-os-x/256/Safari-icon.png")
.item-2
  content: url("http://icons.iconarchive.com/icons/johanchalibert/mac-osx-yosemite/1024/launchpad-icon.png")
.item-3
  content: url("https://developer.apple.com/design/human-interface-guidelines/macos/images/icons/appIcons/AppIcon_Photos_2x.png")
.item-4
  content: url("https://user-images.githubusercontent.com/49339/32078472-5053adea-baa7-11e7-9034-519002f12ac7.png")
.item-5
  content: url("https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1200px-Steam_icon_logo.svg.png")
.item-6
  content: url("https://www.macupdate.com/images/icons256/58607.png?d=1504272826")
.item-7
  content: url("https://support.apple.com/library/content/dam/edam/applecare/images/en_US/social/thumbnail/macos-mojave-trash-icon-full-thumbnail_2x.png")

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
  transition: .2s

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
  height: 28x
  background-color: #1d1e1e

.status_items
  height: 100%
  display: flex
  align-items: flex-end
  flex-direction: row
  color: white

.status_item
  position: relative
  height: 100%
  font-weight: bold
  cursor: pointer
  text-align: center
  line-height: 1.8rem
  padding: 0px 12px 0px 12px

.application
  padding-top: 0
  font-weight: bolder

.appleicon
  margin-left: 20px
  width: 50px
  height: 100%
  // background: url(/apple.png) no-repeat
  // background-size: contain
  background-position: center
  display: flex
  flex-direction: column
  align-items: center
  img
    width: 80%
    object-fit: contain

.siricon
  width: 18px
  background: url(/siri.png) no-repeat
  background-size: contain
  background-position: center
  justify-self: end
  margin-left: 0

.time
  justify-self: end
  margin-left: auto

.down_list
  position: absolute
  left: -1px
  background-color: rgba(50, 50, 50, .8)
  width: 13rem
  border-radius: 0px 0px 5px 5px
  display: flex
  flex-direction: column

  z-index: 999
  .list_item
    text-align: left
    padding-left: 20px

  .down_line
    border-bottom: solid 1.5px rgba(255,255,255, .2)

.sub_item
  float: right
  padding-right: 10px
  pointer-events: none
</style>
