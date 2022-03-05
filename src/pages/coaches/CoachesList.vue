<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      {{ error }}
    </base-dialog>
    <section>
      <coach-filter @change-filter="updateFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button @click="loadCoaches(true)">Refresh</base-button>
          <base-button v-if="!isCoach" link to="/register">
            Register as Coach
          </base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";

export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    ...mapGetters("coaches", {
      isCoach: "isCoach",
      hasCoaches: "hasCoaches",
    }),
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    updateFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(forceRefresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", { forceRefresh });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
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
