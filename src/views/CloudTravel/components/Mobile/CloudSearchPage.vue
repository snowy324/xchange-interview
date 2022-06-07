<template>
    <div>
        <div class="search-page-header">
            <svg v-touch:tap="goBackHome"  width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.657 7.071L0 1.414L1.414 0L7.071 5.657L12.728 0L14.142 1.414L8.485 7.071L14.142 12.728L12.728 14.142L7.071 8.485L1.414 14.142L0 12.728L5.657 7.071Z" fill="#002D63"/>
            </svg>
            <span class="search-page-title">
                Where?
            </span>
        </div>
        <div class="search-page-input-box">
           <a-input @focus="updatePostionFocusState(true)" @blur="updatePostionFocusState(false)" class="search-input-location" v-model="location" placeholder="please input location" >
                <a-icon slot="prefix" type="search" />
           </a-input>
           <ul :class="{'hide-suggestions-m': !locationIsOnFoucs}" class="search-suggestions-m">
                <li v-touch:tap="clickSuggestion.bind(this, suggestion)" v-for="suggestion in searchSuggestions" :key="suggestion.cityCode">
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 3.5C6.44374 3.5 5.89997 3.66495 5.43746 3.97399C4.97495 4.28303 4.61446 4.72229 4.40159 5.2362C4.18872 5.75012 4.13302 6.31562 4.24154 6.86119C4.35006 7.40676 4.61793 7.9079 5.01126 8.30124C5.4046 8.69457 5.90574 8.96244 6.45131 9.07096C6.99688 9.17948 7.56238 9.12378 8.0763 8.91091C8.59021 8.69804 9.02947 8.33755 9.33851 7.87504C9.64755 7.41253 9.8125 6.86876 9.8125 6.3125C9.81164 5.56684 9.51505 4.85197 8.98779 4.32471C8.46053 3.79745 7.74566 3.50086 7 3.5ZM7 8C6.66624 8 6.33998 7.90103 6.06248 7.7156C5.78497 7.53018 5.56868 7.26663 5.44095 6.95828C5.31323 6.64993 5.27981 6.31063 5.34492 5.98328C5.41004 5.65594 5.57076 5.35526 5.80676 5.11926C6.04276 4.88326 6.34344 4.72254 6.67078 4.65742C6.99813 4.59231 7.33743 4.62573 7.64578 4.75345C7.95413 4.88118 8.21768 5.09747 8.40311 5.37498C8.58853 5.65248 8.6875 5.97874 8.6875 6.3125C8.687 6.7599 8.50905 7.18883 8.19269 7.50519C7.87633 7.82155 7.4474 7.9995 7 8ZM7 0.125C5.35954 0.126861 3.78681 0.779354 2.62683 1.93933C1.46685 3.09931 0.814361 4.67204 0.8125 6.3125C0.8125 8.52003 1.83273 10.8602 3.76302 13.0801C4.63166 14.0831 5.60912 14.9864 6.67741 15.7733C6.77196 15.8395 6.88458 15.875 7 15.875C7.11542 15.875 7.22804 15.8395 7.32259 15.7733C8.39088 14.9864 9.36834 14.0831 10.237 13.0801C12.1672 10.8602 13.1875 8.5201 13.1875 6.3125C13.1856 4.67204 12.5331 3.09931 11.3732 1.93933C10.2132 0.779354 8.64046 0.126861 7 0.125ZM7 14.608C5.83752 13.6962 1.9375 10.3366 1.9375 6.3125C1.9375 4.96984 2.47087 3.68217 3.42027 2.73277C4.36967 1.78337 5.65734 1.25 7 1.25C8.34266 1.25 9.63032 1.78337 10.5797 2.73277C11.5291 3.68217 12.0625 4.96984 12.0625 6.3125C12.0625 10.3366 8.16227 13.6964 7 14.608Z" fill="#757575"/>
                    </svg>
                    {{ suggestion.label }}
                </li>
            </ul>
            <a-input class="search-input-date" v-model="date" placeholder="please select date" >
                <a-icon slot="prefix" type="calendar" />
           </a-input>
           <a-input v-model="guests" placeholder="please input guests" >
           </a-input>
        </div>
        <div v-touch:tap="goSearch" class="search-page-button" role="button">
            Search
        </div>
    </div>
</template>

<script lang="ts">
import { Suggestion, getSuggestion } from '@/request';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ActionMethod, MutationMethod } from 'vuex/types/helpers';

const CloudTravaleModule = namespace('cloudTravel');

@Component
export default class CloudSearchPage extends Vue {
    @CloudTravaleModule.Mutation('updateSearchLocation')
    updateSearchLocation!: MutationMethod

    @CloudTravaleModule.Action('getOutlets')
    getOutlets!: ActionMethod

    searchSuggestions: Suggestion[] = [];

    location = "";
    cityCode = '';

    date = "";

    guests = "";

    locationIsOnFoucs = false
    updatePostionFocusState(state: boolean): void {
        this.locationIsOnFoucs = state;
    }

    mounted(): void {
        getSuggestion()
        .then(res => {
            this.searchSuggestions = res;
        });
    }

    goBackHome(): void {
        this.$router.push('/');
    }

    clickSuggestion(suggestion: Suggestion): void {
        this.location = suggestion.label;
        this.cityCode = suggestion.cityCode;
        this.updateSearchLocation(({
            value: suggestion.label
        }));
    }

    goSearch(): void {
        this.$router.push('/');
        this.cityCode.trim() && this.getOutlets(this.cityCode.trim());
    }
}
</script>

<style lang="less">
.search-page-header {
    display: flex;
    align-items: center;
    height: 55px;
    text-align: left;
    padding-left: 17px;
    border-bottom: 1px solid #ddd;
}

.search-page-title {
    margin-left: 21px;
    font-size: 16px;
    font-weight: 700;
}

.search-page-input-box {
    margin-top: 20px;
    padding: 0 20px;
}

.search-input-date {
    margin: 20px 0;
}

.search-page-button {
    margin-top: 20px;
    margin-left: 20px;
    width: 180px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background-color: @primary-foreground;
    border-radius: 3px;
}

.search-suggestions-m {
    text-align: left;
    padding-left: 0!important;
    margin-bottom: 0!important;
    border: 1px solid rgba(100, 100, 100, .1);
    transition: all .3s;
    height: 100px;
    opacity: 1;

    li {
        font-size: 10px;
        color: #ccc;
        margin: 3px 0 3px 10px;
        padding: 5px;
        border-bottom: 1px solid rgba(100, 100, 100, .1);
    }
}

.hide-suggestions-m {
    height: 0;
    opacity: 0;
}
</style>