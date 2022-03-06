<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const state = reactive({
  id: route.params.id,
  selectedCoach: null,
});

const fullName = computed(() => {
  return state.selectedCoach.firstName + " " + state.selectedCoach.lastName;
});

const contactLink = computed(() => {
  return route.path + "/contact";
});

const areas = computed(() => {
  return state.selectedCoach.areas;
});

const rate = computed(() => {
  return state.selectedCoach.hourlyRate;
});

const description = computed(() => {
  return state.selectedCoach.description;
});

const showContactButton = computed(() => {
  return !route.path.endsWith("/contact");
});

onBeforeMount(() => {
  state.selectedCoach = store.getters["coaches/coaches"].find(
    (coach) => coach.id === state.id
  );
});
</script>

<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink" v-if="showContactButton">
            Contact
          </base-button>
        </header>
        <router-view> </router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>
