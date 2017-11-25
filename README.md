# web_test

> Vue.js,Koajs,PostgreSQL,Elasticsearch

## 安装与使用
1. 在 Koajs 上使 Elasticsearch 与 PostgreSQL 同步用到了 multicorn 和 pg-es-fdw 扩展，参考[这篇文章](https://yq.aliyun.com/articles/56824)
2. 需要执行一些数据库操作 `run/pg.sql`，建立用户，扩展，函数，触发器，表结构等,很多操作需要手动执行，不能直接运行文件
3. `npm run build`
4. 执行 `node app.js` 查看服务是否正常启动

## 未完成
  * update 触发器未实现，或许插件有问题。目前直接使用 ES API 更新。

## 截图

![image](https://raw.githubusercontent.com/gavin66/web_test/master/doc/5.png)

![image](https://raw.githubusercontent.com/gavin66/web_test/master/doc/1.png)
![image](https://raw.githubusercontent.com/gavin66/web_test/master/doc/2.png)
![image](https://raw.githubusercontent.com/gavin66/web_test/master/doc/3.png)
![image](https://raw.githubusercontent.com/gavin66/web_test/master/doc/4.png)
