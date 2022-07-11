<template>
    <div>
        <RenderForm
            :templateData="templateData"
            :buttonsList="buttonsList"
            :data="data"
            @save="saveFunc"
            @cache="cacheFunc"
            @cancel="cancelFunc"
            @reset="resetFunc">
        </RenderForm>


    </div>
</template>
<script lang="text/javascript">
/* eslint-disable */
import RenderForm from '@/components/RenderForm.vue'
export default {
    data(){
        const inputRules = {required:true, message:"必填项", trigger:"blur"}
        const selectRules = {required:true, message:"必选项", trigger:"blur"}
        const datePickerRules = {required:true, message:"必选项", trigger:"blur"}
        const maxLength = {max:60, message:"不能大于60个字", trigger:"blur"}
        return {
        /** 
         *  title:{label:"title-type", type:"title"},
         *  type: input select  datePicker  textarea
         * 
         *  校验规则：{type:"input", rules:[], required:true},
         * 
         *  input框：{label:"input-type", prop:"inputType", type:"input", disabled:false, rules:[{required:true,message:"必填项",trigger:"blur"}]},
         *  select框：{label:"select-type", prop:"selectType", type:"select", disabled:false,list:[{value:1,text:"1"},{value:2,text:"2"}]},
         *  datePicker框：{label:"datePicker-type", prop:"datePickerType", type:"datePicker", disabled:false,}
         * 
         *  select框：{label:"select-type-获得字典项", prop:"selectType", type:"select", disabled:false, dicCode:"code_eng"}, // 自动查字典
         * 
         * 
         * **/
            // 为页面添加元素
            templateData:[
                /** input 三种校验 **/
                {label:"input-type1", prop:"inputType1", type:"input", disabled:false, rules:[{required:true,message:"必填项",trigger:"blur"}]},
                
                {label:"input-type2", prop:"inputType2", type:"input", disabled:false, rules:[inputRules]},

                {label:"input-type3", prop:"inputType3", type:"input", disabled:false, rules:[], required:true},
                
                /** select 三种校验 **/
                {label:"select-type1", prop:"selectType1", type:"select", disabled:false, rules:[], required:true, list:[{value:1,text:"1"},{value:2,text:"2"}]},
                
                {label:"select-type2", prop:"selectType2", type:"select", disabled:false, rules:[], required:true, dicCode:"age_eng"},
                
                /** datePicker **/
                {label:"datePicker-type", prop:"datePicker", type:"datePicker", disabled:false, rules:[datePickerRules], required:true, dicCode:"age_eng"},
            ],
            buttonsList:[
                {type:"save", text:"保存"},
                {type:"cache", text:"暂存"},
                {type:"cancel", text:"取消"},
                {type:"reset", text:"重置"},
            ],
            data:{inputType1:1111,datePicker:"2022-08-11"}

        }
    },
    components:{
        RenderForm
    },
    methods:{
        saveFunc(data){
            console.log(data)
        },
        cacheFunc(data){
            console.log(data)
        },
        cancelFunc(data){
            console.log(data)
        },
        resetFunc(data){
            console.log(data)
        },
    }
    
}
</script>