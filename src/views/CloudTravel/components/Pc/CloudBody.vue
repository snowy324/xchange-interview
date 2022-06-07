
<template>
    <div v-if="searchResult && !searchLoading" class="cloud-body">
      <h1 class="search-result-summary">
        {{`${searchLocation}: ${totalItems} properties found`}}
      </h1>
      <div class="cloud-sorters">
        <div :class="{'active-sorter' : activeSorter === 0}" @click="updateActirveSorter(0)" role="button" class="cloud-single-sorter">
          Popularity
        </div>
        <div :class="{'active-sorter' : activeSorter === 1}" @click="updateActirveSorter(1)" role="button" class="cloud-single-sorter">
          Price
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L4 5L8 0H0Z" :fill="activeSorter === 1 ? '#fff' :'@primary-font-color333'"/>
          </svg>
        </div>
        <div :class="{'active-sorter' : activeSorter === 2}" @click="updateActirveSorter(2)" role="button" class="cloud-single-sorter">
          Reviews
        </div>
        <div :class="{'active-sorter' : activeSorter === 3}" @click="updateActirveSorter(3)" role="button" class="cloud-single-sorter">
          Discount
        </div>
      </div>
      <ul v-if="hotels.length > 0" class="hotel-list">
        <li class="single-hotel" v-for="hotel in hotels" :key="hotel.property.name">
          <div class="hotel-image">
            <img class="hotel-cover" :src="hotel.property.heroImage.url" :alt="hotel.property.name" />
            <ul class="gallery-image-box">
              <li v-for="(gallery, galleryIdx) in hotel.property.gallery" :key="galleryIdx">
                <img class="gallery-image" v-if="gallery[screenSize]" :src="gallery[screenSize].url" />
              </li>
            </ul>
          </div>
          <div class="hotel-details">
            <div class="hotel-name-rating">
              <h2 class="hotel-name">{{hotel.property.name}}</h2>
              <div :style="{left: `${(5 - hotel?.property?.starRating) * -13}px`}" class="hotel-rating-box">
                <Star :style="{left: `${(5 - hotel?.property?.starRating) * 13}px`}" class="hotel-rating" />
              </div>
            </div>
            <p class="hotel-location">
              {{praseLocation(hotel.property.location)}}
              <span class="view-map" role="button">(view map)</span>
            </p>
            <p class="summary-text">
              {{hotel.property.reviews?.summary?.text}}
            </p>
            <div class="hotel-tags">
              <hotel-tag class="free-cancel" v-if="hotel.packages[0]?.nonRefundable" tag="Free cancellation" />
              <hotel-tag class="pay-later" v-if="hotel.packages[0]?.payLater" tag="Pay Later" />
              <hotel-tag v-if="hotel.packages[0]?.payAtHotel" tag="Pay at hotel" />
            </div>
            <p class="hotel-clean">
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.50012 11H4.00012V8H6.50012V5.5H9.50012V8H12.0001V11H9.50012V13.5H6.50012V11ZM8.00012 0L0.00012207 3V9.09C0.00012207 14.14 3.41012 18.85 8.00012 20C12.5901 18.85 16.0001 14.14 16.0001 9.09V3L8.00012 0Z" fill="#002D63"/>
              </svg>
              <span class="hotel-clean-safety">
                {{hotel.property.covidSafety}}
              </span>
            </p>
          </div>
          <div class="hotel-decorations">
            <img class="hotel-score-img" :src="scoreImg" alt="cloudtravel" />
            <div class="save-count" :style="{opacity: hotel.packages[0].adjustedDisplayRate?.value != hotel.packages[0].displayRate?.value ? 1 : 0}">
              SAVE {{calcCountRate(hotel)}} TODAY
            </div>
            <div class="nightly-avg">
              Nightly avg.
            </div>
            <div class="display-rate">
              <span class="original-rate" :style="{opacity: hotel.packages[0].adjustedDisplayRate?.value != hotel.packages[0].displayRate?.value ? 1 : 0}">
                SGD {{hotel.packages[0].displayRate?.value}}
              </span>
              <span>
                SGD {{hotel.packages[0].adjustedDisplayRate?.value}}
              </span>
            </div>
          </div>
        </li>
      </ul>
      <div class="cloud-sorry-box" v-else>
        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.2845 21.8602L16.7062 15.9194C18.1405 14.1735 18.9263 11.9768 18.9263 9.68999C18.9263 4.34701 14.6811 0 9.46317 0C4.24526 0 0 4.34701 0 9.68999C0 15.033 4.24526 19.38 9.46317 19.38C11.4221 19.38 13.2888 18.775 14.8847 17.6265L20.5055 23.6124C20.7404 23.8622 21.0564 24 21.395 24C21.7155 24 22.0196 23.8749 22.2504 23.6474C22.7408 23.1641 22.7565 22.3628 22.2845 21.8602ZM9.46317 2.52782C13.32 2.52782 16.4577 5.74069 16.4577 9.68999C16.4577 13.6393 13.32 16.8522 9.46317 16.8522C5.60631 16.8522 2.46865 13.6393 2.46865 9.68999C2.46865 5.74069 5.60631 2.52782 9.46317 2.52782Z" fill="#757575"/>
        </svg>
        <div class="cloud-sorry">
          Sorry! We couldn't find any properties for your search.
        </div>
      </div>
      <div v-if="hotels.length > 0" class="cloud-paganation-box">
        <div @click="backToTop" class="back-to-top">
          Back to top
        </div>
        <a-pagination
          class="cloud-paganation"
          v-model:current="searchResult.outlets.availability.pagination.page"
          :page-size="20"
          :total="searchResult.outlets.availability.pagination.totalItems"
          :show-total="() => `Showing Result 1 - 20 of ${searchResult.outlets.availability.pagination.totalItems}`"
        />
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Language from './Language.vue';
import Currency from './Currency.vue';
import HotelTag from './HotelTag.vue';
import Star from './Star.vue';
import { SearchResult, SingleHotel, Location, ScreenSize } from '@/request';
import Score from '@assets/TY-score-widget-transparent.png';

