<template>
    <div class="ScrollView wrapper" ref="wrapper" :style="{width:'100%',height:height+'px',backgroundColor: color}">
        <div class="content">
            <slot></slot>
            <div v-show="loadding2" class="loadding-box">
              <mt-spinner  type="fading-circle" :size='18' color="#f24827"></mt-spinner>
            </div>
            <div v-show="isShow" class="promptText">{{promptText2}}</div>
        </div>
        <i class="iconfont icon-fanhuidingbu" v-show="goBack" @click="goBackFun"></i>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    export default {
      name: 'ScrollView',
      props: {
        /**
         * 开启滑动滑动区块
         */
        open: {
          type: Boolean,
          dafualt: false
        },
        /**
         * 
        * 列表的数据
        */
        data: {
          type: Array,
          default: function () {
            return []
          }
        },
        /**
         * 请求成功
         */
        requestSuccess: {
          type: Boolean,
          dafualt: false
        },
        /**
        * 1 滚动的时候会派发scroll事件，会截流。
        * 2 滚动的时候实时派发scroll事件，不会截流。
        * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        */
        /**
         * 容器高度
         */
        height: {
          type: [Number,String],
          default: 0
        },
        /**
         * 背景颜色
         */
        color: {
          type: String,
          default: '#fff'
        },
        probeType: {
          type: Number,
          default: 1
        },
        /**
        * 点击列表是否派发click事件
        */
        click: {
            type: Boolean,
            default: true
        },
        /**
        * 是否开启横向滚动
        */
        scrollY: {
          type: Boolean,
          default: true
        },
        /**
        * 是否开启横向滚动
        */
        scrollX: {
          type: Boolean,
          default: false
        },
        /**
        * 是否派发滚动事件
        */
        listenScroll: {
          type: Boolean,
          default: true
        },
        /**
        * 是否派发滚动到底部的事件，用于上拉加载
        */
        pullup: {
          type: Boolean,
          default: false
        },
        /**
        * 是否派发顶部下拉的事件，用于下拉刷新
        */
        pulldown: {
          type: Boolean,
          default: false
        },
        /**
        * 是否派发列表滚动开始的事件
        */
        beforeScroll: {
          type: Boolean,
          default: false
        },
        /**
        * 当数据更新后，刷新scroll的延时。
        */
        refreshDelay: {
          type: Number,
          default: 20
        },
        /**
         * 是否显示加载的图标
         */
        loadding: {
          type: Boolean,
          default: true
        },
        /**
         * 上拉结束提示文字或者没有数据的时候提示文字
         */
        promptText: {
          type: String,
          default: "No more data"
        },
        /**
         * 小于多少个不显示提示语
         */
        LessThanNumber: {
          type: Number,
          default: 6
        },
        isshowgoback: {
          type: Boolean,
          default: true
        }
      },
      data () {
        return {
          // 控制加载图标
          loadding2: this.loadding,
          // 数据全部请求完成或者没有数据时提示用户
          promptText2: this.promptText,
          // 是否显示promptText
          isShow: false,
          goBack: false
        }
      },
      mounted() {
        var that = this;
        that.$nextTick(() => {
          setTimeout(function(){
            that._initScroll();
          },50);
        });
      },
      methods: {
        _initScroll() {
          var that = this;
          // 没有获取到dom元素直接结束
          if (!that.$refs.wrapper) {
            return;
          }
          // better-scroll的初始化
          that.scroll = new BScroll(that.$refs.wrapper, {
            probeType: that.probeType,
            click: that.click,
            scrollX: that.scrollX,
            scrollY: that.scrollY,
            pullUpLoad: {
              threshold: 50
            }
          })
          // 是否派发滚动事件
          if(that.listenScroll){
            that.scroll.on('scroll',(pos) => {
              if (pos.y<-250 && that.isshowgoback) {
                that.goBack = true;
              } else {
                that.goBack = false;
              }
            })
            
          }

          // 是否派发滚动到底部事件，用于上拉加载
          if (that.pullup) {
            // that.scroll.on('pullingUp',function(){
            //   that.$emit('pullingUp');
              
            // })
            that.scroll.on('scrollEnd', () => {
              // 滚动到底部
              if (that.scroll.y <= (that.scroll.maxScrollY + 200)) {
                that.$emit('pullingUp')
              }
            })
          }
          
          // 是否派发顶部下拉事件，用于下拉刷新
          if (that.pulldown) {
            that.scroll.on('touchend', (pos) => {
              // 下拉动作
              if (pos.y > 50) {
                that.$emit('pulldown')
              }
            })

          }
          // 是否派发列表滚动开始的事件
          if (that.beforeScroll) {
            that.scroll.on('beforeScrollStart', () => {
              that.$emit('beforeScroll')
            })
          }
        },
        disable(){
          this.scroll && this.scroll.disable()  
        },
        enable(){
          this.scroll && this.scroll.enable()
        },
        refresh(){
          this.scroll && this.scroll.refresh()
        },
        scrollTo(){
          this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
          this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments) 
        },
        finishPullUp() {
          this.scroll.finishPullUp();
        },
        // 结束加载
        endup() {
          
          var that = this;
          setTimeout(() => {
            that.loadding2 = false;
            if (that.data.length==0 ) {
              that.isShow = true;
            } else if (that.data.length<that.LessThanNumber){
              that.isShow = false;
            } else {
              that.promptText2 = '- End -';
              that.isShow = true;
            }
          }, 20);
          
        },
        // 开始加载
        startup() {
          this.loadding2 = true;
          this.isShow = false;
          this.goBack = false;
          this.promptText2 = this.promptText;
        },
        // 返回顶部
        goBackFun() {
          this.scroll.scrollTo(0, 0, 0, "easing");
          this.goBack = false;
        }
      },
      watch: {
        open: function(newVal,oldVal) {
          if (newVal) {
            if (!this.$refs.wrapper) {
              return;
            }
            this._initScroll();
          }
        },
        data: function() {
          setTimeout(() => {
            this.refresh();
            // this.finishPullUp();
          }, 20);
          setTimeout(() => {
            this.refresh();
            // this.finishPullUp();
          }, 80);
          setTimeout(() => {
            this.refresh();
            // this.finishPullUp();
          }, 140);
          setTimeout(() => {
            this.refresh();
            // this.finishPullUp();
          }, 400);
        }
      }
    }
</script>
<style scoped>
    .wrapper {
      overflow: hidden;
      background-color: #eee;
    }
    .loadding-box {
      padding: 0px 0 8px 0;
    }
    .promptText {
      text-align: center;
      padding-bottom: 15px;
      color: #999; 
    }
    .iconfont.icon-fanhuidingbu {
      position: fixed;
      right: 15px;
      bottom: 70px;
      font-size: 30px;
      opacity: 0.8;
    }
</style>