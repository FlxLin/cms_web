<template>
  <div>
    <!--编写页面静态部分，即view部分-->

    <!--下拉框-->
    <el-select v-model="params.siteId" placeholder="选择站点">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <!-- 页面别名 -->
    <el-input v-model="params.pageAliase" placeholder="页面别名"  style="width: 100px"></el-input>

    <!-- 查询-->
    <el-button type="primary" size="small" v-on:click="query" >查询</el-button>

    <!--新增页面-->
    <router-link class="mui-tab-item" :to="{path:'/cms/page/add/' , query:{
    page: this.params.page,
    siteId: this.params.siteId
     }}" >   
      <el-button type="primary" size="small">新增页面</el-button>
    </router-link>

    <!--数据-->
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="90">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="180">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="220">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="120">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="150">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="340">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="300" >
      </el-table-column>
      <!--编辑-->
      <el-table-column label="操作" width="70">
        <template slot-scope="page">
        <el-button
        size="small"type="text"
        @click="edit(page.row.pageId)">编辑
        </el-button>
      </template>
      </el-table-column>
      <!--删除-->
      <el-table-column label="操作" width="70">
        <template slot-scope="page">

          <el-button
            size="small"type="text"
            @click="del(page.row.pageId)">删除
          </el-button>
        </template>

      </el-table-column>
      <!--页面预览-->
      <el-table-column label="操作" width="100">
        <template slot-scope="page">
          <el-button
            size="small"type="text"
            @click="preview(page.row.pageId)">页面预览
          </el-button>
        </template>
      </el-table-column>
      <!--页面发布-->
      <el-table-column label="操作" width="100">
        <template slot-scope="page">
          <el-button
            size="small"type="text"
            @click="pagePost(page.row.pageId)">页面发布
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="params.size"
        :current-page="params.page"
        @current-change="PageChange"
        style="float: right">
      </el-pagination>


  </div>
</template>
<script>
  import * as cmsApi from "../api/cms.js"
  export default {
    data() {
      return {
        list: [],
        total: 0,
        params: {
          page: 1,
          size: 10,
          pageAliase:"",
          siteId:"",
        }
      }
    },

    methods: {
      query: function () {
        //调用服务端接口，回调then函数，范围结果为res。
        cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
          debugger
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
      },

      PageChange: function (page) {//形参page代表当前页，系统自动传入
        this.params.page = page;
        this.query();
      },

      edit: function (pageId) {
        //打开修改页面
        this.$router.push({
          path: '/cms/page/edit/' + pageId,
          query: {
            page: this.params.page,
            size: this.params.size
          }
        })
      },

      del: function (pageId) {
        this.$confirm('确认删除吗？', '提示', {}).then(() => {
          //删除页面
          cmsApi.page_del(pageId).then((res) => {
            if (res.success) {
              this.$message.success("删除成功")
              this.query()
            } else {
              this.$message.error("删除失败")
            }
          })
        })
      },

      preview: function (pageId) {
        window.open("http://127.0.0.1/cms/preview/" + pageId)
      },

      pagePost: function (pageId) {
        this.$confirm('确认发布该页面吗?', '提示', {}).then(() => {
          cmsApi.page_postPage(pageId).then((res) => {
            if (res.success) {
              console.log('发布页面id=' + pageId);
              this.$message.success('发布成功，请稍后查看结果');
            } else {
              this.$message.error('发布失败');
            }
          });
        }).catch(() => {
        });

      },

    },

    created() {
      //vue实例创建完，调用
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      this.params.siteId = this.$route.query.siteId || "";
    },

    mounted() {
      //页面渲染完成，调用query（）
      this.query();
      this.options = [{
        label:"门户主站",
        value:"5a751fab6abb5044e0d19ea1"
      }]
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