const CloudTravaleModule = namespace('cloudTravel');

@Component({
  components: {
    Language,
    Currency,
    Star,
    HotelTag,
  },
})
export default class CloudBody extends Vue {
  @CloudTravaleModule.State('searchLocation') searchLocation!: string
  @CloudTravaleModule.State('searchLoading') searchLoading!: boolean
  @CloudTravaleModule.State('searchResult') searchResult!: SearchResult
  @CloudTravaleModule.State('screenSize') screenSize!: ScreenSize

  activeSorter = 0;
  updateActirveSorter(sorter: number) : void {
    this.activeSorter = sorter;
  }

  scoreImg = Score;

  get totalItems(): number {
    return this.searchResult?.outlets?.availability?.pagination?.totalItems || 0
  }

  praseLocation(location: Location | void): string {
    return location ? `${location?.address} ${location?.city} ${location?.country}` : '';
  }

  get hotels(): SingleHotel[] {
    return this.searchResult?.outlets?.availability?.results;
  }

  calcCountRate(hotel: SingleHotel): string {
    const displayRate = hotel.packages[0].displayRate!.value;
    const adjustedDisplayRate = hotel.packages[0].adjustedDisplayRate!.value;
    const count = ((displayRate - adjustedDisplayRate) / displayRate * 100).toFixed(2);
    return `${count}%`;
  }

  backToTop(): void {
    window.pageYOffset = document.documentElement.scrollTop = document.body.scrollTop = 0;
  }
 }
</script>

<style lang="less">
.cloud-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  margin-left: 16px;

  ul, li {
    padding-left: 0!important;
  }
}

.hotel-list {
  width: 100%;
}

.search-result-summary {
  font-size: 16px;
  color: #000;
  font-weight: 700;
  margin-bottom: 15px;
}

