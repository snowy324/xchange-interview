<template>
    <div>
        <div class="sorter-page-header">
            <svg v-touch:tap="goBackHome" width="15" height="15" viewBox="0 0 15 15" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5.657 7.071L0 1.414L1.414 0L7.071 5.657L12.728 0L14.142 1.414L8.485 7.071L14.142 12.728L12.728 14.142L7.071 8.485L1.414 14.142L0 12.728L5.657 7.071Z"
                    fill="#002D63" />
            </svg>
            <span class="sorter-page-title">
                Sort & Filter
            </span>
        </div>
        <div class="sorter-main-m">
            <div class="sort-by-m">
                Sort by
            </div>
            <a-select class="sort-select-m" default-value="Price Low">
                <a-select-option value="1">
                    Price Low
                </a-select-option>
                <a-select-option value="2">
                    Popularity
                </a-select-option>
                <a-select-option value="3">
                    Reviews
                </a-select-option>
                <a-select-option value="4">
                    Discount
                </a-select-option>
            </a-select>
            <div class="filter-by-m">
                Filter by
            </div>
            <div class="price-filter-m general-filter-m">
                <div class="general-filter-header-m">
                    <span class="general-title-m">
                        Price per night
                    </span>
                    <span class="general-clear-m" role="button">
                        CLEAR
                    </span>
                </div>
                <a-slider range :default-value="[0, 999]" :max="999" />
                <div class="price-input-box-m">
                    <div class="price-input-prefix-left-m">SDG</div>
                    <div class="price-input-prefix-right-m">SDG</div>
                    <a-input id="inputNumber" :min="0" :max="999" />
                    <div class="price-input-dash-m">
                    </div>
                    <a-input style="margin-left: 0px" id="inputNumber" :min="0" :max="999" />
                </div>
            </div>
            <div class="reviews-filter-m general-filter-m">
                <div class="general-filter-header-m">
                    <span class="general-title-m">
                        Reviews
                    </span>
                    <span class="general-clear-m" role="button">
                        CLEAR
                    </span>
                </div>
                <ul>
                    <li class="general-check-box-m" v-for="review in reviews" :key="review">
                        <a-checkbox>
                            <span class="general-check-box-label-m">
                                {{ review }}
                            </span>
                        </a-checkbox>
                        <!-- this number is just for tempoary -->
                        <span class="general-count-m">
                            999
                        </span>
                    </li>
                </ul>
            </div>
            <div class="general-filter-m">
                <div class="general-filter-header-m">
                    <span class="general-title-m">
                        Star rating
                    </span>
                    <span class="general-clear-m" role="button">
                        CLEAR
                    </span>
                </div>
                <ul>
                    <li class="rating-check-box general-check-box-m" v-for="star in stars" :key="star">
                        <a-checkbox>
                            <div :style="{ left: `${(5 - star) * -16}px` }"
                                class="general-check-box-label-m star-label-box">
                                <Star :style="{ left: `${(5 - star) * 16}px` }" class="rating-star" />
                            </div>
                        </a-checkbox>
                        <!-- this number is just for tempoary -->
                        <span class="general-count-m">
                            999
                        </span>
                    </li>
                    <li class="general-check-box-m">
                        <a-checkbox>
                            <span class="general-check-box-label-m">
                                No rating
                            </span>
                        </a-checkbox>
                        <span class="general-count-m">
                            999
                        </span>
                    </li>
                </ul>
            </div>
            <div class="general-filter-m">
                <div class="general-filter-header-m">
                    <span class="general-title-m">
                        Reservation policy
                    </span>
                    <span class="general-clear-m" role="button">
                        CLEAR
                    </span>
                </div>
                <ul>
                    <li class="general-check-box-m" v-for="reservation in reservations" :key="reservation">
                        <a-checkbox>
                            <span class="general-check-box-label-m">
                                {{ reservation }}
                            </span>
                        </a-checkbox>
                        <!-- this number is just for tempoary -->
                        <span class="general-count-m">
                            999
                        </span>
                    </li>
                </ul>
            </div>
            <div class="general-filter-m">
                <div class="general-filter-header-m">
                    <span class="general-title-m">
                        Meal plan
                    </span>
                    <span class="general-clear-m" role="button">
                        CLEAR
                    </span>
                </div>
                <ul>
                    <li class="general-check-box-m" v-for="visableMealPlan in visableMealPlans" :key="visableMealPlan">
                        <a-checkbox>
                            <span class="general-check-box-label-m">
                                {{ visableMealPlan }}
                            </span>
                        </a-checkbox>
                        <!-- this number is just for tempoary -->
                        <span class="general-count-m">
                            999
                        </span>
                    </li>
                    <li v-if="showInvisableMealPlans" class="general-check-box-m"
                        v-for="invisableMealPlan in invisableMealPlans" :key="invisableMealPlan">
                        <a-checkbox>
                            {{ invisableMealPlan }}
                        </a-checkbox>
                        <!-- this number is just for tempoary -->
                        <span class="general-count-m">
                            999
                        </span>
                    </li>
                    <div @click="toggleVisableMealPlan" class="general-visable-option-toggle-m">
                        {{ showInvisableMealPlans ? 'Show less' : 'Show 5 more' }}
                        <a-icon :type="showInvisableMealPlans ? 'up' : 'down'" />
                    </div>
                </ul>
            </div>
            <div class="general-filter-m">
                <div class="general-filter-header-m">
                    <span class="general-title-m">
                        Property type
                    </span>
                    <span class="general-clear-m" role="button">
                        CLEAR
                    </span>
                </div>
                <ul>
                    <li class="general-check-box-m" v-for="visablePropertyType in visablePropertyTypes"
                        :key="visablePropertyType">
                        <a-checkbox>
                            <span class="general-check-box-label-m">
                                {{ visablePropertyType }}
                            </span>
                        </a-checkbox>
                        <!-- this number is just for tempoary -->
                        <span class="general-count-m">
                            999
                        </span>
                    </li>
                    <li v-if="showInvisablePropertyTypes" class="general-check-box-m"
                        v-for="invisablePropertyType in invisablePropertyTypes" :key="invisablePropertyType">
                        <a-checkbox>
                            <span class="general-check-box-label-m">
                                {{ invisablePropertyType }}
                            </span>
                        </a-checkbox>
                        <!-- this number is just for tempoary -->
                        <span class="general-count-m">
                            999
                        </span>
                    </li>
                    <div @click="toggleVisablePropertyTypes" class="general-visable-option-toggle-m">
                        {{ showInvisablePropertyTypes ? 'Show less' : 'Show 9 more' }}
                        <a-icon :type="showInvisablePropertyTypes ? 'up' : 'down'" />
                    </div>
                </ul>
            </div>
            <div class="general-filter-m">
                <div class="general-filter-header-m">
                    <span class="general-title-m">
                        Facilities
                    </span>
                    <span class="general-clear-m" role="button">
                        CLEAR
                    </span>
                </div>
                <ul>
                    <li class="general-check-box-m" v-for="visableFacilitiy in visableFacilities" :key="visableFacilitiy">
                        <a-checkbox>
                            <span class="general-check-box-label-m">
                                <span class="general-check-box-label-m">
                                    {{ visableFacilitiy }}
                                </span>
                            </span>
                        </a-checkbox>
                        <!-- this number is just for tempoary -->
                        <span class="general-count-m">
                            999
                        </span>
                    </li>
                    <li v-if="showInvisablePropertyTypes" class="general-check-box-m"
                        v-for="invisableFacilitiy in invisableFacilities" :key="invisableFacilitiy">
                        <a-checkbox>
                            <span class="general-check-box-label-m">
                                {{ invisableFacilitiy }}
                            </span>
                        </a-checkbox>
                        <!-- this number is just for tempoary -->
                        <span class="general-count-m">
                            999
                        </span>
                    </li>
                    <div @click="toggleVisableFacilities" class="general-visable-option-toggle-m">
                        {{ showInvisableFacilities ? 'Show less' : 'Show 26 more' }}
                        <a-icon :type="showInvisableFacilities ? 'up' : 'down'" />
                    </div>
                </ul>
            </div>
        </div>
        <div class="sort-footer-m">
            <div class="sort-footer-btn-m sort-footer-btn-clear-m">
                Clear
            </div>
            <div class="sort-footer-btn-m sort-footer-btn-filter-m">
                Filter
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Star from '@pc/Star.vue';

