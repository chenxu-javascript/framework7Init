<template>
  <div class="coupon">
    <div class="coupon__coin">{{ coupon.volumeValue }}</div>
    <div class="coupon__type">猪币代金券</div>
    <div class="coupon__usage">{{ coupon.volumeName }}</div>
  </div>
</template>
<script>
export default {
  props: {
    coupon: {}
  }
};
</script>
