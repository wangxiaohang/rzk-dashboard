Vue.use(VueRouter);

Bmob.initialize("bd871ea12dc290abce3d439aa8cd12aa","5c7a9c2c9b82387a615d8a674e1ebc78");

var sql = {
  addProduct: function(info){
    const query = Bmob.Query('products');
    query.set("name",info.name);
    query.set("img",info.img);
    query.set("price","￥"+info.price+"/天");
    query.set("category",info.category);
    query.set("status",0);
    query.save().then(res => {
      console.log(info.name+"：保存成功");
    }).catch(err => {
      console.log(info.name+"：保存失败");
      console.log(err);
    })
  }
};

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
            dialogProVisible: false,
            newProduct: {
              name: '',
              price: '',
              img: '',
              category: ''
            },
            formLabelWidth: '80px',
            products: [
              {
                id: '0',
                img: '123',
                name: '抱枕',
                price: '￥10/天',
                cate: '热租商品',
                num: '12',
                state: '未租',
                userid: '-'
              }
            ]
          }
        },
        methods: {
          operatePro: function(row,flag){
            console.log(flag);
          },
          addProduct: function(){
            if(this.newProduct.name.length>0 && this.newProduct.price.length>0 && this.newProduct.img.length>0 && this.newProduct.category.length>0){
              var that = this;
              this.getBase64Image(this.newProduct.img,undefined,undefined,function(res){
                if(!res) alert("图片不存在");
                that.newProduct.img = res;
                sql.addProduct(that.newProduct);
                that.dialogProVisible = false;
                that.clearNewProduct();
              });
            }else {
              alert("存在不合法数据，请检查");
              this.dialogProVisible = false;
              this.clearNewProduct();
            };
          },
          getBase64Image: function(imgURL,width,height,fn){
            var img = new Image();
            img.onload = function(){
              fn && fn(imgToBase64());
            };
            img.onerror = function(){
              fn && fn(false);
            };
            img.setAttribute("crossOrigin",'Anonymous');
            img.src=imgURL;

            function imgToBase64(){
              var canvas = document.createElement("canvas"),
                  ctx = canvas.getContext("2d");
              canvas.width = width ? width : img.width;
              canvas.height = height ? height : img.height;
              ctx.drawImage(img,0,0,canvas.width,canvas.height);
              var data = canvas.toDataURL();
              return data;
            };
          },
          clearNewProduct: function(){
            this.newProduct.name = this.newProduct.price = this.newProduct.img = this.newProduct.category = '';
          }
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