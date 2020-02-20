import Home from '@/module/home/page/home.vue';
import Page_list from '@/module/cms/page/page_list.vue';
import Page_add from '@/module/cms/page/page_add.vue';
import Page_edit from '@/module/cms/page/page_edit.vue';
export default [{
    path: '/',
    component: Home,
    name: 'CMS',//菜单名称
    hidden: false,//是否显示
    // ,
    // redirect: '/home',
    children: [
      {path:'/cms/page/list',name:'页面列表',component: Page_list,hidden:false},
      {path:'/cms/page/add/',name:'新增页面',component: Page_add,hidden:true},
      {path:'/cms/page/edit/:pageId',name:'修改页面',component: Page_edit,hidden:true}
    ]
  }/*,
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  }*/
]