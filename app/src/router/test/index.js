import test from '@/views/home/routerView.vue'

const formTest = ()=>import('@/views/test/RenderFormTest.vue')

export default [
{
   path:'/test',
   component: test,
   children:[
       {
           path:'/test/formTest',
           component:formTest,
           name:'formTest',
           meta:{
            //    auth:'true'
                title:'form列表渲染',
                isLeaf:'true'
           }
       }
    
   ],
   meta:{
       title:'组件测试',
   },
   isPackage:true,
   packageName:"test模块",
}
]