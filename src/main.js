Vue.use(VueRouter);

var router = new VueRouter({
  routes: [
    {
      path: '/', 
      redirect: '/banner'
    },
    {
      path: '/banner', 
      component: {
        template:'#banner'
      }
    },
    {
      path: '/hotsite', 
      component: {
        template:'#hotsite'
      }
    },
    {
      path: '/category',
      component: {
        template:'#category'
      }
    },
    {
      path: '/proinfo', 
      component: {
        template:'#proinfo',
        data: function(){
          return {
            addProduct: false,
            poperWidth: '120px',
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            }

          }
        },
        methods: {
        }
      }
    },
    {
      path: '/user', 
      component: {
        template:'#user'
      }
    }
  ]
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