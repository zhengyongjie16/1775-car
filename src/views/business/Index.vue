<template>
  <div class="main">
    <navTag :title="title"></navTag>
    <BusinessFollow></BusinessFollow>
  </div>
</template>



<script>
  import BusinessFollow from '../../component/BusinessFollow';
  export default {
    name: 'Union',
    components:{
      BusinessFollow
    },
    data(){
      return{
          title:'商机分配'
      }
    },
    methods:{
      handleNavChange(item){
        console.log(item)
        this.current = item.value
      }
    }

  };
</script>

<style scoped lang="scss">
  .main{
    height: 100%;
    display: flex;
    flex-direction: column;
  }


</style>
