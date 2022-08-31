<template>
    <div class="home">
          <div class="top">
            商家信息
          </div>
          <div class="menu">
              <div @click="$router.push({name:'MyCar'})">我的车源</div>
              <div>批车大厅</div>
              <div>我的商机</div>
          </div>
    </div>
</template>

<script>
export default {
  name: 'newHome',
};
</script>

<style scoped lang="scss">

  .top{
    height: 50px;
    line-height: 50px;
  }
  .home{
    height: 100%;
  }
  .menu{
      display: flex;
    &>div{
      border: 1px solid #000;
      width: 0;
      flex-grow: 1;
      height: 20vw;
      line-height: 20vw;
      text-align: center;
    }
  }
</style>