const CloudTravaleModule = namespace('cloudTravel');

@Component({
    components: {
        Star
    },
})
export default class CloudSorterPage extends Vue {
    goBackHome(): void {
        this.$router.push('/');
    }

    stars = [5, 4, 3, 2, 1];

    reservations = ["Free cacellation", "Book now, pay later", "Pay at hotel"];

    reviews = [
        "Excellent",
        "Very Good",
        "Good",
        "Fair",
        "Poor",
        "No review"
    ];

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
.sorter-page-header {
    display: flex;
    align-items: center;
    height: 55px;
    text-align: left;
    padding-left: 17px;
    border-bottom: 1px solid #ddd;
}

.sorter-page-title {
    margin-left: 21px;
    font-size: 16px;
    font-weight: 700;
}

.sort-by-m,
.filter-by-m {
    height: 40px;
    line-height: 40px;
    text-align: left;
    padding-left: 20px;
    background-color: #f5f5f5;
    font-size: 14px;
    color: #002D63;
}

.sort-select-m {
    width: 100vw;
}

.general-filter-m {
    background-color: white;
    margin-top: 21px;
    padding: 0 20px;

    .general-filter-header-m {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .general-title-m {
        font-size: 14px;
        font-weight: 700;
        color: #000;
    }

    .general-clear-m {
        font-size: 12px;
        font-weight: 700;
        color: @primary-background;
    }

    .general-check-box-label-m {
        font-size: 12px;
        color: @primary-font-color;
    }

    .general-check-box-m {
        &:extend(.cloud-flex-space-between-box);
    }

    .general-count-m {
        font-size: 12px;
        color: #757575;
    }

    ul {
        padding-left: 0 !important;
    }
}

.price-input-box-m {
    &:extend(.cloud-flex-space-between-box);
    position: relative;
    margin-top: 19px;

    input {
        padding-left: 40px !important;
    }

    .price-input-dash-m {
        width: 25px;
        height: 1px;
        margin: 0 10px;
        background-color: gray;
    }
}

.price-input-prefix-left-m,
.price-input-prefix-right-m {
    position: absolute;
    z-index: 99;
    font-size: 12px;
    color: @primary-font-color;
}

.price-input-prefix-left-m {
    left: 10px;
}

.price-input-prefix-right-m {
    left: 192px;
}

.general-visable-option-toggle-m {
    color: #002D63;
    ;
    font-size: 10px;
    text-align: left;
    margin: 10px 0;
    cursor: pointer;

    i {
        font-size: 8px;
        position: relative;
        top: -2px;
    }
}

.sorter-main-m {
    padding-bottom: 70px;
}

.sort-footer-m {
    position: fixed;
    background-color: white;
    border-top: 1px solid #ddd;
    bottom: 0;
    right: 0;
    left: 0;
    height: 60px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .sort-footer-btn-m {
        width: 157px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: 700;
    }
}

.sort-footer-btn-clear-m {
    border: 2px solid #002d63;
    color: @primary-background;
}

.sort-footer-btn-filter-m {
    background-color: @primary-background;
    color: #fff;
}
</style>