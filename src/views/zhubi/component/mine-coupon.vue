<template>
  <div class="mine-coupon">
    <div class="mine-item-header">
      <div class="mine-header-left">
        <i class="iconfont mine-header-icon icon-chaojidingba-zhubi_daijinquan">
        </i>
        <span class="mine-header-text">
          猪币代金券
          <span class="mine-header-tips">{{ nValidities || 0 }}张可用</span>
        </span>
      </div>
      <div class="mine-header-center"></div>
      <div class="mine-header-right">
        <a href="/zhubi.coupons" class="mine-heder-right__link">更多</a>
        <i class="iconfont icon-arrow-right"></i>
      </div>
    </div>

    <div class="zhubi-coupon">
      <div v-for="(item, index) in validityCoupons" :key="index">
        <conponChildren :coupon="item"></conponChildren>
      </div>
      <div v-if="validityCoupons.length === 0" class="zhubi-coupon__nocoupon">
        暂无可用代金券
      </div>
    </div>
  </div>
</template>
<script>
import conponChildren from "./conpon-children";
export default {
  data() {
    return {
      nValidities: ""
    };
  },
  components: { conponChildren },
  created() {
    this.reqCoupons();
    this.reqCouponCounts();
  },
  mounted() {
    this.reqShopList();
  },
  computed: {
    validityCoupons() {
      let couponList = this.couponList || [];
      return couponList.filter(el => el.status == 1);
    }
  },
  methods: {
    async reqShopList(params) {
      let data = { page: 1, limit: 4, ...params };
      if (data.park) {
        let rs = await this.bsGetJSON("/shop/listGoods', data, 'post");
        if (rs.state) {
          this.shopList = rs.list;
        }
      }
    },
    async reqCouponCounts(volumeStatus = 1) {
      let rs = await this.bsGetJSON("/web/volume/countVolume", {
        volumeStatus
      });
      if (rs.state) {
        this.nValidities = rs.data;
      }
    },
    async reqCoupons() {
      let rs = await this.bsGetJSON("/web/volume/queryPageList");
      if (rs.state) {
        this.couponList = rs.list;
      }
    }
  }
};
</script>
<style lang="less">
@color: #fff;
.mine-coupon {
  .zhubi-coupon {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.24rem 0.3rem 0.1rem;
    color: @color;
    background: #fff;
    overflow-x: auto;
    flex-wrap: nowrap;

    &__title,
    &__desc {
      font-size: 0.3rem;
      line-height: 0.3rem;
    }
    &__desc {
      margin-top: 0.1rem;
      font-weight: bold;
    }
    &__nocoupon {
      background: url(./../../../assets/images/coupons/coupon_empty.png) center
        no-repeat;
      background-size: contain;
      width: 3.63rem;
      height: 1.22rem;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #8c8c8c;
      margin: auto;
      margin-bottom: 0.14rem;
    }
  }
}
</style>
