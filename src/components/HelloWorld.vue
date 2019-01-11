<template>
  <div class="hello">
      {{msg}}
      <Button type="primary">1111</Button>
  </div>
</template>

<script>
import { Button } from 'iview';
export default {
  name: 'HelloWorld',
  data: function() {
    return {
      msg: ''
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    // getData() {
    //   this.$get("/api").then(res => {
    //     console.log(res.data)
    //     // this.msg = res;
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
