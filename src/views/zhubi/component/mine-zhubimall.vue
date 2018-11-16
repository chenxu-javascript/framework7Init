<template>
  <div class="main-zhubimall">
    <div class="mine-item-header">
      <div class="mine-header-left">
        <i
          class="iconfont mine-header-icon icon-chaojidingba-zhubi_zhubishangcheng1"
        ></i>
        <span class="mine-header-text">猪币商城</span>
      </div>
      <div class="mine-header-right">
        <a href="" class="mine-heder-right__link">查看更多</a>
        <i class="iconfont icon-arrow-right"></i>
      </div>
    </div>

    <div class="zhubi-mall">
      <div class="zhubi-mall__main">
        <div
          class="zhubi-mall__item"
          v-for="(shop, index) in shopList"
          :key="index"
        >
          <a href="/zhubi.goods">
            <img :src="shop.coverPicture" />
            <div class="zhubi-mall__title  text-ellipsis">
              {{ shop.goodsName }}
            </div>
            <div
              class="zhubi-mall__desc text-ellipsis"
              v-if="shop.preferentialPrice"
            >
              <span class="zbmall-amount-default"
                >{{ shop.preferentialPrice | tofixed }}
              </span>
              <span class="zbmall-amount-unit">猪币</span>
              <span class="zbmall-item__activity-price">
                {{ shop.defaultAmount | tofixed }}猪币
              </span>
            </div>
            <div class="zhubi-mall__desc text-ellipsis" v-else>
              {{ shop.defaultAmount | tofixed }}
              <span class="zbmall-amount-unit">猪币</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { tofixed } from "@/utils/filters";
export default {
  data() {
    return {
      shopList: []
    };
  },
  mounted() {
    this.reqShopList();
  },
  filters: {
    tofixed
  },
  methods: {
    async reqShopList() {
      let rs = await this.bsGetJSON("/shop/listGoodsByCategoryId", {
        categoryId: 9,
        limit: 4,
        page: 1,
        sort: 2,
        platform: 1
      });
      if (rs.state) {
        this.shopList = rs.list;
      }
    }
  }
};
</script>
<style lang="less">
@color: #fff;
.main-zhubimall {
  .zhubi-mall {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row wrap;
    padding: 0.24rem 0.3rem;
    background: #fff;

    .zhubi-mall__main {
      position: relative;
      width: 100%;
      .zhubi-mall__item {
        width: 50%;
        color: @color;
        text-align: center;
        box-sizing: border-box;
        display: inline-block;
        position: relative;
        padding-bottom: 10px;
        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          border-right: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          box-sizing: border-box;
          width: 200%;
          height: 200%;
          transform: scale(0.5);
          transform-origin: left top;
        }
        img {
          width: 2.6rem;
          height: 2.3rem;
          display: inline-block;
          padding-top: 0.2rem;
          border-radius: 5px;
        }
      }
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        transform: scale(0.5);
        transform-origin: left top;
      }
    }

    &__title {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #333;
      padding: 0 8px;
      line-height: 1.5;
    }
    &__desc {
      line-height: 1;
      margin-top: 2px;
      font-weight: bold;
    }
    .zbmall-amount-default {
      color: #ff1c31;
      font-size: 14px;
    }
    .zbmall-amount-unit {
      font-size: 12px;
      color: #ff1c31;
    }
    .zbmall-item__activity-price {
      text-decoration: line-through;
      color: #999;
      font-size: 10px;
    }
  }
}
</style>
