<template>
    <div class="hotel-tag">
        {{tag}}
    </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class HotelTag extends Vue {
    @Prop(String) tag!: string 
}
</script>

<style lang="less">
.hotel-tag {
    font-size: 12px;
    line-height: 20px;
    border: 1px #00A1E5 solid;
    padding: 2px 5px;
    color: #00A1E5;
}
</style>