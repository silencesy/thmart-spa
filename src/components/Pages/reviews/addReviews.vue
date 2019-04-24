<template>
    <div class="container">
        <ShopGoodsItem class="item" :shopData="data" />
        <div class="reviews-content">
            <div class="reviews-box">
                <div class="title">
                    Review
                </div>
                <div>
                    <textarea v-model="comment" name="" maxlength="200" placeholder="Leave your comments here. (Maximum 200 words)." id="" cols="30" rows="10"></textarea>
                </div>
                <Upload @getFiles="getImageList" @removeFiles="removeImage" ref="upload" />
                <div class="info">Maximum 5 photos with PNG/JPG/jpeg format</div>
            </div>
        </div>
        <div class="bottom" @click="submit">Submit</div>
    </div>
</template>
<script>
export default {
    name: 'addRevies',
    data() {
        return {
            data: null,
            picList: [],
            comment: ''
        }
    },
    components: {
        ShopGoodsItem: r => { require.ensure([], () => r(require('../../BaseComponents/ShopGoodsItem')), 'ShopGoodsItem') },
        Upload: r => { require.ensure([], () => r(require('../../BaseComponents/Upload')), 'Upload') }
    },
    mounted() {
        this.getAllReviews();
    },
    methods: {
        getImageList(files) {
            this.picList = [];
            this.$nextTick(() => {
                for (let i = 0, len = files.length; i < len; i++) {
                    this.picList.push(files[i].src);
                }
            });
        },
        //删除图片
        removeImage(index) {
            this.picList.splice(index, 1);
        },
        submit() {
            var that = this;
            if (!that.comment || that.comment.length < 5) {
                that.$toast("Your comment must contain at least 5 characters！");
            } else {
                let params = {
                    comment: that.comment,
                    picList: that.picList,
                    id: that.$route.query.id
                }
                that.$http.post(that.urls.addReviews,params)
                .then(function (response) {
                    that.$toast("Successfully！");
                    setTimeout(() => {
                        that.$router.back(-1);
                    }, 1000);
                })
                .catch(function (error) {
                    
                });
            }
        },
        getAllReviews() {
            let that = this;
            let params = {
                id: that.$route.query.id
            }
            that.$http.post(that.urls.getSkuReviesDetail,params)
            .then(function (response) {
                that.data = response.data.data
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>
<style scoped>
    .container .item {
        margin-top: 10px;
    }
    .reviews-content {
        padding: 0 10px;
    }
    .reviews-box {
        padding: 10px;
        background-color: #fff;
        border: 1px solid #dfdfdf;
        border-radius: 4px;
    }
    .reviews-box  .title  {
        border-bottom: 1px solid #dfdfdf;
        padding-bottom: 8px;
    }
    textarea {
        width: 100%;
        height: 150px;
        border: none;
        margin-top: 10px;
        padding: 5px;
        box-sizing: border-box;
        font-size: 14px;
        color: #666;
        outline: none;
        border-bottom: 1px solid #dfdfdf;
        resize: none;
    }
    .bottom {
		position: fixed;
	    display: block;
	    height: 36px;
	    line-height: 36px;
	    background: #F9421E;
	    top: auto;
	    bottom: 10px;
	    left: 0;
	    right: 0;
	    margin: auto;
	    color: #fff;
	    max-width: 730px;
	    width: 95%;
	    text-align: center;
	    border-radius: 23px;
	}
    .info {
        color: #999;
        font-size: 14px;
    }
</style>
