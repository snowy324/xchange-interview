<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import elementResizeDetectorMaker from 'element-resize-detector';
import { MutationMethod } from 'vuex';
import { ScreenSize } from '@request/index';

const CloudTravaleModule = namespace('cloudTravel');

@Component
export default class App extends Vue {
  @CloudTravaleModule.Mutation('updateScreenSize') updateScreenSize!: MutationMethod

  listener(element: HTMLElement) {
    const width = element.offsetWidth;
    let screenSize: ScreenSize
    switch (true) {
      case (width > 1200):
        screenSize = ScreenSize.xl;
        break;
      case (width > 992):
        screenSize = ScreenSize.l;
        break;
      case (width > 769):
        screenSize = ScreenSize.m;
        break;
      case (width > 576):
        screenSize = ScreenSize.s;
        break;
      case (width <= 576):
        screenSize = ScreenSize.xs;
        break;
      default:
        screenSize = ScreenSize.xl;
    }
    this.updateScreenSize(screenSize);
  }

  erd: elementResizeDetectorMaker.Erd | null = null

  startToListen(): void {
    this.erd = elementResizeDetectorMaker();
    document.getElementById("app") ? this.erd.listenTo(document.getElementById("app") as HTMLElement, this.listener) : null;
  }

  mounted(): void {
    this.startToListen();
  }

  beforeDestroy(): void {
    document.getElementById("app") ? this.erd!.removeListener(document.getElementById("app") as HTMLElement, this.listener) : null;
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
