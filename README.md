# 平台门户解耦卡片管理业务卡片代码规范

## 1 背景

- 门户解耦以便于不同模块分开部署和售卖；
- 各模块展示的卡片由各组分别开发，属于业务卡片；
- 为统一操作各卡片，减少管理复杂度，需把卡片头部封装至导航栏公共组件中。

## 2 代码规范

1、 各卡片作为插件打包成 JS 文件，渲然为组件使用；

2、 在各模块独立开发的插件代码中引用导航栏的公共组件 ‘platformCardHeader‘ 将卡片头部包裹（包裹范围除去左侧卡片名称）；

3、 增加插件传值，编辑状态，卡片编辑、删除方法等需要信息的传递；

4、开发完成后进行卡片注册。

## 3 示例

下面以通用卡片——“项目历史”为例

### 3.1、卡片样式

​		卡片缩略图上传到嘉为图床 https://image.canwayoa.net/ 注册时的链接选择 ’Image Link‘

​		没有指定就使用默认缩略图 https://static.canwayoa.net/cfc49d8efcc048fab8e309cdfae82049.png

![企业微信截图_16499924075962.png](https://static.canwayoa.net/91f10a0a11c44477ac5ac3786485475c.png)



![企业微信截图_16499930585853.png](https://static.canwayoa.net/32952748c752437fa08fa6616d936441.png)

![企业微信截图_16499931663397.png](https://static.canwayoa.net/da39bd3d51904bdeb015fb97d3cdc8e7.png)



### 3.2、卡片前端代码

​		卡片头部（除去卡片名称以外的操作部分）用<platform-card-header>包裹，无须引用组件，注意事件和状态值的传递

![企业微信截图_16499924985894.png](https://static.canwayoa.net/9509777007714794a336b4d0d3aed5ce.png)

### 3.3、在 src 下的 index.js 文件中注册插件

​		引用插件代码并为渲染后的组件取名为 ’platform-project‘

![企业微信截图_1649992291692.png](https://static.canwayoa.net/e53881de99fd43afba070492c81e78fc.png)

![企业微信截图_16500018454878.png](https://static.canwayoa.net/2372af03e6d74a458be7624f78b37c44.png)



### 3.4、注册卡片

​		前端的卡片开发完后需要整理一个请求注册的 Json ，部署指定模块时由运维执行。

```
curl -X 'POST' \
  'http://192.168.104.104:21966/api/service/card-info/register' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "项目历史",			// 卡片名称，对应头部左侧
  "desc": "展示选中的项目列表",	// 卡片描述
  "module": "CComm",		// 卡片所属模块  CComm（平台基础）,CMeas,CTest,CPack,CCI,CTeam
  "minLength": 3,			//	卡片最小长度，对应管理卡片页面背景的栅格数
  "minWidth": 2,			//	卡片最小宽度，对应管理卡片页面背景的栅格数
  "component": "platform-project",		//	卡片渲染后的组件名称，建议格式为 ‘模块-卡片’ 以防重名
  "contentUrl": "/platform/platform-project.js",		// 插件存放路径
  "imageUrl": "https://static.canwayoa.net/a90ebc0e4fc6401eb952f0e4334e23bc.png"	// 缩略图链接，没有指定则使用默认缩略图
}'
```