.hotel-name-rating {
  display: flex;
  height: 20px;
  margin-bottom: 5px;
  margin-top: 16px;
  
  .hotel-rating-box {
    width: 80px;
    position: relative;
    margin-left: 5px;
    overflow: hidden;
  }

  .hotel-rating {
    position: relative;
    top: -4.5px;
  }
}

.hotel-image {
  margin-right: 15px;
  margin-left: 10px;

  .hotel-cover {
    width: 200px;
    height: 160px;
  }
}

.single-hotel {
  display: flex;
  justify-self: start;
  height: 230px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  transition: all 0.2s;
  position: relative;
  top: 0;
  right: 0;

  &:hover {
    top: -3px;
    right: -2px;
    box-shadow: 1px 2px 2px 1px rgba(87, 87, 88, 0.2);
  }
}

.summary-text {
  width: 440px;
  height: 16px;
  line-height: 16px;
  margin-bottom: 11px;
  font-size: 12px;
  color: #757575;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hotel-details {
  text-align: left;
}

.hotel-name {
  font-size: 16px;
  font-weight: 700;
  color: @primary-font-color;
}

.hotel-location {
  height: 21px;
  line-height: 21px;
  font-size: 12px;
  margin-bottom: 7px;
  color: @primary-font-color;
}

.hotel-clean {
  line-height: 15px;
  margin-top: 15px;

  .hotel-clean-safety {
    font-size: 12px;
    color: @primary-font-color;
    margin-left: 11px;
  }
}

.hotel-tags {
  display: flex;
}

.free-cancel, .pay-later {
  margin-right: 5px;
}

.view-map {
  color: blue;
}

.gallery-image-box {
  display: flex;
  max-width: 200px;
  margin-top: 2px;
  overflow: hidden;

  .gallery-image {
    width: 48px;
    height: 48px;
    margin-right: 2px;
  }
}

.hotel-decorations {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 17px;
  padding-top: 17px;
  text-align: right;

  .hotel-score-img {
    width: 146px;
    height: 50.5px;
    margin-bottom: 50px;
  }
  
  .save-count {
    background-color: #00A1E6;
    color: #fff;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    padding: 0 5px;
  }

  .nightly-avg {
    font-size: 12px;
    color: #757575;
    margin-top: 5px;
  }

  .display-rate {
    font-size: 24px;
    color: #000;
    margin-bottom: 14px;
  }

  .original-rate {
    text-decoration: line-through;
    font-size: 12px;
    color: #757575;
    margin-right: 3px;
  }
}

.cloud-sorry-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 63px;

  .cloud-sorry {
    font-size: 16px;
    font-weight: 700;
    color: @placeholder;
    margin-top: 17px;
  }
}

.cloud-sorters {
  display: flex;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 5px;

  .active-sorter {
    background-color: @primary-background;
    color: #fff;
  }

  .cloud-single-sorter {
    width: 226px;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    font-weight: 700;
    border-right: 1px solid #DDDDDD;
  }
}

.cloud-paganation-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.ant-pagination-total-text {
  font-size: 14px;
  color: @primary-font-color;
  margin-right: 19px!important;
}

.ant-pagination-prev, .ant-pagination-item, .ant-pagination-next, .ant-pagination-disabled {
  width: 24px!important;
  min-width: 24px!important;
  height: 24px!important;
  line-height: 24px!important;
  background-color: transparent!important;
  border: none!important;

  a {
    font-size: 14px;
    // color: @primary-font-color!important;
    border-color: transparent!important;
    background-color: transparent!important;
  }

  i {
    width: 10px!important;
    min-width: 10px!important;
    height: 10px!important;
  }
}

.ant-pagination-prev, .ant-pagination-next {
  a {
    position: relative;
    top: -3px;
  }
}

.ant-pagination-item-active {
  background-color: @primary-background!important;
  color: #fff!important;
}

.back-to-top {
  font-size: 14px;
  color: #002D63;
  cursor: pointer;
}
</style>