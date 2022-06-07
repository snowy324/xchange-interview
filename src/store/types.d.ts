import { SearchResult, ScreenSize } from '@request/index';
import { AxiosError } from 'axios';

export interface CloudTravelState {
    searchLocation: string,
    searchResult?: SearchResult,
    searchError?: AxiosError,
    searchLoading: boolean,
    screenSize: ScreenSize
}

export interface VuexState {
    cloudTravale: CloudTravelState
}