<template>
  <div class="cloud-search">
    <div class="cloud-travel-content cloud-flex-box cloud-search-content">
      <!-- search by location -->
      <div class="search-location">
        <div class="search-icon">
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.73185 12.8287C8.1551 12.8284 9.53733 12.352 10.6585 11.4753L14.1833 15L15.3171 13.8663L11.7923 10.3416C12.6695 9.22038 13.1462 7.83791 13.1466 6.41437C13.1466 2.87765 10.2688 0 6.73185 0C3.19494 0 0.317139 2.87765 0.317139 6.41437C0.317139 9.95109 3.19494 12.8287 6.73185 12.8287ZM6.73185 1.60359C9.38513 1.60359 11.5429 3.76123 11.5429 6.41437C11.5429 9.06751 9.38513 11.2251 6.73185 11.2251C4.07856 11.2251 1.92082 9.06751 1.92082 6.41437C1.92082 3.76123 4.07856 1.60359 6.73185 1.60359Z" fill="#757575"/>
          </svg>
        </div>
        <b-form-input class="cloud-header-input" @blur="updatePostionFocusState(false)" @focus="updatePostionFocusState(true)" v-model="location"></b-form-input>
        <ul :class="{'hide-suggestions': !locationIsOnFoucs}" class="search-suggestions">
          <li @click="clickSuggestion(suggestion)" v-for="suggestion in searchSuggestions" :key="suggestion.cityCode">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 3.5C6.44374 3.5 5.89997 3.66495 5.43746 3.97399C4.97495 4.28303 4.61446 4.72229 4.40159 5.2362C4.18872 5.75012 4.13302 6.31562 4.24154 6.86119C4.35006 7.40676 4.61793 7.9079 5.01126 8.30124C5.4046 8.69457 5.90574 8.96244 6.45131 9.07096C6.99688 9.17948 7.56238 9.12378 8.0763 8.91091C8.59021 8.69804 9.02947 8.33755 9.33851 7.87504C9.64755 7.41253 9.8125 6.86876 9.8125 6.3125C9.81164 5.56684 9.51505 4.85197 8.98779 4.32471C8.46053 3.79745 7.74566 3.50086 7 3.5ZM7 8C6.66624 8 6.33998 7.90103 6.06248 7.7156C5.78497 7.53018 5.56868 7.26663 5.44095 6.95828C5.31323 6.64993 5.27981 6.31063 5.34492 5.98328C5.41004 5.65594 5.57076 5.35526 5.80676 5.11926C6.04276 4.88326 6.34344 4.72254 6.67078 4.65742C6.99813 4.59231 7.33743 4.62573 7.64578 4.75345C7.95413 4.88118 8.21768 5.09747 8.40311 5.37498C8.58853 5.65248 8.6875 5.97874 8.6875 6.3125C8.687 6.7599 8.50905 7.18883 8.19269 7.50519C7.87633 7.82155 7.4474 7.9995 7 8ZM7 0.125C5.35954 0.126861 3.78681 0.779354 2.62683 1.93933C1.46685 3.09931 0.814361 4.67204 0.8125 6.3125C0.8125 8.52003 1.83273 10.8602 3.76302 13.0801C4.63166 14.0831 5.60912 14.9864 6.67741 15.7733C6.77196 15.8395 6.88458 15.875 7 15.875C7.11542 15.875 7.22804 15.8395 7.32259 15.7733C8.39088 14.9864 9.36834 14.0831 10.237 13.0801C12.1672 10.8602 13.1875 8.5201 13.1875 6.3125C13.1856 4.67204 12.5331 3.09931 11.3732 1.93933C10.2132 0.779354 8.64046 0.126861 7 0.125ZM7 14.608C5.83752 13.6962 1.9375 10.3366 1.9375 6.3125C1.9375 4.96984 2.47087 3.68217 3.42027 2.73277C4.36967 1.78337 5.65734 1.25 7 1.25C8.34266 1.25 9.63032 1.78337 10.5797 2.73277C11.5291 3.68217 12.0625 4.96984 12.0625 6.3125C12.0625 10.3366 8.16227 13.6964 7 14.608Z" fill="#757575"/>
            </svg>
            {{ suggestion.label }}
          </li>
        </ul>
      </div>
      <!-- search by date -->
      <div class="search-date">
        <div class="search-icon">
          <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 1.35H12.5V0.15C12.5 0.0675 12.425 0 12.3333 0H11.1667C11.075 0 11 0.0675 11 0.15V1.35H5.66667V0.15C5.66667 0.0675 5.59167 0 5.5 0H4.33333C4.24167 0 4.16667 0.0675 4.16667 0.15V1.35H0.666667C0.297917 1.35 0 1.61813 0 1.95V14.4C0 14.7319 0.297917 15 0.666667 15H16C16.3687 15 16.6667 14.7319 16.6667 14.4V1.95C16.6667 1.61813 16.3687 1.35 16 1.35ZM15.1667 13.65H1.5V6.525H15.1667V13.65ZM1.5 5.25V2.7H4.16667V3.6C4.16667 3.6825 4.24167 3.75 4.33333 3.75H5.5C5.59167 3.75 5.66667 3.6825 5.66667 3.6V2.7H11V3.6C11 3.6825 11.075 3.75 11.1667 3.75H12.3333C12.425 3.75 12.5 3.6825 12.5 3.6V2.7H15.1667V5.25H1.5Z" fill="#757575"/>
          </svg>
        </div>
        <!-- this night count is just for temporary -->
        <p class="night-count">
          1 night
        </p>
        <!-- this input is just for temporary -->
        <b-form-input class="cloud-header-input" value="Jul 19 - Jul 20">
        </b-form-input>
      </div>
      <div class="search-guest">
        <!-- this input is just for temporary -->
        <b-form-input class="cloud-header-input" value="2 adults, 0 children, 1 room" ></b-form-input>
      </div>
      <div @click="search" class="search-button" role="button">Search</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Suggestion, getSuggestion } from '@request/index';
