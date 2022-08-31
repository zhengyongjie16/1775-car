<template>
  <div>
    <!--底部tab-->
    <div class="tab" @click="ent">
      <div class="tab1 tab2">
        <div class="tab1-" style="display: flex;">
          <i class="iconfont icon-shouye2 op" style=" top: 27%;"></i>
          <i class="iconfont icon-huojian po" style=" top: 100%;"></i>
        </div>
        <div class="ic" style="display: none;">
          <i class="iconfont icon-shouye2"></i>
          <span>首页</span>
        </div>
      </div>
      <div class="tab1">
        <i class="iconfont icon-chepai" ></i>
        <span>买车</span>
      </div>
      <div class="tab1">
        <i class="iconfont icon-50"></i>
        <span>卖车</span>
      </div>
      <div class="tab1" >
        <i class="iconfont icon-wode"></i>
        <span>我的</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Navigation',
  data() {
    return {
      a: true, // 判断是否手动触发滚动事件与图标top值得改变
      sdsc: false, // 判断是否手动触发监听事件
      again: false,
    };
  },
  props: {
    adc: { type: Number },

  },
  methods: {
    // shoppingCart() {
    //   // 跳转界面
    //   this.$router.push({ name: 'shoppingCart' });
    // },
    // maicvg() {
    //   // 跳转界面
    //   this.$router.push({ name: 'mail' });
    // },
    // 导航标签的颜色转换
    ent(e) {
      const a1 = document.querySelector('.tab1-');// 获取首页导航标签图标的节点
      const ic = document.querySelector('.ic');// 获取第二个的首页的样式
      const b = e.target.parentNode.parentNode;// 获取首页导航标签图标外部包裹着div
      const c = e.target.parentNode;
      const d = e.currentTarget.children;
      // 判定点击
      if (b === d[0] || c === d[0]) {
        this.$emit('aaa');
        this.$router.push({
            path:'/'
        });
        this.again = false;
      } else {
        for (let i = 1; i < d.length; i++) {
          if (b === d[i] || c === d[i]) {
            if (i === 3) this.$router.push({ name: 'User' });
            // if (i === 3) this.$router.push({ name: 'shoppingCart' });
            if (i === 2) this.$router.push({ name: 'Sale' });
            if (i === 1) this.$router.push({ name: 'List' });
          }
        }
      }
    },

  },
  watch: {
    // 保存挂载之前的数据
    adc(news, old) {
      console.log('news',news)
      if (old === null) { this.$router.push({ name: 'index' }); }
      if (news > 0) {

     /*   document.querySelector('.tab1-').style.display = 'none';
        document.querySelector('.ic').style.display = 'flex'*/;
      }
      document.querySelector('.tab').children[news].classList.add('col');
    },
  },
};
</script>

<style scoped lang="scss">
  @function vw($px){
    @return $px/1080*100vw
  }
  .tab{
    width: 100%;
    height: vw(155);
    display: flex;
    justify-content: space-between;
    border-top: vw(2) solid #f4f4f4;
  }
  .tab1{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #A3A3AD;
  }
  .tab1>span{
    font-size: vw(45);
  }
  .tab1>.iconfont{
    font-size: vw(60);
  }
  .tab2>.tab1->.iconfont{
    font-size: vw(50);
    color: white;
  }
  .tab2>.tab1-{
    border-radius: 50%;
    background-color: #FF8E42;
    background: -webkit-linear-gradient(left, #FEAD51, #FF7E38);
    background: -o-linear-gradient(right,#FEAD51, #FF7E38);
    background: -moz-linear-gradient(right, #FEAD51, #FF7E38);
    background: linear-gradient(to right, #FEAD51, #FF7E38);
    width: vw(112);
    height: vw(112);
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }
  .op{
    position: absolute;
    /*top: 27%;*/
    /*top: -50%;*/
    transition: top 500ms;
  }
  .po{
    position: absolute;
    transition: top 500ms;
    /*top: -100%;*/
    /*top: 23%;*/
    font-size: vw(65)!important;
  }
  .ic>.iconfont{
    font-size: vw(60);
  }
  .ic{
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: vw(20);
  }
  .col{
   color: #ff7d04;
  }


</style>
