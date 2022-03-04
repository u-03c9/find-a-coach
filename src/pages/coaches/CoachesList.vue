<template>
  <section>Filter</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link :to="{ name: 'register-coach' }">
        Register as Coach
      </router-link>
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
