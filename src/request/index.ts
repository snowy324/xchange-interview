import axios from "axios";

const cloudAxios = axios.create({
    timeout: 10000
});

cloudAxios.interceptors.response.use(response => {
    if (response.data) {
        return response.data;
    } else {
        return Promise.reject(new Error());
    }
}, error => {
    return Promise.reject(error);
});

export type Suggestion = {
    label: string,
    cityCode: string
}
export function getSuggestion(): Promise<Suggestion[]> {
    return cloudAxios.get("/job01/autosuggest");
}

export interface Location {
    address: string,
    city: string,
    country: string,
    countryCode: string,
    postalCode: string,
    latLng: {
        lat: number,
        lng: number
    }
}

export enum ScreenSize {
    'xs' = 'xs',
    's' = 's',
    'm' = 'm',
    'l' = 'l',
    'xl' = 'xl'
}

type GalleryImage = {
    [key in ScreenSize]: {
        caption: string;
        url: string;
    };
};

interface Package {
    nonRefundable?: boolean,
    payLater?: boolean,
    payAtHotel?: boolean,
    foodCode?: number,
    displayRate?: {
        value: number
    },
    adjustedDisplayRate?: {
        value: number
    }
}

export interface SingleHotel {
    packages: Package[],
    property: {
        covidSafety?: string,
        name: string,
        starRating: number,
        location: Location,
        heroImage: {
            url: string
        },
        reviews?: {
            summary: {
                text: string
            },
            covidSafety?: boolean
        },
        gallery: GalleryImage[]
    }
}

export interface SearchResult {
    meta: {
        [key: string]: unknown
    },
    outlets: {
        availability: {
            pagination: {
                totalItems: number,
                page: number
            },
            results: SingleHotel[]
        }
    }
}

export function serachByCityCode(cityCode: string): Promise<SearchResult> {
    return cloudAxios.get(`/job01/search/${cityCode}`);
}

export default cloudAxios;