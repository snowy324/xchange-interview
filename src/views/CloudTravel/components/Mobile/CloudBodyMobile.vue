<template>
    <div v-if="searchResult && !searchLoading" class="cloud-body-m">
        <div class="select-m">
            <span class="select-text-m">
                Select one
            </span>
        </div>
        <h1 class="search-result-summary-m">
            {{`${searchLocation}: ${totalItems} properties found`}}
        </h1>
        <ul v-if="hotels.length > 0" class="hotel-list-m">
            <li class="single-hotel-m" v-for="hotel in hotels" :key="hotel.property.name">
                <div>
                    <img class="hotel-cover-m" :src="hotel.property.heroImage.url" :alt="hotel.property.name" />
                    <img v-if="hotel.property.gallery[0][screenSize]" class="gallery-image-m" :src="hotel.property.gallery[0][screenSize].url" :alt="hotel.property.name" />
                    <img class="gallery-image-m" v-else :src="hotel.property.heroImage.url" :alt="hotel.property.name" />
                </div>
                <div class="hotel-details-m">
                    <h2 class="hotel-name-m">{{hotel.property.name}}</h2>
                    <div :style="{left: `${(5 - hotel?.property?.starRating) * -13}px`}" class="hotel-rating-box">
                        <Star :style="{left: `${(5 - hotel?.property?.starRating) * 13}px`}" class="hotel-rating" />
                    </div>
                    <p class="hotel-location-m">
                        {{praseLocation(hotel.property.location)}}
                        <span class="view-map" role="button">(view map)</span>
                    </p>
                    <img class="hotel-score-img-m" :src="scoreImg" alt="cloudtravel" />
                    <div class="hotel-price-m">
                        <div class="save-count-m" :style="{opacity: hotel.packages[0].adjustedDisplayRate?.value != hotel.packages[0].displayRate?.value ? 1 : 0}">
                            SAVE {{calcCountRate(hotel)}} TODAY
                        </div>
                        <div class="nightly-avg-m">
                            Nightly avg.
                        </div>
                        <div class="display-rate-m">
                            <span class="original-rate-m" :style="{opacity: hotel.packages[0].adjustedDisplayRate?.value != hotel.packages[0].displayRate?.value ? 1 : 0}">
                                SGD {{hotel.packages[0].displayRate?.value}}
                            </span>
                            <span>
                                SGD {{hotel.packages[0].adjustedDisplayRate?.value}}
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="cloud-sorry-box-m" v-else>
            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.2845 21.8602L16.7062 15.9194C18.1405 14.1735 18.9263 11.9768 18.9263 9.68999C18.9263 4.34701 14.6811 0 9.46317 0C4.24526 0 0 4.34701 0 9.68999C0 15.033 4.24526 19.38 9.46317 19.38C11.4221 19.38 13.2888 18.775 14.8847 17.6265L20.5055 23.6124C20.7404 23.8622 21.0564 24 21.395 24C21.7155 24 22.0196 23.8749 22.2504 23.6474C22.7408 23.1641 22.7565 22.3628 22.2845 21.8602ZM9.46317 2.52782C13.32 2.52782 16.4577 5.74069 16.4577 9.68999C16.4577 13.6393 13.32 16.8522 9.46317 16.8522C5.60631 16.8522 2.46865 13.6393 2.46865 9.68999C2.46865 5.74069 5.60631 2.52782 9.46317 2.52782Z" fill="#757575"/>
            </svg>
            <div class="cloud-sorry-m">
            Sorry! We couldn't find any properties for your search.
            </div>
        </div>
        <div v-if="hotels.length > 0" class="cloud-paganation-box-m">
            <div class="paganation-text-m">
                <div v-touch:tap="backToTop">
                    Back to top
                </div>
                <div>
                    {{`Showing Result 1 - 20 of ${searchResult.outlets.availability.pagination.totalItems}`}}
                </div>
            </div>
            <div class="paganation-box-m">
                <a-pagination
                    class="cloud-paganation cloud-paganation-m"
                    v-model:current="searchResult.outlets.availability.pagination.page"
                    :page-size="20"
                    :total="searchResult.outlets.availability.pagination.totalItems"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ScreenSize, SearchResult, SingleHotel, Location } from '@/request';
import Star from '@pc/Star.vue';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Score from '@assets/TY-score-widget-transparent.png';

const CloudTravaleModule = namespace('cloudTravel');

@Component({
  components: {
    Star,
  },
})
export default class CloudSorterFilter extends Vue {
    @CloudTravaleModule.State('searchLocation') searchLocation!: string
    @CloudTravaleModule.State('searchLoading') searchLoading!: boolean
    @CloudTravaleModule.State('searchResult') searchResult!: SearchResult
    @CloudTravaleModule.State('screenSize') screenSize!: ScreenSize

    scoreImg = Score;

    get totalItems(): number {
        return this.searchResult?.outlets?.availability?.pagination?.totalItems || 0
    }

    get hotels(): SingleHotel[] {
        return this.searchResult?.outlets?.availability?.results;
    }

    praseLocation(location: Location | void): string {
        return location ? `${location?.address} ${location?.city} ${location?.country}` : '';
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
.cloud-body-m {
    background-color: @lightgray;
    padding-top: 10px;
}

.select-m {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: @primary-background;
    margin: 0 20px;
    padding: 0 12px 0 10px;
    height: 30px;
    border-radius: 3px;
}

.select-text-m {
    color: #fff;
    font-size: 14px;
    font-weight: 700;
}

.search-result-summary-m {
    text-align: left;
    font-size: 12px;
    font-weight: 700;
    padding: 15px 0 15px 23px;
}

.single-hotel-m {
    display: flex;
    margin-bottom: 10px;
    margin-right: 10px;
    background-color: #fff;
}

.hotel-cover-m, .gallery-image-m {
    width: 100px;
    height: 77px;
}

.hotel-details-m {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    margin-left: 10px;
    padding-top: 10px;
}

.hotel-name-m {
    font-size: 14px;
    font-weight: 700;
    width: 220px;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 0px;
}

.hotel-location-m {
    width: 220px;
    line-height: 21px;
    text-align: left;
    font-size: 12px;
    margin-bottom: 7px;
    color: @primary-font-color;
}

.hotel-score-img-m {
    width: 100px;
}

.hotel-price-m {
    position: absolute;
    right: 10px;
    bottom: 10px;
}

.nightly-avg-m {
    text-align: right;
    font-size: 10px;
    color: #757575;
}

.save-count-m {
    position: absolute;
    right: 0;
    top: -17px;
    max-width: 120px;
    background-color: #00A1E6;
    color: #fff;
    height: 16px;
    line-height: 16px;
    font-size: 10px;
    text-align: center;
    padding: 0 5px;
}

.display-rate-m {
    color: #000;
    font-size: 14px;
    font-weight: 700;
}

.original-rate-m {
    font-size: 10px;
    color: #757575;
    text-decoration: line-through;
}

.cloud-paganation-box-m {
    padding-bottom: 30px;
}

.paganation-text-m {
    display: flex;
    justify-content: space-between;
    padding: 20px 23px 10px;
    font-size: 14px;
    color: #333;
}

.paganation-box-m {
    display: flex;
    justify-content: flex-end;
    padding-right: 19px;
}

.cloud-sorry-box-m {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  .cloud-sorry-m {
    font-size: 12px;
    font-weight: 700;
    color: @placeholder;
    margin-top: 10px;
  }
}
</style>