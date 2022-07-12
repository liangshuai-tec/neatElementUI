<template>
    <div :class="{renderTable:true,singleSelection:!multiple}">
<!-- 
    组件使用说明：
    接受参数：
        templateData  表头
        data 表格数据展示
        multiple: 是否多选
        type： 
            selection  index  expand
 -->
        <el-table ref="table" :data="data.data" v-on="$listeners" v-bind="$attrs" @selection-change="selectionChangeFunc">
            <template v-for="item, idx of templateData">
                <el-table-column :key="idx" v-if="item.dicCode" :type="item.type" :label="item.label" :prop="item.prop" align="center" header-align="center"
                :filter-multiple="true">
                    <template slot-scope="scope">
                        {{ scope.row[item.prop] | transferDic(dicListObj['arr'+idx]) }}
                    </template>
                </el-table-column>
                <el-table-column :key="idx" v-else :type="item.type" :label="item.label" :prop="item.prop" align="center" header-align="center"
                :filter-multiple="true"></el-table-column>
            </template>
        </el-table>

        
        <!-- 分页 -->
        <el-pagination v-on="$listeners" v-bind="$attrs" style="padding-top:15px;"
        @size-change="handleSizeChangeFunc"
        @current-change="handleCurrentChangeFunc"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="100"

        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total">
        </el-pagination>

    </div>
</template>


<script type="text/javascript">
/* eslint-disable */
import {Button, Form, FormItem, Row, Col, Input, Select, Option, DatePicker, Table, TableColumn, Pagination} from "element-ui"
// import 'element-ui/lib/theme-chalk/display.css';
export default {
    name:"RenderPageTable",
    props:{
        templateData:{
            type: Array,
            required: true,
        },
        data:{
            validator: function (val) {
               // 包含三个属性  table数据列表 data  分页器的total等需要动态变动的信息
               if(val.hasOwnProperty("data") && val.hasOwnProperty("total") && Array.isArray(val.data)){
                   return true;
               }
                return false;
            }
        },
        multiple:{
            type: Boolean,
            required: false,
            default: false
        },
        // total:{
        //     type:[String,Number],
        //     default: 0
        // },
        // 默认展示第一页
        currentPage:{
            type:[String,Number],
            default: 1
        }
    },
    data(){
        return {
            form:{},
            formRules:{

            },
            dicListObj:{
                // 此为字典项存放位置，属性约定为 arr + idx
                arr0:[],
                arr1:[],
                arr2:[]
            },
            limit:0,
            offset:10,
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
        "el-date-picker":DatePicker,
        "el-table":Table,
        "el-table-column":TableColumn,
        "el-pagination":Pagination,
    },
    watch:{
        data:{
            handler:function(){
                // this.getFormItem();
            },
            immediate: true
        }
    },
    created(){
        // this.getDicArr();
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
    filters:{
        transferDic(value, referArr){
            let val = value;
            // filters 走了几次，referArr变化时，filters会不会自动调用
            if(Array.isArray(referArr) && referArr.length > 0){
                // 注意字典项的key
                val = (referArr.find(obj=>obj.value==value) || {}).text || value;
            }else{
                 console.log(222);
            }
            return val;
        }
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
        // cacheFunc(){
        //     this.$emit("cache", this.form);
        // },
        // cancelFunc(){
        //     this.$emit("cancel", this.form);
        // },
        // resetFunc(){
        //     this.$emit("reset", this.form);
        // },
        handleSizeChangeFunc(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChangeFunc(val) {
            console.log(`当前页: ${val}`);
        },
        selectionChangeFunc(selection){
            if(!this.multiple){
                // 单选处理
                this.selectionSingleChangeFunc(selection);
            }
        },
        selectionSingleChangeFunc(selection){
            if(selection.length > 1){
                // 单选的时候会多次触发"selection-change"事件
                this.$refs.table.clearSelection();
                this.$refs.table.toggleRowSelection(selection.pop());
            }
        },
        // 不需要了  通过 $listeners 绑定事件
        // selectionMultipleChangeFunc(selection){
        //     this.$emit("selection-change",selection);
        // },

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
                if(item.dicCode){
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
                "sex_eng":[
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
        },
        initStyle(){
            // 初始化数据


        },
        
    },
}
</script>

<style lang="less" scoped>
.tabTitle{
    margin-bottom: 15px;
    font-weight: 600;
}

.singleSelection /deep/thead .el-checkbox{
    display: none !important;
}

.singleSelection /deep/.el-table th.gutter{
    display: table-cell !important;
}

.singleSelection /deep/.el-table .el-checkbox__inner{
    border-radius: 50%;
}
    
</style>