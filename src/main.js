Vue.use(VueRouter);

Bmob.initialize("bd871ea12dc290abce3d439aa8cd12aa","5c7a9c2c9b82387a615d8a674e1ebc78");

var temp = {
  products:{}
};
var sql = {
  addingProductFlag: false,
  addProduct: function(info){
    var query = Bmob.Query("products");
    if(sql.addingProductFlag){
      alert("正在添加，请稍后");
      return;
    };
    sql.addingProductFlag = true;
    query.set("name",info.name);
    query.set("img",info.img);
    query.set("price","￥"+info.price+"/天");
    query.set("category",info.category);
    query.set("status",0);
    query.save().then(res => {
      console.log(info.name+"：保存成功");
      sql.addingProductFlag = false;
    }).catch(err => {
      console.log(info.name+"：保存失败");
      console.log(err);
      sql.addingProductFlag = false;
    })
  },
  getProducts: function(fn){
    console.log("开始获取商品数据");
    var query = Bmob.Query("products");
    query.find().then(res => {
      console.log("获取商品数据成功");
      updateTemp(res);
      fn && fn(res);
    });

    function updateTemp(res){
      console.log(res);
      for(var i=0;i<res.length;i++){
        var pro = res[i];
        products[pro.id] = {
          img: pro.img,
          name: pro.name,
          price: pro.price,
          category: pro.category
        };
      }
    }
  },
  getProductDetailOf: function(id,fn){
    var query = Bmob.Query("details");
    query.equalTo("id","===",id);
    query.find().then(function(res){
      console.log(res);
      fn && fn(res);
    }).then(function(err){
      console.log("没有获取到详细信息");
      fn && fn(null);
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
            newProductDetail: {
              des: '',
              email: {
                post:'',
                back:'',
                from:''
              },
              prices: [{
                days: '',
                price: ''
              }],
              cash: '',
              config: [],
              info: [],
              params: [{
                k: '',
                v: ''
              }]
            },
            formLabelWidth: '80px',
            products: null,
          }
        },
        created: function(){
          this.refreshProducts();
        },
        methods: {
          addPrices: function(){
            this.newProductDetail.prices.push({
              days: '',
              price: ''
            })
          },
          addParams: function(){
            this.newProductDetail.params.push({
              k:'',
              v:''
            })
          },
          addConfig: function(){
            this.newProductDetail.config.push('');
          },
          addInfo: function(){
            this.newProductDetail.info.push('');
          },
          operatePro: function(row,flag){
            var that = this;
            switch(flag){
              case 2:
                // 详情
                break;
              case 1:
                // 删除
                break;
              case 0:
                // 编辑
                var price = row.price;
                this.newProduct.name = row.name;
                this.newProduct.price = parseFloat(price.slice(1,price.length-2));
                this.newProduct.img = row.img;
                this.newProduct.category = row.category;
                sql.getProductDetailOf(row.id,function(res){
                  if(res){

                  };
                  that.dialogProVisible = true;
                });
                break;
            }
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
          },
          refreshProducts: function(){
            var that = this;
            this.products = null;
            sql.getProducts(function(res){
              console.log(res);
              that.products = res;
            });
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