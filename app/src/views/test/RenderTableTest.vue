<template>
    <div>
        <RenderTable border stripe
            :multiple="multiple"
            :templateData="templateData"
            :data="dataList"
            @selection-change="selectionChangeFunc">
        </RenderTable>
    </div>
</template>
<script lang="text/javascript">
/* eslint-disable */
import RenderTable from '@/components/RenderTable.vue'
export default {
    data(){
        const inputRules = {required:true, message:"必填项", trigger:"blur"}
        const selectRules = {required:true, message:"必选项", trigger:"blur"}
        const datePickerRules = {required:true, message:"必选项", trigger:"blur"}
        const maxLength = {max:60, message:"不能大于60个字", trigger:"blur"}
        return {
            // 为页面添加元素
            templateData:[
                {label:"", prop:"", type:"selection"},
                
                {label:"序号", prop:"", type:"index"},

                {label:"姓名", prop:"name"},
                
                {label:"性别", prop:"sex", dicCode:"sex_eng"},
                
                {label:"住址", prop:"address"},
                
            ],
            buttonsList:[
                {type:"cache", text:"暂存"},
                {type:"cancel", text:"取消"},
                {type:"reset", text:"重置"},
            ],
            multiple:false,
            dataList:[
                {name:"姓名1", sex:"1", address:"住址1"},
                {name:"姓名2", sex:"2", address:"住址2"},
            ],
        }
    },
    components:{
        RenderTable
    },
    methods:{
        selectionChangeFunc(selection){
            console.log("通过$listeners获得数据",selection);
        },

    }
    
}
</script>