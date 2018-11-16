<template>
  <f7-page class="page-address-edit">
    <f7-list inline-labels no-hairlines no-hairlines-md>
      <f7-list-item>
        <f7-label>收货人</f7-label>
        <f7-input
          type="text"
          placeholder="请输入收货人姓名"
          :value="searchForm.consigneeName"
        ></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>手机号码</f7-label>
        <f7-input
          type="text"
          placeholder="请输入手机号码"
          :value="searchForm.consigneeTelNo"
        ></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>省市地区</f7-label>
        <f7-input
          type="text"
          placeholder="请点击选择"
          :value="searchForm.consigneeTelNo"
        ></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>详细地址</f7-label>
        <f7-input
          type="textarea"
          placeholder="请输入详细地址(5-120个字符)"
          :value="searchForm.detailAddress"
        ></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>设置默认地址</f7-label>
        <f7-toggle
          :checked="searchForm.defaultm"
          class="addreess-default-toggle"
          @change="changeToggle"
        ></f7-toggle>
      </f7-list-item>
    </f7-list>

    <div class="action_btn">
      <button class="button button-big button-fill active">保 存</button>
    </div>
  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        consigneeName: "",
        consigneeTelNo: "",
        detailAddress: "",
        defaultm: true
      }
    };
  },
  methods: {
    changeToggle() {
      this.searchForm.defaultm = !this.searchForm.defaultm;
    }
  }
};
</script>
<style lang="less">
.page-address-edit.page {
  .page-content {
    background: #fff;
    .list {
      margin: 0;
      .item-content {
        .item-inner {
          padding: 0.4rem 0;
          &::after {
            background-color: #eee;
          }
          .item-title {
            font-size: 14px;
            color: #1c1e20;
            &.item-label {
              width: 28%;
            }
          }
          .item-input-wrap input,
          .item-input-wrap textarea {
            font-size: 14px;
            padding-right: 5px;
            &::-webkit-input-placeholder {
              color: #c9ced9;
            }
          }
          .addreess-default-toggle.toggle {
            height: 26px;
            margin-right: 10px;
            input[type="checkbox"]:checked + .toggle-icon:after {
              transform: translateX(26px);
            }
            .toggle-icon {
              height: 26px;
              background: #0088ff;
              &::before {
                height: 22px;
              }
              &::after {
                height: 22px;
                width: 22px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
