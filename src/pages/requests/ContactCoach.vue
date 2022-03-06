<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const router = useRouter();

const state = reactive({
  email: "",
  message: "",
  formIsValid: true,
});

function validateForm() {
  state.formIsValid = true;
  if (
    state.email === "" ||
    !state.email.includes("@") ||
    state.message === ""
  ) {
    state.formIsValid = false;
  }
}

function submitForm() {
  validateForm();
  if (!state.formIsValid) return;
  store.dispatch("requests/contactCoach", {
    email: state.email,
    message: state.message,
    coachId: route.params.id,
  });
  router.replace("/");
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your E-Mail</label>
      <input type="email" id="email" v-model.trim="state.email" />
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea id="message" rows="5" v-model.trim="state.message"></textarea>
    </div>
    <p class="errors" v-if="!state.formIsValid">
      Please enter a valid message and email.
    </p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
  resize: vertical;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
