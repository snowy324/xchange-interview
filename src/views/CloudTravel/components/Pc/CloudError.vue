<template>
    <div class="cloud-error">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM9 14H11V16H9V14ZM9 4H11V12H9V4Z" fill="#757575"/>
        </svg>
        <div class="cloud-error-opps">
            Opps, something went wrong.
        </div>
        <div class="cloud-error-msg">
            {{searchError?.message}}
        </div>
    </div>
</template>

<script lang="ts">
import { AxiosError } from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const CloudTravaleModule = namespace('cloudTravel');

@Component
export default class CloudError extends Vue {
      @CloudTravaleModule.State('searchError') searchError!: AxiosError
}
</script>

<style lang="less">
.cloud-error {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    margin-top: 65px;

    .cloud-error-opps {
        font-size: 16px;
        font-weight: 700;
        color: #757575;
        margin-top: 19px;
    }

    .cloud-error-msg {
        font-size: 12px;
        font-weight: 400;
        color: #757575;
        margin-top: 6px;
    }
}
</style>