## 租用状态码

- 0 未租用
- 1 使用中
- 2 归还中
- 3 出借中

## table: products

- id
- name
- img
- category
- price
- status 租用状态

## table: details
- id 0
- name "abc"
- img "abc"
- category 1
- des "abc" 描述
- email {post:"顺丰到付",back:"不包邮",from:"广东 深圳"} 快递信息
- prices [{days:1,price:"￥15.00/天},{days:7,price:"￥8.00/天}]
- cash "￥150.00" 押金
- config ["标准"] 配置
- info ["img","img"] 商品信息
- params [{k:"",v:""}] 商品参数