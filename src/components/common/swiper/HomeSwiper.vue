<template>
    <swiper>
        <swiper-item v-for="item in banners">
<!--            <a :href="item.link">-->
                <img :src="item.img" alt="" @load="imageLoad">
<!--            </a>-->
        </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"
  export default {
    name: "childComponents",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return  {
        // isLoad: false
      }
    },
    methods: {
      imageLoad() {
        this.$emit('swiperImageLoad')
      }
    },
    components: {
      Swiper,SwiperItem
    }
  }
</script>

<style scoped>

</style>