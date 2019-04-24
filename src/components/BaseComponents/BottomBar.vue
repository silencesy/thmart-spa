<template>
    <div class="bottom-container">
        <router-link to="/">
            <div>
                <i class="iconfont icon-shanghu1" :class="{active: active==0}"></i>
                <div class="title" :class="{active: active==0}">Home</div>
            </div>
        </router-link>
        <router-link to="/Categories">
            <div>
                <i class="iconfont icon-fenlei1" :class="{active: active==1}"></i>
                <div class="title" :class="{active: active==1}">Categories</div>
            </div>
        </router-link>
        <router-link to="/Guide">
            <div>
                <img class="china" src="static/images/common/ex.png" alt="">
                <div class="circle" :class="{active: active==2}"></div>
                <div class="mask"></div>
            </div>
        </router-link>
        <router-link to="/Cart">
            <div>
                <i class="iconfont icon-gouwuche" :class="{active: active==3}"></i>
                <div class="title" :class="{active: active==3}">Cart</div>
            </div>
        </router-link>
        <router-link to="/MyAccount">
            <div>
                <i class="iconfont icon-me" :class="{active: active==4}"></i>
                <div class="title" :class="{active: active==4}">My Account</div>
            </div>
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'BottomBar',
    props: {
        active: {
            type: [Number,String],
            default: 0
        }
    },
}
</script>
<style scoped>
    .bottom-container {
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        top: auto;
        margin: auto;
        max-width: 750px;
        width: 100%;
        height: 55px;
        background-color: #fff;
        display: flex;
        align-items: center;
        box-shadow: 0px 0px 4px rgba(0,0,0,0.15);
        z-index: 999;
    }
    .bottom-container > a {
        flex: 1;
        text-align: center;
        position: relative;
    }
    .bottom-container > a > div {
        flex: 1;
        text-align: center;
        position: relative;
    }
    .bottom-container .iconfont {
        font-size: 23px;
        color: #888;
    }
    .bottom-container .iconfont.active {
        color: #F9421E;
    }
    .bottom-container .title {
        font-size: 12px;
        margin-top: 3px;
        color: #888;
    }
    .bottom-container .title.active {
        color: #F9421E;
    }
    .china {
        position: absolute;
        top: -5px;
        left: 12px;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 10;
        width: 63px;
    }
    .circle {
        position: absolute;
        top: -38px;
        left: 10px;
        right: 0;
        bottom: auto;
        margin: auto;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #dfdfdf;
        z-index: -1;
        background-color: #fff;
        box-shadow: 0px 0px 4px rgba(0,0,0,0.15);
    }
    .circle.active {
        /* color: #F9421E; */
        border: 2px solid #F9421E;
    }
    .mask {
        position: absolute;
        width: 100%;
        height: 55px;
        background-color: #fff;
        top: -28px;
        left: 0;
        z-index: 2;
    }

</style>

