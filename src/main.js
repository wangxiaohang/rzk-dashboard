Vue.use(VueRouter);
// 组件
var bannerContent = {template:'<div>banner content</div>'};
var hotsiteContent = {template:'<div>hotsite content</div>'};
var categoryContent = {template:'<div>category content</div>'};
var proinfoContent = {template:'<div>product info content</div>'};
var userContent = {template:'<div>user content</div>'};

var routes = [
  {path: '/', component: bannerContent},//redirect: '/banner'},
  {path: '/banner', component: bannerContent},
  {path: '/hotsite', component: hotsiteContent},
  {path: '/category', component: categoryContent},
  {path: '/proinfo', component: proinfoContent},
  {path: '/user', component: userContent}
]
var router = new VueRouter({
  routes: routes
});

new Vue({
  el: "#app",
  data: function(){
    return {
      menus: [{label: 'banner',path: '/banner'},{label: '名站', path: '/hotsite'},{label: '商品分类', path: '/category'},{label: '商品信息', path: '/proinfo'},{label: '用户', path: '/user'}]
    }
  },
  methods: {
    clickMenu: function(data){
      console.log(data);
    }
  },
  router: router
});