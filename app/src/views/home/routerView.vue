<template>
    <div>
        <keep-alive>
            <router-view v-if="keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!keepAlive"></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    computed:{
        keepAlive(){
            if(this.$route.meta){
                const metaKeepAlive = this.$route.meta.keepAlive
                if(typeof metaKeepAlive === 'boolean' && metaKeepAlive){
                    return true;
                }else if(typeof metaKeepAlive === 'string' && 'true' === metaKeepAlive){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
    }
}
</script>
<style lang="less" scoped>

</style>