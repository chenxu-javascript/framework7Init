<template>
  <f7-page class="page-order" infinite :infinite-preloader="!showMore" @infinite="loadMore">
    <div class="tabs-switch">
      <div class="query-type" :class="{ active: item.id == orderStatus }" v-for="(item, index) in status" :key="index">
        <span class="query-type-text" @click="changeTabs(item.id);">{{ item.name }}
        </span>
      </div>
    </div>
    <div class="order-main">
      <div class="item-list-order" v-for="(item, index) in listData" :key="index">
        <div class="item-list-order-header">
          <span>{{ item.createTime | dataFormat }}</span>
          <span class="order-status"> {{ item.status | statusText }} </span>
        </div>
        <div class="item-list-order-main">
          <div class="order-goods-img">
            <img :src="item.goodsDtoList[0].coverPicture" alt="商品图片" />
          </div>
          <div class="order-goods-title">
            <div class="order-goods-title-name">
              {{ item.goodsDtoList[0].goodsName }}
            </div>
            <span class="order-goods-title-catergory">{{ item.goodsDtoList[0].categoryText }}
            </span>
          </div>
          <div class="order-goods-coin">
            <div class="order-goods-coin-price">
              {{ item.goodsDtoList[0].itemPrice }}猪币
            </div>
            <div>x {{ item.goodsDtoList[0].num }}</div>
          </div>
        </div>
        <div class="item-list-order-info">
          共{{ item.goodsDtoList[0].num }}件商品 合计:
          <span class="order-number"> {{ item.amount | tofixed }} </span>猪币
        </div>

        <div class="order-good-btn">
          <button class="button col button  button-round" v-if="item.status == 3 || item.status == 4">
            查看物流
          </button>
          <button class="button col button  button-round color-red" v-if="item.status == 3 || item.status == 4" @click="reward(item, index);">
            确认收货
          </button>
          <button class="button col button  button-round color-red" v-if="item.status == 1">
            付款
          </button>
        </div>
      </div>

      <div class="h90 no-more" v-if="showMore">
        <div class="no-data-list-tips all-center ">--暂无更多订单--</div>
      </div>
    </div>
  </f7-page>
