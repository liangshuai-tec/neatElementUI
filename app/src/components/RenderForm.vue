<template>
    <div class="RenderForm">
<!-- 
    组件使用说明：
    接受参数：
        templateDate  html数据结构
            type == datePicker  数据格式 yyyy-MM-dd
        data  初始化值
        formDisabled  el-form-item 整体禁用
 -->
        <el-form ref="form" label-width="12em" :model="form" :rules="formRules" label-suffix="：" :disabled="formDisabled">
            <el-row :gutter="24">
                <template v-for="item,idx of templateData" >
                    <el-col :span="24" v-if="item.type == 'title'" :key="idx">
                        <p class="tabTitle">{{item.label}}</p>
                    </el-col>

                    <el-col :span="11" v-if="item.type == 'input'" :key="idx">
                        <el-form-item :label="item.label" :prop="item.prop" :rules="addRules(item)">
                            <el-input event-render="loadText" v-model="form[item.prop]" placeholder="请输入..."
                                type="text" clearable :disabled="!!item.disable">
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11" v-if="item.type == 'select'" :key="idx">
                        <el-form-item :label="item.label" :prop="item.prop" :rules="addRules(item)">
                            <el-select v-model="form[item.prop]" placeholder="请选择..." :loading="false"
                                popper-append-to-body clearable :disabled="!!item.disabled">
                                <el-option :key="optionObj.value" :label="optionObj.text" :value="optionObj.value"
                                    :disabled="!!optionObj.disabled" :tdList="dicListObj['arr'+idx]" v-for="optionObj in dicListObj['arr'+idx]">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>


                    <el-col :span="11" v-if="item.type == 'datePicker'" :key="idx">
                        <el-form-item :label="item.label" :prop="item.prop" :rules="addRules(item)">
                            <el-date-picker v-model="form[item.prop]" :disabled="!!item.disabled" placeholder="请选择..."  type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" clearable >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="22" v-if="item.type == 'textarea'" :key="idx">
                        <el-form-item :label="item.label" :prop="item.prop" :rules="addRules(item)">
                            <el-input event-render="loadText" v-model="form[item.prop]" placeholder="请输入..."
                                type="textarea" clearable :disabled="!!item.disabled" > 
                            </el-input>
                        </el-form-item>
                    </el-col>

                </template>
            </el-row>
            <slot>
                <!-- 内容部分 -->
            </slot>
        </el-form>
        {{form}}

        <el-row style="text-align:center">
            <template v-for="item,idx of buttonsList">
                <el-button type="primary" :key="idx" v-if="item.type == 'save'" :loading="false" @click="saveFunc" >{{item.text}}</el-button>
                <el-button type="primary" :key="idx" v-if="item.type == 'cache'" :loading="false" @click="cacheFunc" >{{item.text}}</el-button>
                <el-button type="primary" :key="idx" v-if="item.type == 'cancel'" :loading="false" @click="cancelFunc" >{{item.text}}</el-button>
                <el-button type="primary" :key="idx" v-if="item.type == 'reset'" :loading="false" @click="resetFunc" >{{item.text}}</el-button>
            </template>
            <slot name="footer">
                <!-- footer插入 -->
            </slot>

        </el-row>
    </div>
</template>


<script type="text/javascript">
/* eslint-disable */
import {Button, Form, FormItem, Row, Col, Input, Select, Option, DatePicker} from "element-ui"
import 'element-ui/lib/theme-chalk/display.css';
export default {
    name:"RenderForm",
    props:{
        templateData:{
            type: Array,
            required: true,
        },
        data:{
            type: Object,
            default: () => {
                return {};
            }
        },
        formDisabled:{
            type: Boolean,
            default: false
        },
        buttonsList:{
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data(){
        return {
            form:{},
            formRules:{

            },
            dicListObj:{
                // 此为字典项存放位置，属性约定为 arr + idx
                arr1:[],
                arr2:[]
            }
        }
    },
    components:{
        "el-button":Button,
        "el-form":Form,
        "el-form-item":FormItem,
        "el-row":Row,
        "el-col":Col,
        "el-input":Input,
        "el-select":Select,
        "el-option":Option,
        "el-date-picker":DatePicker
    },
    watch:{
        data:{
            handler:function(){
                this.getFormItem();
            }
        }
    },
    mounted(){
        // 动态添加 methods 方法  实现字典项的动态添加查询绑定
        // 动态添加data属性
        // 动态添加computed --- 目的使用动态绑定
        // 多个form解包  --- 便于数据动态绑定

        console.log(this.templateData);

        this.getFormItem();
        this.getDicArr();


    },
    methods: {
        saveFunc(){
            this.$refs.form.validate((valide)=>{
                if(valide){
                    this.$emit("save", this.form);
                }else{
                    // 校验不通过
                    this.$emit("save", false);
                }
            })
        },
        cacheFunc(){
            this.$emit("cache", this.form);
        },
        cancelFunc(){
            this.$emit("cancel", this.form);
        },
        resetFunc(){
            this.$emit("reset", this.form);
        },
        getFormItem(){
            // 暂不处理Boolean
            this.templateData.forEach((item)=>{
                // this.form[item.prop] = "";
                this.$set(this.form, item.prop, this.data[item.prop] || "")
            })
        },

        addRules(item){
            let arr = [];
            let type = item.type;
            let rules = item.rules;
            if(Array.isArray(rules) && rules.length > 0){
                arr = arr.concat(rules);
            }

            if(item.required){
                let typeArr = this.addRulesHandler(type);
                arr = arr.concat(typeArr);
            }

            return arr;
        },
        addRulesHandler(type){
            // 规则拼接
            let inputRule = {required:true, message:"必填项", trigger:"blur"};
            let selectRules = {required:true, message:"必选项", trigger:"blur"};
            let datePickerRules = {required:true, message:"必选项", trigger:"blur"};
            // let maxLengthRule = {max:60, message:"不能大于60个字", trigger:"blur"}; // 暂不支持动态传值 建议通过rules传进来
            let map = {
                "input":inputRule,
                "select":selectRules,
                "datePicker":datePickerRules
            }
            return [map[type]];
        },


        getDicArr(){
            // 在data中添加属性
            // 在methods里面增加字典获取方法
            this.templateData.forEach((item,idx)=>{
                if(item.type == "select" && item.dicCode){
                    this.addAttrToDicListObj(item.dicCode, idx);
                }else{
                    // 自带下拉选项
                    return item.list;
                }
            })
        },
        addAttrToDicListObj(dicCode, idx){
            // 给 dicListObj 添加属性
            // 查字典
            this.getOriginDic(dicCode,(data)=>{
                // 设置字典项
                this.$set(this.dicListObj, "arr"+idx, data);
            })
        },
        // 从远程获得字典项
        getOriginDic(dicCode, callback){
            const dicCodeMap = {
                "age_eng":[
                    {value:"1", text:"男"},
                    {value:"2", text:"女"},
                ]
            }
            setTimeout(()=>{
                if(dicCodeMap[dicCode]){
                    callback(dicCodeMap[dicCode]);
                }else{
                    console.error(`字典项：${dicCode}, 未查询到`);
                }
            },1500)
        }
    },
}
</script>

<style lang="less" scoped>
.tabTitle{
    margin-bottom: 15px;
    font-weight: 600;
}
    
</style>