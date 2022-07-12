<template>
    <div>
        <!-- 
        分页事件：
            @size-change="handleSizeChangeFunc"
            @current-change="handleCurrentChangeFunc"

            分页信息：
                offset  limit  total


        -->
        <RenderPageTable border stripe ref="table"
            :multiple="multiple"
            :templateData="templateData"
            :data="dataList"
            @selection-change="selectionChangeFunc"
            @size-change="handleSizeChangeFunc"
            @current-change="handleCurrentChangeFunc">
        </RenderPageTable>
        <button type="button" @click="getOriginData">刷新数据</button>
    </div>
</template>
<script lang="text/javascript">
/* eslint-disable */
import RenderPageTable from '@/components/RenderPageTable.vue'
import axios from "axios"
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
            multiple:true,
            // dataList:[
            //     {name:"姓名1", sex:"1", address:"住址1"},
            //     {name:"姓名2", sex:"2", address:"住址2"},
            // ],
            dataList:{
                data:[],
                total:0
            }

        }
    },
    mounted(){
        this.getOriginData();
    },
    components:{
        RenderPageTable
    },
    methods:{
        selectionChangeFunc(selection){
            console.log("通过$listeners获得数据",selection);
        },
        // 每页多少条
        handleSizeChangeFunc(val) {
            console.log(`每页 ${val} 条`);
        },
        // 当前页 
        handleCurrentChangeFunc(val) {
            console.log(`当前页: ${val}`);
        },
        getOriginData(){
            this.$http.get("/api/users/pageTable").then((res)=>{
                let {data} = res;
                console.log(data)
                // ...
                if(data.code == 0){
                    this.dataList = data;
                }
            }).catch((error)=>{
                // ...
                console.log(error);
            });

        }

    }
    
}
</script>