<template>
  <div class="cloud-currency">
    USD
    <a-icon class="currency-icon" type="caret-down" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    
  },
})
export default class Currency extends Vue {

}
</script>

<style lang="less">
.cloud-currency {
  margin-right: 20px;
}

.currency-icon {
  position: relative;
  top: -4px;
  margin-left: 3px;
  font-size: 10px;
  color: #000;
}
</style>
