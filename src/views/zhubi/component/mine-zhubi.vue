<template>
  <div class="component-mine">
    <div class="mine-zhubi">
      <div class="mine-zhubi__bg"></div>
      <p class="mine-zhubi__remain">{{ balance.balance | tofixed }}</p>
      <p class="mine-zhubi__tip text-center">可用猪币</p>
      <div class="mine-zhubi__content">
        <div class="mine-zhubi__coins">
          <div class="mine-zhubi__coins__remain">
            <p>{{ balance.totalBalance | tofixed }}</p>
            <p>猪币总余额</p>
          </div>
          <div class="mine-zhubi__coins__divider"></div>
          <div class="mine-zhubi__coins__freezed">
            <p>{{ balance.freezeBalance | tofixed }}</p>
            <p>冻结猪币</p>
          </div>
        </div>
        <div>
          <a href="" class="button button-fill mine-zhubi__btn-buy">
            购买猪币
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { tofixed } from "@/utils/filters";
export default {
  props: {
    balance: {}
  },
  data() {
    return {
      couponList: []
    };
  },
  methods: {
    async reqCoupons() {
      let rs = await this.bsGetJSON("/web/volume/queryPageList");
      if (rs.state) {
        this.couponList = rs.list;
      }
    }
  },
  filters: {
    tofixed
  }
};
</script>
<style lang="less">
.component-mine {
  height: 3.86rem;
  overflow: hidden;
  position: relative;
  .mine-zhubi {
    &__remain {
      color: #fff;
      font-size: 28px;
      position: relative;
      text-align: center;
      margin-top: 0.45rem;
      margin-bottom: 0;
      line-height: 1;
    }
    &__tip {
      color: #99cdff;
      font-size: 12px;
      position: relative;
      text-align: center;
      margin-top: 5px;
    }
    &__bg {
      height: 2.96rem;
      width: 100%;
      background: #0083ff;
      position: absolute;
      top: 0;
      left: 0;
      &::after {
        content: "";
        display: block;
        background: url("./../../../assets/images/myzhubi/bg_after.png") center
          no-repeat;
        height: 0.24rem;
        width: 100%;
        position: absolute;
        bottom: -0.24rem;
        background-size: cover;
      }
    }
    &__content {
      position: absolute;
      top: 1.74rem;
      height: 2.1rem;
      background: #fff;
      left: 0.3rem;
      right: 0.3rem;
      border-radius: 5px;
      padding: 0.25rem 0.46rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &__coins {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__remain,
      &__freezed {
        flex: 1;
        line-height: 1;
        p {
          margin: 0;
        }
        p:first-child {
          font-size: 14px;
          color: #333;
        }
        p:last-child {
          font-size: 11px;
          color: #adadad;
          margin-top: 5px;
        }
      }
      &__freezed {
        text-align: right;
      }
      &__divider {
        width: 1px;
        height: 0.56rem;
        background: #e5e5e5;
      }
    }
    &__btn-buy {
      background: #008eff;
      height: 0.74rem;
      font-size: 14px;
      font-weight: bold;
      border-radius: 0;
    }
  }
}
</style>
