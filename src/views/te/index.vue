<template>
    <div>
        <div>
           <button @click="doSave">保存远程相片</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "index",
      methods:{
          doSave(){
            cordova.plugins.photoLibrary.saveImage('https://api.1775.net.cn/public/atache/car/20200117/1579224497112.JPG', album, (libraryItem) => {
              console.log('do save the pic')
              resolve(libraryItem)
            }, (err) => {
              console.log(err);
              reject()
              cordova.plugins.photoLibrary.requestAuthorization(
                function () {
                  // User gave us permission to his library, retry reading it!
                  this.$toast.succeed('信息获取中');

                },
                function (err) {
                  this.$toast.failed('不确定权限就不能正常使用');
                  throw err
                  // User denied the access
                }, // if options not provided, defaults to {read: true}.
                {
                  read: true,
                  write: true,

                },

              );
              this.$toast.failed(err);
            });
          }
      }
    }
</script>

<style scoped>

</style>
