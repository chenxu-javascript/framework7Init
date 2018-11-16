<template>
  <f7-page class="page-address">
    <div class="address-list" v-for="(item, index) in addressList" :key="index">
      <div class="address-item">
        <div class="address-header">
          <span>{{ item.consigneeName }}</span>
          <span class="ml20">{{ item.consigneeTelNo }}</span>
        </div>
        <div class="address-body">
          <div class="address-body-detail">
            <span v-html="item.affiliatedArea"></span>
            <span v-html="item.detailAddress"></span>
          </div>
          <div class="address-body-btn">
            <span class="address-body-btn-text">编辑</span>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      addressList: []
    };
  },
  mounted() {
    this.getUrlList();
  },
  methods: {
    async getUrlList() {
      let re = await this.bsGetJSON("/address/list");
      if (re.state) {
        this.addressList = re.data;
      }
    }
  }
};
</script>
<style lang="less">
.page-address.page {
  .page-content {
    background: #fff;
    .address-list {
      padding: 0.4rem 0;
      margin-left: 0.3rem;
      position: relative;
      .hairline(bottom, #ddd);
      .address-item {
        .address-header {
          span {
            display: inline-block;
            color: #1c1e20;
            font-size: 15px;
            line-height: 1.2;
            font-family: PingFangSC-Medium;
            font-weight: 500;
          }
        }
        .address-body {
          margin-top: 4px;
          .flexbox();
          .address-body-detail {
            flex: 1;
            padding-right: 10px;
            font-size: 12px;
            color: #95999d;
            line-height: 1.2;
          }
          .address-body-btn {
            font-size: 12px;
            line-height: 1.5;
            color: #c9ced9;
            .address-body-btn-text {
              padding: 0 10px;
              .hairline(left, #ddd);
              position: relative;
            }
          }
        }
      }
    }
  }
}
</style>
