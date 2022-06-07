<template>
  <div class="cloud-filter">
    <!-- show on map -->
    <div class="cloud-map-box cloud-flex-box">
      <img class="show-map-bg" :src="showMapbg" alt="show cloudtravel on map" />
      <p class="show-map-text">
        Show on Map
      </p>
    </div>
    <!-- price filter -->
    <div class="price-filter general-filter">
      <div class="price-filter-header general-filter-header">
        <span class="general-title">
          Price per night
        </span>
        <span class="general-clear" role="button">
          CLEAR
        </span>
      </div>
      <a-slider range :default-value="[0, 999]" :max="999" />
      <div class="price-input-box">
        <div class="price-input-prefix-left">SDG</div>
        <div class="price-input-prefix-right">SDG</div>
         <a-input id="inputNumber" :min="0" :max="999"/>
         <div class="price-input-dash">
         </div>
         <a-input style="margin-left: 0px" id="inputNumber" :min="0" :max="999"/>
      </div>
    </div>
    <!-- reviews filter -->
    <div class="reviews-filter general-filter">
      <div class="general-filter-header">
        <span class="general-title">
          Reviews
        </span>
        <span class="general-clear" role="button">
          CLEAR
        </span>
      </div>
      <ul>
        <li class="general-check-box" v-for="review in reviews" :key="review">
          <a-checkbox>
            <span class="general-check-box-label">
              {{review}}
            </span>
          </a-checkbox>
          <!-- this number is just for tempoary -->
          <span class="general-count">
            999
          </span>
        </li>
      </ul>
    </div>
    <!-- star filter -->
    <div class="general-filter">
      <div class="general-filter-header">
        <span class="general-title">
          Star rating
        </span>
        <span class="general-clear" role="button">
          CLEAR
        </span>
      </div>
      <ul>
        <li class="rating-check-box general-check-box" v-for="star in stars" :key="star">
          <a-checkbox>
            <div :style="{left: `${(5 - star) * -16}px`}" class="general-check-box-label star-label-box">
              <Star :style="{left: `${(5 - star) * 16}px`}" class="rating-star" />
            </div>
          </a-checkbox>
          <!-- this number is just for tempoary -->
          <span class="general-count">
            999
          </span>
        </li>
        <li class="general-check-box">
          <a-checkbox>
            <span class="general-check-box-label">
              No rating
            </span>
          </a-checkbox>
          <span class="general-count">
            999
          </span>
        </li>
      </ul>
    </div>
    <!-- hotel name filter -->
    <div class="general-filter">
      <a-input-search placeholder="eg. Hiton Ibis" />
    </div>
    <!-- reservation filter -->
    <div class="general-filter">
      <div class="general-filter-header">
        <span class="general-title">
          Reservation policy
        </span>
        <span class="general-clear" role="button">
          CLEAR
        </span>
      </div>
      <ul>
        <li class="general-check-box" v-for="reservation in reservations" :key="reservation">
          <a-checkbox>
            <span class="general-check-box-label">
              {{reservation}}
            </span>
          </a-checkbox>
          <!-- this number is just for tempoary -->
          <span class="general-count">
            999
          </span>
        </li>
      </ul>
    </div>
    <!-- meal filter -->
    <div class="general-filter">
      <div class="general-filter-header">
        <span class="general-title">
          Meal plan
        </span>
        <span class="general-clear" role="button">
          CLEAR
        </span>
      </div>
      <ul>
        <li class="general-check-box" v-for="visableMealPlan in visableMealPlans" :key="visableMealPlan">
          <a-checkbox>
            <span class="general-check-box-label">
              {{visableMealPlan}}
            </span>
          </a-checkbox>
          <!-- this number is just for tempoary -->
          <span class="general-count">
            999
          </span>
        </li>
        <li v-if="showInvisableMealPlans" class="general-check-box" v-for="invisableMealPlan in invisableMealPlans" :key="invisableMealPlan">
          <a-checkbox>
            {{invisableMealPlan}}
          </a-checkbox>
          <!-- this number is just for tempoary -->
          <span class="general-count">
            999
          </span>
        </li>
        <div @click="toggleVisableMealPlan" class="general-visable-option-toggle">
          {{showInvisableMealPlans ? 'Show less' : 'Show 5 more'}}
          <a-icon :type="showInvisableMealPlans ? 'up' : 'down'" />
        </div>
      </ul>
    </div>
    <!-- property filter -->
    <div class="general-filter">
      <div class="general-filter-header">
        <span class="general-title">
          Property type
        </span>
        <span class="general-clear" role="button">
          CLEAR
        </span>
      </div>
      <ul>
        <li class="general-check-box" v-for="visablePropertyType in visablePropertyTypes" :key="visablePropertyType">
          <a-checkbox>
            <span class="general-check-box-label">
              {{visablePropertyType}}
            </span>
          </a-checkbox>
          <!-- this number is just for tempoary -->
          <span class="general-count">
            999
          </span>
        </li>
        <li v-if="showInvisablePropertyTypes" class="general-check-box" v-for="invisablePropertyType in invisablePropertyTypes" :key="invisablePropertyType">
          <a-checkbox>
            <span class="general-check-box-label">
              {{invisablePropertyType}}
            </span>
          </a-checkbox>
          <!-- this number is just for tempoary -->
          <span class="general-count">
            999
          </span>
        </li>
        <div @click="toggleVisablePropertyTypes" class="general-visable-option-toggle">
          {{showInvisablePropertyTypes ? 'Show less' : 'Show 9 more'}}
          <a-icon :type="showInvisablePropertyTypes ? 'up' : 'down'" />
        </div>
      </ul>
    </div>
    <!-- facilities filter -->
    <div class="general-filter">
      <div class="general-filter-header">
        <span class="general-title">
          Facilities
        </span>
        <span class="general-clear" role="button">
          CLEAR
        </span>
      </div>
      <ul>
        <li class="general-check-box" v-for="visableFacilitiy in visableFacilities" :key="visableFacilitiy">
          <a-checkbox>
            <span class="general-check-box-label">
              <span class="general-check-box-label">
                {{visableFacilitiy}}
              </span>
            </span>
          </a-checkbox>
          <!-- this number is just for tempoary -->
          <span class="general-count">
            999
          </span>
        </li>
        <li v-if="showInvisablePropertyTypes" class="general-check-box" v-for="invisableFacilitiy in invisableFacilities" :key="invisableFacilitiy">
          <a-checkbox>
            <span class="general-check-box-label">
              {{invisableFacilitiy}}
            </span>
          </a-checkbox>
          <!-- this number is just for tempoary -->
          <span class="general-count">
            999
          </span>
        </li>
        <div @click="toggleVisableFacilities" class="general-visable-option-toggle">
          {{showInvisableFacilities ? 'Show less' : 'Show 26 more'}}
          <a-icon :type="showInvisableFacilities ? 'up' : 'down'" />
        </div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Star from './Star.vue';