</template>
<script>
const status = [
  { name: "所有订单", id: "" },
  { name: "待付款", id: "1" },
  { name: "待发货", id: "2" },
  { name: "待收货", id: "3" }
];
export default {
  data() {
    return {
      status,
      orderStatus: "",
      pagebar: {
        page: 1,
        limit: 20
      },
      listData: [],
      allowInfinite: true,
      showPreloader: true
    };
  },
  watch: {
    orderStatus: async function() {
      this.listData = await this.getList();
    }
  },
  filters: {
    statusText(status) {
      switch (Number(status)) {
        case 1:
          return "待付款";
        case 2:
          return "待发货";
        case 3:
          return "待收货";
        case 4:
          return "已完成";
        case 5:
          return "交易关闭";
        case 6:
          return "退款中";
        case 7:
          return "已退款";
        default:
          return "状态错误";
      }
    }
  },
  async mounted() {
    let re = await this.getList();
    this.listData = re;
  },
  computed: {
    showMore() {
      let pagebar = this.pagebar;
      if (pagebar.total == undefined) return false;
      let s = pagebar.total > pagebar.limit * pagebar.page;
      return !s;
    }
  },
  methods: {
    async reward(params, index) {
      let { goodsDtoList, orderId } = params;
      await this.$bsConfirm("请确认您已收到货物", { title: "确认收货" });
      let goodsInId = goodsDtoList[0].goodsInId;
      let re = await this.bsGetJSON(
        "/order/confirmReceipt",
        {
          goodsInId,
          orderId
        },
        "post",
        true
      );
      if (re.state) {
        this.$bsToast("操作成功");
        this.$set(this.listData, index, re.data);
      }
    },
    async loadMore() {
      if (!this.allowInfinite || this.showMore) return;
      this.allowInfinite = false;
      await this.$bsWait(200);
      this.pagebar.page++;
      let re = await this.getList();
      this.allowInfinite = true;
      this.listData = this.listData.concat(re);
    },
    changeTabs(id) {
      this.pagebar.page = 1;
      this.pagebar.total = undefined;
      this.listData = [];
      this.orderStatus = id;
    },
    async getList() {
      let params = Object.assign({}, this.pagebar, {
        orderStatus: this.orderStatus
      });
      let re = await this.bsGetJSON("/order/list", params);
      if (re.state) {
        re.list = re.list.map(o => {
          o.goodsDtoList = o.goodsDtoList.map(l => {
            l.categoryText = JSON.parse(l.category)
              .map(m => m.name)
              .join("-");
            l.itemPrice = (l.amount / l.num).toFixed(2);
            return l;
          });
          return o;
        });
        this.pagebar = re.pagebar;
        return re.list;
      }
    }
  }
};
</script>
<style lang="less">
.page-order.page {
  .page-content {
    background: #f4f6f7;
    font-family: PingFang SC;
    .tabs-switch {
      .flexbox();
      position: fixed;
      z-index: 99;
      left: 0;
      top: 0;
      right: 0;
      padding: 0 0.3rem;
      background: #fff;
      justify-content: space-around;
      align-items: center;
      height: 44px;
      .query-type {
        text-align: center;
        .flexbox();
        padding-bottom: 0;
        flex-direction: column;
        border-bottom: 3px solid transparent;
        white-space: nowrap;
        width: auto;
        padding-top: 4px;
        height: 100%;
        align-items: center;
        justify-content: space-around;
        overflow: visible;
        font-size: 14px;
        line-height: 1;
        &.active {
          border-bottom: 3px solid #0088ff;
          color: #0088ff;
        }
      }
    }
    .order-main {
      padding-top: 44px;
      overflow: hidden;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      .no-more {
        position: relative;
        .no-data-list-tips {
          color: #caced8;
          font-size: 12px;
        }
      }
      .item-list-order {
        margin-top: 0.14rem;
        background: #fff;
        border-radius: 8px;
        padding: 0 0.3rem;
        .item-list-order-header {
          height: 36px;
          .flexbox();
          align-items: center;
          font-size: 14px;
          justify-content: space-between;
          .order-status {
            color: #ff1c31;
          }
        }
        .item-list-order-main {
          .flexbox();
          .order-goods-img {
            width: 1.6rem;
            height: 1.6rem;
            img {
              width: 100%;
              height: 100%;
              display: inline-block;
            }
          }
          .order-goods-title {
            flex: 1;
            padding: 0 0.26rem;
            .order-goods-title-name {
              font-weight: bold;
              font-size: 0.32rem;
              line-height: 0.44rem;
            }
            .order-goods-title-catergory {
              color: #96999d;
              font-size: 12px;
              line-height: 1.5;
              display: inline-block;
              padding-top: 5px;
            }
          }
          .order-goods-coin {
            text-align: right;
            .order-goods-coin-price {
              font-size: 0.24rem;
              line-height: 0.32rem;
              padding: 0.06rem 0;
            }
          }
        }
        .item-list-order-info {
          text-align: right;
          font-size: 14px;
          line-height: 1.5;
          color: #1c1e20;
          span {
            color: #333;
            font-weight: 500;
          }
        }
        .order-good-btn {
          padding-top: 0.2rem;
          text-align: right;
          button {
            width: 1.8rem;
            margin-bottom: 0.2rem;
            height: 32px;
            line-height: 30px;
            border-radius: 32px;
            display: inline-block;
            margin-left: 8px;
            color: #1c1e20;
            border-color: #1c1e20;
            &.color-red {
              color: #ff1c31;
              border-color: #ff1c31;
            }
          }
        }
      }
    }
  }
}
</style>
