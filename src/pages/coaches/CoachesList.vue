<template>
  <section>Filter</section>
  <section>
    <base-card>
      <div class="controls">
        <base-button>Refresh</base-button>
        <base-button link to="/register">
          Register as Coach
        </base-button>
      </div>
      <ul v-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :areas="coach.areas"
          :rate="coach.hourlyRate"
        >
        </coach-item>
      </ul>
      <p v-else>No coaches found.</p>
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import CoachItem from "@/components/coaches/CoachItem.vue";

export default {
  components: { CoachItem },
  computed: {
    ...mapGetters("coaches", {
      filteredCoaches: "coaches",
      hasCoaches: "hasCoaches",
    }),
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
