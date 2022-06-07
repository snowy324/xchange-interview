
<template>
  <div>
    <ul class="cloud-footer-links">
      <li v-for="link in links" :key="link.name">
        {{link.name}}
        <!-- we should put link here -->
      </li>
    </ul>
    <div class="cloud-footer-copyright">
      Copyright CloudTravel2021.
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

type Link = {
  name: string,
  link?: string
}

@Component({
  components: {

  },
})
export default class CloudFooter extends Vue {
  links: Link[] = [
    {
      name: "FAQ"
    },
    {
      name: "Teams of use"
    },
    {
      name: "Privacy policy"
    },
    {
      name: "Contract us"
    }
  ]
}
</script>

<style lang="less">
.cloud-footer-links {
  &:extend(.cloud-flex-box);

  margin-top: 0!important;
  margin-bottom: 0!important;
  height: 70px;
  background-color: @primary-font-color;
  color: #fff;

  li {
    font-size: 14px;
    margin: 0 20px;
  }
}

.cloud-footer-copyright {
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  background-color: #000;
}
</style>