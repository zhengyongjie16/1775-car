<template>
  <div class="ce">
    <van-nav-bar
      title="车牌查询"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-index-bar :index-list="indexList">
      <template v-for="item of brandData">
        <van-index-anchor :index="item.index">{{item.index}}</van-index-anchor>
        <van-cell :title="provience.city + ` ( ${provience.shortName} )`" v-for="provience of item.proviences"  @click="showPop(provience.children,provience.shortName)" />
      </template>
    </van-index-bar>

    <md-popup v-model="cityPop">
      <ul class="cityList">
         <li v-for="item of citys"> {{shortName}}{{item.brandLetter}}   {{item.name}}  </li>
      </ul>
    </md-popup>
  </div>
</template>

<script>
import brandData from '../components/data/brandData';

export default {
  name: 'brandtool',
  data() {
    return {
      indexList: [],
      brandData,
      cityPop: false,
      citys: [],
      shortName: '',
    };
  },
  created() {
    this.indexList = 'ABCDEFGHIJKLMNOPQRSTUVWSYZ'.split('');
    console.log(this.brandData);
  },
  methods: {
    showPop(childrens, shortName) {
      this.citys = childrens;
      this.shortName = shortName;
      this.cityPop = true;
    },
  },
};
</script>

<style scoped lang="scss">
  .cityList{
    background: #fff;
    padding: vw(20)

  }
  .cityList  li{
    line-height: 2;
    border-bottom: 1px solid #ccc;
    font-size: 13px;
  }

::v-deep .van-index-bar{
    height: 0;
    flex-grow: 1;
  }
</style>
