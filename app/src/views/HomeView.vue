<template>
  <div class="home">
    <el-container>
      <el-container>

        <!-- <router-view v-if="$store.state.common.refreshRoute"></router-view>         -->
     
             <router-view ></router-view>        

      </el-container>

    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import {Container} from 'element-ui'
export default {
  name: 'HomeView',
  components: {
    'el-container':Container
  }
}
</script>
