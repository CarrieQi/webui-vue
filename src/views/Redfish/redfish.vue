<template>
  <div key="redfishpage">
    <div>
      <div class="left-nav">
        <img
          src="/DMTF_Redfish_logo_2017.svg"
          alt="redfish"
          width="150px"
          @click="changeRedfishData('/redfish/v1/')"
        />
        <ul>
          <li
            v-for="nav in navData"
            :key="nav"
            @click="changeRedfishData(originalData[nav]['@odata.id'])"
          >
            {{ nav }}
          </li>
        </ul>
      </div>
      <div class="right-con">
        <redfishItem
          v-if="!!redfish_data"
          :item-data="redfish_data"
          @changeData="changeRedfishData"
        ></redfishItem>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/store/api';
import redfishItem from './redfish_item';
export default {
  name: 'Redfish',
  components: { redfishItem },
  data() {
    return {
      redfish_data: null,
      originalData: null,
      navData: [],
    };
  },
  beforeMount: function () {
    let that = this;
    api.get('/redfish/v1/').then((data) => {
      that.redfish_data = data.data;
      that.originalData = data.data;
      that.navData = Object.keys(that.redfish_data);
      that.navData = that.navData.filter(
        (x) => typeof that.redfish_data[x] == 'object' && x !== 'Links'
      );
    });
  },
  methods: {
    getRedfishDate: function (url) {
      let that = this;
      api
        .get(url)
        .then((data) => {
          that.redfish_data = data.data;
        })
        .catch(() => {
          that.redfish_data = {};
        });
    },
    changeRedfishData: function (url) {
      this.getRedfishDate(url);
    },
  },
};
</script>

<style>
.left-nav {
  width: 200px;
  float: left;
}
.left-nav ul li {
  list-style-type: none;
  margin-bottom: 10px;
  cursor: pointer;
}
.right-con {
  float: left;
  width: calc(100% - 200px);
  padding: 10px;
  border-left: 1px solid #ddd;
}
</style>
