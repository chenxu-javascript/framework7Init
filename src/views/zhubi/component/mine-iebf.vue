<template>
  <div class="mine-iebf">
    <div class="mine-item-header">
      <div class="mine-header-left">
        <i class="iconfont mine-header-icon icon-shouzhimingxi"></i>
        <span class="mine-header-text">收支汇总</span>
      </div>
    </div>
    <div class="iebf">
      <div class="iebf iebf_left">
        <span class="iebf-num">+ {{ balance.income }}</span>
        <span class="iebf-dec">累计收入</span>
      </div>
      <div class="iebf iebf_right">
        <span class="iebf-num">- {{ balance.expend }}</span>
        <span class="iebf-dec">累计支出</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    balance: {}
  }
};
</script>
<style lang="less" scoped>
.mine-header-icon:before {
  color: #0077ff;
}
</style>

<style lang="less">
.iebf {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  &_left,
  &_right {
    width: 50%;
    height: 1.5rem;
    flex: 1;
    flex-direction: column;
    background: #fff;
    .iebf-num {
      font-size: 0.34rem;
      font-weight: bold;
    }
    .iebf-dec {
      font-size: 0.24rem;
      margin-top: 0.1rem;
      color: #8c8c8c;
    }
  }
  &_left {
    float: left;
  }
  &_right {
    float: right;
  }
  &__btn {
    display: block;
    background: #f9f9f9;
    border: 0;
    color: #888;
    font-size: 0.24rem;
    height: 0.56rem;
    line-height: 0.56rem;
    border-radius: 0;
  }
}
</style>
