<template>
  <f7-page class="page-index">
    <div class="my-coin">
      <mineZhubi :balance="balance"></mineZhubi>
      <div class="my-coin__body">
        <mineIebf :balance="balance" class="my-coin__body__item"></mineIebf>
        <mineCoupon class="my-coin__body__item"></mineCoupon>
        <mineZhubimall></mineZhubimall>
      </div>
      <div class="action_btn">
        <button class="button button-big button-fill active">
          进入猪币商城
        </button>
      </div>
    </div>
  </f7-page>
</template>
<script>
import mineZhubi from "./component/mine-zhubi";
import mineIebf from "./component/mine-iebf";
import mineZhubimall from "./component/mine-zhubimall";
import mineCoupon from "./component/mine-coupon";
export default {
  data() {
    return {
      balance: {}
    };
  },
  //  ,
  components: { mineZhubi, mineIebf, mineCoupon, mineZhubimall },
  created() {
    this.reqRemainds();
  },
  methods: {
    async reqRemainds() {
      let rs = await this.bsGetJSON("/account/balance", {}, "post");
      if (rs.state) {
        this.balance = rs.data;
      }
    }
  }
};
</script>
<style lang="less">
@header-height: 0.64rem;
.page-index.page {
  .page-content {
    background: #f5f5f9;
    .my-coin__body {
      .my-coin__body__item {
        margin-top: 0.2rem;
        position: relative;
      }
      .mine-item-header {
        height: @header-height;
        background: #fff;
        position: relative;
        padding: 0 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        box-sizing: border-box;
        .mine-header-text {
          display: inline-block;
          color: #333;
          //line-height: 14px;
          font-weight: 500;
          padding-top: 4px;
        }
        .mine-header-tips {
          font-size: 12px;
          color: #8c8c8c;
        }
        .mine-header-left,
        .mine-header-center,
        .mine-header-right {
          display: flex;
          height: 100%;
          align-items: center;
        }

        .mine-header-left {
          justify-content: flex-start;
          color: #333;
          line-height: 1.5;
        }
        .mine-header-right {
          justify-content: flex-end;
          * {
            color: #8c8c8c;
          }
        }

        .mine-header-icon {
          width: 16px;
          height: 16px;
          margin-right: 0.2rem;
          color: #ff6f00;
          text-align: center;
          border-radius: 3px;
          font-size: 18px;
          line-height: 1;
        }
        .mine-heder-right__link,
        .icon-arrow-right {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
