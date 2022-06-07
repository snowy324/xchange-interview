<template>
    <div class="cloud-search-m">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.8564 14.5735L11.1375 10.6129C12.0937 9.449 12.6176 7.98455 12.6176 6.45999C12.6176 2.89801 9.78739 0 6.30878 0C2.83017 0 0 2.89801 0 6.45999C0 10.022 2.83017 12.92 6.30878 12.92C7.6147 12.92 8.85917 12.5167 9.92316 11.751L13.6703 15.7416C13.8269 15.9082 14.0376 16 14.2633 16C14.477 16 14.6797 15.9166 14.8336 15.7649C15.1606 15.4428 15.171 14.9085 14.8564 14.5735ZM6.30878 1.68522C8.88002 1.68522 10.9718 3.82712 10.9718 6.45999C10.9718 9.09286 8.88002 11.2348 6.30878 11.2348C3.73754 11.2348 1.64577 9.09286 1.64577 6.45999C1.64577 3.82712 3.73754 1.68522 6.30878 1.68522Z" fill="#757575"/>
      </svg>
      <div @click="goToSearchPage" class="search-details-m">
        <div class="location-m">
          {{location || 'Singapore'}}
        </div>
        <div>
          <span class="search-date-m">
            Aug 18 - Aug 19
          </span>
          <span class="search-guest-m">
            2 adults, 1 room, 0 children
          </span>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const CloudTravaleModule = namespace('cloudTravel');

@Component
export default class CloudSearchm extends Vue {
  @CloudTravaleModule.State('searchLocation') location !: string

  goToSearchPage(): void {
    this.$router.push('searchm');
  }
}
</script>

<style lang="less">
.cloud-search-m {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 15px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.search-details-m {
  margin-left: 14px;
}

.location-m {
  text-align: left;
  font-size: 14px;
  color: #000;
}

.search-date-m {
  font-size: 12px;
  color: #333;
}

.search-guest-m {
  font-size: 12px;
  color: #333;
  margin-left: 20px;
}
</style>