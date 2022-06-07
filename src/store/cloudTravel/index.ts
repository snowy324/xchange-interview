import { CloudTravelState, VuexState } from '../types';
import { SearchResult, serachByCityCode, ScreenSize } from '@request/index';
import { Module } from 'vuex';
import { AxiosError } from 'axios';

const PC_SIZE = [ScreenSize.l, ScreenSize.xl];

const cloudTravel: Module<CloudTravelState, VuexState> = {
    namespaced: true,
    state: (): CloudTravelState => ({
        searchLocation: "",
        searchResult: undefined,
        searchError: undefined,
        searchLoading: false,
        screenSize: ScreenSize.l
    }),
    getters: {
        isPc(state: CloudTravelState): boolean {
            return PC_SIZE.includes(state.screenSize);
        }
    },
    mutations: {
        updateSearchLocation(state: CloudTravelState, location: {value: string}) {
            state.searchLocation = location.value;
            state.searchResult = undefined;
        },
        updateOuelets(state: CloudTravelState, searchResult: SearchResult) {
            state.searchResult = searchResult;
        },
        updateOutletsError(state: CloudTravelState, searchError: AxiosError | undefined) {
            state.searchError = searchError;
        },
        updateSearchLoading(state: CloudTravelState, loading: boolean) {
            state.searchLoading = loading;
        },
        updateScreenSize(state: CloudTravelState, screenSize: ScreenSize) {
            state.screenSize = screenSize;
        }
    },
    actions: {
        async getOutlets(store, cityCode: string) {
            try {
                store.commit("updateOutletsError", undefined);
                store.commit("updateSearchLoading", true);
                let res = await serachByCityCode(cityCode);
                store.commit("updateOuelets", res);
            } catch(err) {
                store.commit("updateOutletsError", err);
                throw err;
            } finally {
                store.commit("updateSearchLoading", false);
            }
        }
    }
};

export default cloudTravel;