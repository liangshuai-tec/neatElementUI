
 /* eslint-disable */

 if (process.env.NODE_ENV !== 'production') {
  // 引入mockjs 同步方式引入
  const Mock = require('mockjs');

  // 设置Mock.mock() 的延迟时间
  Mock.setup({
      timeout:800
  })


  // DPD（数据占位符定义规范）
  const datas=Mock.mock({
      'empList|0-10':[{
          'name':'@name',//标准英文名
          'cname':'@cname',//标准中文名
          'salary':'@float',//任意小数
          'gender':'@boolean',//任意布尔
          'sex|1-2':2,
          'birth':'@date',//任意日期
          'mypic':'@image',//任意图片
          'title':'@ctitle(3-10)',//任意中文标题(3-10个汉字)
          'email':'@email',
          'area':'@region',//任意区域
          'address':'@county(true)'//任意地址       
      }]
  })


  // 使用拦截规则拦截命中的请求
  // mock( url, post/get, 返回的数据);
  Mock.mock("/api/users/pageTable", ()=>{
      return {code: 0,
        msg: 'mock测试',
        data: datas.empList,
        total: 100
        // total: datas.empList.length > 10 ? 30 : datas.empList.length
      }
  });



  // module.exports = {
  //     devServer: {
  //       // app, server, compiler
  //       before(app, server, compiler) {
  //         app.get('/api/userInfo', (req, res) => {
  //           res.json('响应体')
  //         })
  //       }
  //     }
  //   }  

}
