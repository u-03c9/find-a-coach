<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import CoachForm from "../../components/coaches/CoachForm.vue";

const store = useStore();
const router = useRouter();

const isCoach = computed(() => {
  return store.getters["coaches/isCoach"];
});

function saveData(data) {
  store.dispatch("coaches/registerCoach", data);
  router.replace("/coaches");
}
</script>

<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>
