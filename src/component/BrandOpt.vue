<template>

  <div class="brandList">
    <div  class="ttt" >
      <md-icon name="arrow-left" @click="selectItem(1)"  class="ic"></md-icon>
      选择品牌
    </div>
    <div class="hotCity">

    </div>
    <div class="mainList">
      <md-scroll-view
        :auto-reflow="true"
        :scrolling-x="false"
        :scrolling-y="true"
        ref="scrollViewBrand"
      >
        <div>
           <div class="item" @click="selectItem(5)">不限</div>
        </div>
         <div v-for="row in brandList" :key="row.char">
           <div class="char" :class="row.char">{{row.char}} </div>
           <div class="item" v-for="item in row.list" :key="item.brandId" @click="selectItem(item)"> {{item.brandName}}</div>
         </div>
      </md-scroll-view>
        <div class="indexBox">
            <div v-for="item in charts" :key="item" :class="nowAc==item?'ac':''" @click="toChar(item)">{{item}}</div>
        </div>
    </div>

  </div>
</template>

<script>
import pinyin4js from 'pinyin4js';

export default {
  name: 'brand',
  data() {
    return {
      charts: [],
      title: '请选择',
      brandList: [

      ],
      nowAc:'A'
    };
  },
  created() {
    this.getBrand();
  },
  methods: {
    selectItem(item) {
      this.$emit('change', item);
    },

    clickTitle(title) {
      console.log(title);
    },
    async getBrand() {
      const res = await this.$api.post('/vehicle/getTopBrand');
      const { success, data } = res.data;
      if (success) {
          this.brandList = data.filter(r=>r.list.length>0)
          this.charts = this.brandList.map(r=>r.char)
      }
    },
    toChar(item){
      this.nowAc = item
      document.querySelector(`.mainList .${item}`).scrollIntoView();
    }
  },
};
</script>

<style scoped lang="scss">
.brandList{
  width: 80vw;
  background: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: constant(safe-area-inset-top)!important;
  padding-bottom: constant(safe-area-inset-bottom)!important;
  /* Status bar height on iOS 11+ */
  padding-top: env(safe-area-inset-top)!important;
  padding-bottom: env(safe-area-inset-bottom)!important;
  box-sizing: border-box;
  .mainList{
    height: 0;
    flex-grow: 1;
    position: relative;
    &>div{
      .char{
        background: #efefef;
        font-size: 34px;
        line-height: 1.5;
        padding-left: 30px;
        color: #acacac;
      }
      .item{
        padding-left: 35px;
        font-size: 36px;
        line-height: 2.5;
        border-bottom: 1px solid #d3d3d3;
        color:#666;
      }
    }

  }
  .indexBox{
    position: absolute;
    right:10px;
    top:50%;
    transform: translateY(-50%);
    z-index: 999;
    div{
      line-height: 2;
      font-size: 24px;
      padding-right: 20px;
    }
    .ac{
      color:#ff4e00;
    }
  }

  .ttt{
    text-align: center;
    font-size: 34px;
    line-height: 80px;
    background: #efefef;
    color:#999;
    position: relative;
    .ic{
      position: absolute;
      left:20px;
      top:50%;
      transform: translateY(-50%);
    }
  }
}
</style>
