import test from '@/views/home/routerView.vue'

const formTest = ()=>import('@/views/test/RenderFormTest.vue')
const tableTest = ()=>import('@/views/test/RenderTableTest.vue')
const pageTableTest = ()=>import('@/views/test/RenderPageTableTest.vue')


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
       },
       {
        path:'/test/tableTest',
        component:tableTest,
        name:'tableTest',
        meta:{
         //    auth:'true'
             title:'table列表渲染',
             isLeaf:'true'
        }
    },
    {
        path:'/test/pageTableTest',
        component:pageTableTest,
        name:'pageTableTest',
        meta:{
         //    auth:'true'
             title:'table分页列表渲染',
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