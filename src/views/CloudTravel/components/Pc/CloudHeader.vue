<template>
  <section class="cloud-header cloud-travel-content cloud-flex-box">
    <!-- Logo -->
    <div class="cloud-logo-box">
      <img class="cloud-logo" :src="logo" />
    </div>
    <!-- Panel -->
    <div v-if="isPc" class="cloud-flex-box cloud-header-right">
        <language />
        <currency />
        <span role="button" class="cloud-account">
          My Account
        </span>
        <span role="button">
          Log out
        </span>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Language from './Language.vue';
import Currency from './Currency.vue';
import Logo from '@assets/cloudtravel-logo.jpeg';

const CloudTravaleModule = namespace('cloudTravel');

@Component({
  components: {
    Language,
    Currency
  },
})
export default class CloudHeader extends Vue {
  @CloudTravaleModule.Getter('isPc') isPc!: boolean

  logo = Logo
}
</script>

<style lang="less">
.cloud-header {
  height: 60px;
    min-width: 1210px;

  .cloud-logo-box {
    flex: 1;
  }

  .cloud-logo {
    margin-left: 32px;
    width: 228px;
    height: 35px;
  }

  .cloud-account {
    margin-right: 20px;
  }

  .cloud-header-right {
    font-size: 16px;
    color: #000;
  }
}
</style>