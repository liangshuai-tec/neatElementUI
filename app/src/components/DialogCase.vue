<template>

    <!-- 用法示例 -->
    <!-- 
        show: Boolean  true  false
        注意 sync 不能少   设置为同步

        <dialog-case
        :show.sync="show"
        @close="show=false"
        ></dialog-case>





     -->


    <el-dialog :visible.sync="dialogShow" title="dialog弹窗模板" v-dialogDrag :modal-append-to-body="true"
        width="60%" center append-to-body
        :lock-scroll="true" :dialogShow-close="true"
        :close-on-click-modal="true"
        :close-on-press-escape="true"
        @before-close="beforeClose"
        @open="beforeOpen">

        <el-form :model="form" :rules="rules" label-width="100px" 
            label-suffix=":">

        </el-form>
    </el-dialog>
    
</template>

<script>
import {Col, Table, TableColumn, Form, FormItem, Card, Dialog, Button} from "element-ui"
export default {
    name:"DialogCase",
    props:{
        show:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dialogShow: false,
            currNode: null, // el-tree 用
            form:{
                username:"",
                age:""
            },
            rules:{
            },
        }
    },
    watch:{
        dialogShow: function(newValue, oldValue){
            // update:show  
            // .sync是vue中用于实现简单的“双向绑定”的语法糖.
            this.$emit("update:show", newValue);
        },
        show:function(newValue, oldValue){
            this.dialogShow = newValue;
        }
    },
    components:{
        'el-col':Col,
        'el-table':Table,
        'el-table-column':TableColumn,
        'el-form':Form,
        'el-form-item':FormItem,
        'el-card':Card,
        'el-dialog':Dialog,
        'el-button':Button
    },
    methods:{
        beforeClose(){
            this.$emit("close")
        },
        beforeOpen(){
            this.form.username = "";
            this.form.age = "";
            // 清除校验项
        },
        cacelFun(){
            this.dialogShow = false;
        },
        closeAndResetTree(tree){
            this.dialogShow = false;
            var node = this.$refs[tree].getCurrentNode();
            if(node){
                this.$refs[tree].store.setCurrentNodeKey(null);
            }
            this.currNode = null;
        },



        

    }
    
}
</script>