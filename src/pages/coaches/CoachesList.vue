<script setup lang="ts">
import { useStore } from "vuex";
import { computed, onBeforeMount, reactive } from "vue";

import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

const store = useStore();

const state = reactive({
  isLoading: false,
  error: null,
  activeFilters: {
    frontend: true,
    backend: true,
    career: true,
  },
});

const isCoach = computed(() => store.getters["coaches/isCoach"]);
const hasCoaches = computed(() => store.getters["coaches/hasCoaches"]);

const isLoggedIn = computed(() => {
  return store.getters.isUserAuthenticated;
});

const filteredCoaches = computed(() => {
  const coaches = store.getters["coaches/coaches"];
  return coaches.filter((coach) => {
    if (state.activeFilters.frontend && coach.areas.includes("frontend")) {
      return true;
    }
    if (state.activeFilters.backend && coach.areas.includes("backend")) {
      return true;
    }
    if (state.activeFilters.career && coach.areas.includes("career")) {
      return true;
    }
    return false;
  });
});

onBeforeMount(async () => {
  await loadCoaches();
});

function updateFilters(updatedFilters) {
  state.activeFilters = updatedFilters;
}

async function loadCoaches(forceRefresh = false) {
  state.isLoading = true;
  try {
    await store.dispatch("coaches/loadCoaches", { forceRefresh });
  } catch (error) {
    state.error = error.message || "Something went wrong!";
  }
  state.isLoading = false;
}

function handleError() {
  state.error = null;
}
</script>

<template>
  <div>
    <base-dialog
      :show="!!state.error"
      title="An error occurred!"
      @close="handleError"
    >
      {{ state.error }}
    </base-dialog>
    <section>
      <coach-filter @change-filter="updateFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button @click="loadCoaches(true)">Refresh</base-button>
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">
            Login to register as Coach
          </base-button>
          <base-button
            v-if="isLoggedIn && !isCoach && !state.isLoading"
            link
            to="/register"
          >
            Register as Coach
          </base-button>
        </div>
        <div v-if="state.isLoading">
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
