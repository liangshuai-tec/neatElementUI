<template>
  <div style="height:100%">
    <el-container>
      
      <el-container>
        <el-main>

        <!-- <router-view v-if="$store.state.common.refreshRoute"></router-view>         -->
     
            <router-view ></router-view>  
        </el-main>      

      </el-container>

    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
/* eslint-disable */
import {Container, Header, Footer, Aside,Main} from 'element-ui'
export default {
  name: 'HomeView',
  components: {
    'el-container':Container,
    'el-header':Header,
    'el-footer':Footer,
    'el-aside':Aside,
    'el-main':Main,
  }
}
</script>
