<template>
  <div class="cloud-language">
    English
    <a-icon class="language-icon" type="caret-down" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    
  },
})
export default class Language extends Vue {

}
</script>

<style lang="less">
.cloud-language {
  margin-right: 20px;
}

.language-icon {
  position: relative;
  top: -4px;
  margin-left: 3px;
  font-size: 10px;
  color: #000;
}
</style>
