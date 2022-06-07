// vuex.d.ts
import { Store } from 'vuex';
import { VuexState } from '@store/types';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<VuexState>
  }
}