import ShowMapBg from '@assets/map-bg.jpeg';

@Component({
  components: {
    Star
  },
})
export default class CloudFilter extends Vue {
  reviews = [
    "Excellent",
    "Very Good",
    "Good",
    "Fair",
    "Poor",
    "No review"
  ];

  showMapbg = ShowMapBg;

  stars = [5, 4, 3, 2, 1];

  reservations = ["Free cacellation", "Book now, pay later", "Pay at hotel"];

  visableMealPlans = ['Room only', 'Breakfast'];
  invisableMealPlans = ['Lunch', 'Dinner', "Half board", "Full board", "All inclusive"];
  showInvisableMealPlans = false;
  toggleVisableMealPlan(): void {
    this.showInvisableMealPlans = !this.showInvisableMealPlans;
  }

  visablePropertyTypes = ["Hotel", "Hostel/Backpacker", "Apartment"];
  invisablePropertyTypes = ["Aparthotel", 'Resort', "Inn", "Motel", "Bed & breakfast", "Guesthouse", "Condo", "All-inclusive property", "Hostal"];
  showInvisablePropertyTypes = false;
  toggleVisablePropertyTypes(): void {
    this.showInvisablePropertyTypes = !this.showInvisablePropertyTypes;
  }

  visableFacilities = ["Hotel", "Hostel/Backpacker", "Apartment"];
  invisableFacilities = [];
  showInvisableFacilities = false;
  toggleVisableFacilities(): void {
    this.showInvisableFacilities = !this.showInvisableFacilities;
  }
}
</script>

<style lang="less">
.cloud-filter {
  width: 290px;
}

.cloud-map-box {
  position: relative;
  height: 100px;

  .show-map-bg {
    position: absolute;
    width: 290px;
    height: 100px;
    z-index: 9;
  }

  .show-map-text {
    position: absolute;
    top: 30px;
    width: 170px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-radius: 3px;
    color: white;
    background-color: @primary-background;
    z-index: 10;
  }
}

.ant-slider-mark {
  display: none;
}

.ant-slider-step {
  display: none;
}

.general-filter {
  background-color: white;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;

  .general-check-box-label {
    font-size: 12px;
    color: @primary-font-color;
  }

  .general-title {
    font-size: 14px;
    font-weight: 700;
    color: #000;
  }

  .general-clear {
    font-size: 12px;
    color: #002D63;
    font-weight: 700;
  }

  .general-count {
    font-size: 12px;
    color: #757575;
  }

  ul {
    margin-top: 20px;
    padding-left: 0!important;
    margin-bottom: 10px!important;
  }

  .general-filter-header {
    &:extend(.cloud-flex-space-between-box);
    margin-bottom: 17px;
  }

  .general-check-box {
    &:extend(.cloud-flex-space-between-box);
  }

  .general-visable-option-toggle {
    color: #002D63;;
    font-size: 13px;
    text-align: left;
    margin-top: 10px;
    cursor: pointer;

    i {
      font-size: 10px;
      position: relative;
      top: -3px;
    }
  }
}

.rating-check-box {
  position: relative;

  .ant-checkbox-wrapper {
    display: flex;

    .rating-star {
      position: relative;
      height: 20px;
      top: -3px;
    }

    .star-label-box {
      width: 80px;
      position: relative;
      overflow: hidden;
    }
  }
}

.price-filter {
  height: 142px;

  .general-filter-header {
    margin-top: 11px;
    margin-bottom: 20px;
  }

  .price-input-box {
    &:extend(.cloud-flex-space-between-box);
    position: relative;
    margin-top: 19px;

    input {
      padding-left: 40px!important;
    }

    .price-input-dash {
      width: 25px;
      height: 1px;
      margin: 0 10px;
      background-color: gray;
    }
  }

  .price-input-prefix-left, .price-input-prefix-right {
    position: absolute;
    z-index: 99;
    font-size: 12px;
    color: @primary-font-color;
  }

  .price-input-prefix-left {
    left: 10px;
  }

  .price-input-prefix-right {
    left: 150px;
  }
}

.reviews-filter {
  height: 217px;
 
 .general-filter-header {
    margin-top: 11px;
    margin-bottom: 17px;
  }
}
</style>