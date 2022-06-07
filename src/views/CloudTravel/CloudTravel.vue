<template>
  <div>
    <template v-if="isPc">
      <cloud-header />
      <cloud-search :class="{'is_fixed' : isFixed}" />
      <div :class="{'fixed-main': isFixed}">
        <div class="cloud-main-box">
          <div class="cloud-main cloud-travel-content">
            <cloud-filter />
            <cloud-loading v-if="searchLoading && !searchError" />
            <cloud-body v-if="!searchLoading && !searchError" />
            <cloud-error v-if="!searchLoading && searchError" />
          </div>
        </div>
        <cloud-footer />
      </div>
    </template>
    <template v-else>
      <cloud-header-mobile />
      <cloud-search-mobile />
      <cloud-sorter-filter-mobile />
      <div class="cloud-travel-content-m">
        <cloud-loading-mobile v-if="searchLoading && !searchError" />
        <cloud-body-mobile v-if="!searchLoading && !searchError" />
        <cloud-error-mobile v-if="!searchLoading && searchError" />
      </div>
      <cloud-footer-mobile />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import CloudHeader from '@pc/CloudHeader.vue';
import CloudSearch from '@pc/CloudSearch.vue';
import CloudFilter from '@pc/CloudFilter.vue';
import CloudBody from '@pc/CloudBody.vue';
import CloudLoading from '@pc/CloudLoading.vue';
import CloudError from '@pc/CloudError.vue';
import CloudFooter from '@pc/CloudFooter.vue';
import CloudHeaderMobile from '@mobile/CloudHeaderMobile.vue';
import CloudSearchMobile from '@mobile/CloudSearchMobile.vue';
import CloudSorterFilterMobile from '@mobile/CloudSorterFilterMobile.vue';
import CloudBodyMobile from '@mobile/CloudBodyMobile.vue';
import CloudFooterMobile from '@mobile/CloudFooterMobile.vue';
import CloudErrorMobile from '@mobile/CloudErrorMobile.vue';
import CloudLoadingMobile from '@mobile/CloudLoadingMobile.vue';

const CloudTravaleModule = namespace('cloudTravel');

@Component({
  components: {
    CloudHeader,
    CloudSearch,
    CloudFilter,
    CloudBody,
    CloudLoading,
    CloudError,
    CloudFooter,
    CloudHeaderMobile,
    CloudSearchMobile,
    CloudSorterFilterMobile,
    CloudBodyMobile,
    CloudFooterMobile,
    CloudErrorMobile,
    CloudLoadingMobile
  },
})
export default class CloudTravel extends Vue {
  @CloudTravaleModule.State('searchLoading') searchLoading!: boolean
  @CloudTravaleModule.State('searchError') searchError!: boolean
  @CloudTravaleModule.Getter('isPc') isPc!: boolean

  isFixed = false;
  offsetTop = 0;

  initHeight(): void {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    this.isFixed = scrollTop > 60 ? true : false;
  }

  mounted() {
    window.addEventListener('scroll', this.initHeight);
    this.$nextTick(() => {
      this.offsetTop = (document.querySelector('#boxFixed') as HTMLElement)?.offsetTop;
    });
  }

  destroyed() {
      window.removeEventListener('scroll', this.initHeight);
  }
}
</script>

<style lang="less">
.cloud-main-box {
  background-color: #E5E5E5;
  /* px-to-viewport-ignore-next */
  padding: 15px 0;

  .cloud-main {
    display: flex;
  }
}

.is_fixed{
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
}

.fixed-main {
  position: relative;
  /* px-to-viewport-ignore-next */
  top: 60px;
}

.cloud-travel-content-m {
  background-color: #E5E5E5;
  min-height: calc(100vh - 240px);
}
</style>