import { ActionMethod, MutationMethod } from 'vuex/types/helpers';

const CloudTravaleModule = namespace("cloudTravel");

@Component({
  components: {
    
  },
})
export default class CloudSearch extends Vue {
  @CloudTravaleModule.Mutation('updateSearchLocation')
  updateSearchLocation!: MutationMethod

  @CloudTravaleModule.Action('getOutlets')
  getOutlets!: ActionMethod

  location = '';
  cityCode = '';

  searchSuggestions: Suggestion[] = [];

  locationIsOnFoucs = false;
  afterClickSuggestion = false;
  updatePostionFocusState(state: boolean): void {
    this.locationIsOnFoucs = state;
    this.afterClickSuggestion = true;
  }

  clickSuggestion(suggestion: Suggestion): void {
    this.location = suggestion.label;
    this.afterClickSuggestion = false;
    this.cityCode = suggestion.cityCode;
    this.updateSearchLocation(({
      value: suggestion.label
    }));
  }

  search(): void {
    this.cityCode.trim() && this.getOutlets(this.cityCode.trim());
  }

  mounted(): void {
    getSuggestion()
      .then(res => {
        this.searchSuggestions = res;
      });
  }
}
</script>

<style lang="less">
.cloud-search {
  background-color: @primary-background;
  height: 70px;
  padding-top: 10px;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 11px;
  width: 15px;
  height: 15px;
}

.cloud-header-input {
  height: 50px;
}

.search-location {
  width: 470px;
  margin-right: 10px;
  position: relative;

  input {
    padding-left: 30px;
    font-size: 13px;
    color: @primary-font-color;
  }

  .search-suggestions {
    position: absolute;
    background-color: white;
    text-align: left;
    margin-top: 5px;
    width: 470px;
    font-size: 13px;
    border-radius: 3px;
    padding-left: 10px!important;
    overflow: hidden;
    z-index: 12;
    height: 120px;
    opacity: 1;
    transition: all 0.3s;

    li {
      height: 40px;
      line-height: 40px;
    }
  }

  .hide-suggestions {
    height: 0;
    opacity: 0;
  }
}

.search-date {
  width: 250px!important;
  margin-right: 10px;
  position: relative;

  input {
    padding-left: 30px;
    font-size: 13px;
    color: @primary-font-color;
  }

  .night-count {
    position: absolute;
    right: 20px;
    top: 13px;
    font-size: 15px;
    color: gray;
    opacity: 0.7;
  }
}

.search-guest {
  width: 250px!important;
  margin-right: 10px;

  input {
    padding-left: 30px;
    font-size: 13px;
    color: @primary-font-color;
  }
}

.search-button {
  width: 150px;
  height: 50px;
  line-height: 50px;
  border-radius: 3px;
  background-color: @primary-foreground;
  color: white;
}
</style>
