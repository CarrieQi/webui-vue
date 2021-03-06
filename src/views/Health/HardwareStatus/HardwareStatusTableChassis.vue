<template>
  <page-section :section-title="$t('pageHardwareStatus.chassis')">
    <b-table
      responsive="md"
      hover
      :items="chassis"
      :fields="fields"
      show-empty
      :empty-text="$t('global.table.emptyMessage')"
    >
      <!-- Expand chevron icon -->
      <template #cell(expandRow)="row">
        <b-button
          variant="link"
          data-test-id="hardwareStatus-button-expandChassis"
          :title="expandRowLabel"
          class="btn-icon-only"
          @click="toggleRowDetails(row)"
        >
          <icon-chevron />
          <span class="sr-only">{{ expandRowLabel }}</span>
        </b-button>
      </template>

      <!-- Health -->
      <template #cell(health)="{ value }">
        <status-icon :status="statusIcon(value)" />
        {{ value }}
      </template>
      <!-- Toggle identify LED -->
      <template #cell(identifyLed)="row">
        <b-form-checkbox
          v-if="hasIdentifyLed(row.item.identifyLed)"
          v-model="row.item.identifyLed"
          name="switch"
          switch
          @change="toggleIdentifyLedValue(row.item)"
        >
          <span v-if="row.item.identifyLed">
            {{ $t('global.status.on') }}
          </span>
          <span v-else> {{ $t('global.status.off') }} </span>
        </b-form-checkbox>
        <div v-else>--</div>
      </template>
      <template #row-details="{ item }">
        <b-container fluid>
          <b-row>
            <b-col class="mt-2" sm="6" xl="6">
              <dl>
                <!-- Name -->
                <dt>{{ $t('pageHardwareStatus.table.name') }}:</dt>
                <dd>{{ tableFormatter(item.name) }}</dd>
                <!-- Part number -->
                <dt>{{ $t('pageHardwareStatus.table.partNumber') }}:</dt>
                <dd>{{ tableFormatter(item.partNumber) }}</dd>
                <!-- Serial Number -->
                <dt>{{ $t('pageHardwareStatus.table.serialNumber') }}:</dt>
                <dd>{{ tableFormatter(item.serialNumber) }}</dd>
                <!-- Model -->
                <dt>{{ $t('pageHardwareStatus.table.model') }}:</dt>
                <dd class="mb-2">
                  {{ tableFormatter(item.model) }}
                </dd>
                <!-- Asset tag -->
                <dt>{{ $t('pageHardwareStatus.table.assetTag') }}:</dt>
                <dd class="mb-2">
                  {{ tableFormatter(item.assetTag) }}
                </dd>
              </dl>
            </b-col>
            <b-col class="mt-2" sm="6" xl="6">
              <dl>
                <!-- Status state -->
                <dt>{{ $t('pageHardwareStatus.table.statusState') }}:</dt>
                <dd>{{ tableFormatter(item.statusState) }}</dd>
                <!-- Power state -->
                <dt>{{ $t('pageHardwareStatus.table.power') }}:</dt>
                <dd>{{ tableFormatter(item.power) }}</dd>
                <!-- Health rollup -->
                <dt>{{ $t('pageHardwareStatus.table.healthRollup') }}:</dt>
                <dd>{{ tableFormatter(item.healthRollup) }}</dd>
              </dl>
            </b-col>
          </b-row>
          <div class="section-divider mb-3 mt-3"></div>
          <b-row>
            <b-col class="mt-2" sm="6" xl="6">
              <dl>
                <!-- Manufacturer -->
                <dt>{{ $t('pageHardwareStatus.table.manufacturer') }}:</dt>
                <dd>{{ tableFormatter(item.manufacturer) }}</dd>
                <!-- Chassis Type -->
                <dt>{{ $t('pageHardwareStatus.table.chassisType') }}:</dt>
                <dd>{{ tableFormatter(item.chassisType) }}</dd>
              </dl>
            </b-col>
            <b-col class="mt-2" sm="6" xl="6">
              <dl>
                <!-- Min power -->
                <dt>{{ $t('pageHardwareStatus.table.minPowerWatts') }}:</dt>
                <dd>{{ tableFormatter(item.minPowerWatts) }}</dd>
                <!-- Max power -->
                <dt>{{ $t('pageHardwareStatus.table.maxPowerWatts') }}:</dt>
                <dd>{{ tableFormatter(item.maxPowerWatts) }}</dd>
              </dl>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-table>
  </page-section>
</template>

<script>
import PageSection from '@/components/Global/PageSection';
import IconChevron from '@carbon/icons-vue/es/chevron--down/20';
import BVToastMixin from '@/components/Mixins/BVToastMixin';
import StatusIcon from '@/components/Global/StatusIcon';

import TableRowExpandMixin, {
  expandRowLabel,
} from '@/components/Mixins/TableRowExpandMixin';
import TableDataFormatterMixin from '@/components/Mixins/TableDataFormatterMixin';

export default {
  components: { IconChevron, PageSection, StatusIcon },
  mixins: [BVToastMixin, TableRowExpandMixin, TableDataFormatterMixin],
  data() {
    return {
      fields: [
        {
          key: 'expandRow',
          label: '',
          tdClass: 'table-row-expand',
        },
        {
          key: 'id',
          label: this.$t('pageHardwareStatus.table.id'),
          formatter: this.tableFormatter,
        },
        {
          key: 'health',
          label: this.$t('pageHardwareStatus.table.health'),
          formatter: this.tableFormatter,
          tdClass: 'text-nowrap',
        },
        {
          key: 'locationNumber',
          label: this.$t('pageHardwareStatus.table.locationNumber'),
          formatter: this.tableFormatter,
        },
        {
          key: 'identifyLed',
          label: this.$t('pageHardwareStatus.table.identifyLed'),
          formatter: this.tableFormatter,
        },
      ],
      expandRowLabel: expandRowLabel,
    };
  },
  computed: {
    chassis() {
      return this.$store.getters['chassis/chassis'];
    },
  },
  created() {
    this.$store.dispatch('chassis/getChassisInfo').finally(() => {
      // Emit initial data fetch complete to parent component
      this.$root.$emit('hardware-status-chassis-complete');
    });
  },
  methods: {
    toggleIdentifyLedValue(row) {
      this.$store
        .dispatch('chassis/updateIdentifyLedValue', {
          uri: row.uri,
          identifyLed: row.identifyLed,
        })
        .catch(({ message }) => this.errorToast(message));
    },
    // TO DO: Remove this method when the LocationIndicatorActive is added from backend.
    hasIdentifyLed(identifyLed) {
      return typeof identifyLed === 'boolean';
    },
  },
};
</script>
