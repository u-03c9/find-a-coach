<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import RequestItem from "../../components/requests/RequestItem.vue";

const store = useStore();

const state = reactive({
  isLoading: false,
  error: null,
});

const receivedRequests = computed(() => {
  return store.getters["requests/requests"];
});

const hasRequests = computed(() => {
  return store.getters["requests/hasRequests"];
});

async function loadRequests() {
  state.isLoading = true;
  try {
    await store.dispatch("requests/fetchRequests");
  } catch (error) {
    state.error = error.message || "Failed to fetch requests from firebase!";
  }
  state.isLoading = false;
}

function handleError() {
  state.error = null;
}

onMounted(async () => {
  await loadRequests();
});
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
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <div v-if="state.isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasRequests">
          <request-item
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          ></request-item>
        </ul>
        <h3 v-else>You have not received any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
