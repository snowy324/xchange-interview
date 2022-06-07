<template>
    <div class="cloud-loading">
        <div v-for="n in 5" :key="n" class="ph-item">
            <div class="ph-col-3">
                <div class="ph-col-3 ph-picture"></div>
                <div class="ph-row">
                    <div class="ph-col-12 big"></div>
                </div>
            </div>
            <div class="ph-col-6">
                <div class="ph-row">
                    <div class="ph-col-12 big"></div>
                </div>
                <div class="ph-row">
                    <div class="ph-col-12 big"></div>
                </div>
                <div class="ph-row">
                    <div class="ph-col-12 big"></div>
                </div>
                <div class="ph-row">
                    <div class="ph-col-12 big"></div>
                </div>
                <div class="ph-row">
                    <div class="ph-col-12 big"></div>
                </div>
            </div>
            <div class="ph-col-3">
                <div class="ph-col-3 ph-picture"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CloudLoading extends Vue {

}
</script>

<style lang="less">
.cloud-loading {
    flex: 1;
    margin-left: 10px;
}
</style>