<script setup lang="ts">
import BaseDialog from "../../components/ui/BaseDialog.vue";
import BaseSpinner from "../..//components/ui/BaseSpinner.vue";
import { reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();
const store = useStore();

const state = reactive({
  email: "",
  password: "",
  formIsValid: true,
  mode: "login",
  isLoading: false,
  error: null,
});

const submitButtonCaption = computed(() => {
  if (state.mode === "login") {
    return "Login";
  } else {
    return "Signup";
  }
});

const switchModeButtonCaption = computed(() => {
  if (state.mode === "login") {
    return "Signup instead";
  } else {
    return "Login instead";
  }
});

async function submitForm() {
  state.formIsValid = true;
  if (
    state.email === "" ||
    !state.email.includes("@") ||
    state.password.length < 6
  ) {
    state.formIsValid = false;
    return;
  }
  state.isLoading = true;
  try {
    const actionPayload = {
      email: state.email,
      password: state.password,
    };
    if (state.mode === "login") {
      await store.dispatch("login", actionPayload);
    } else if (state.mode === "signup") {
      await store.dispatch("signup", actionPayload);
    }
  } catch (error) {
    state.error = error.message || "Failed to authenticate.";
  }
  state.isLoading = false;

  const redirectUrl = "/" + (route.query.redirect || "coaches");

  router.replace(redirectUrl);
}

function switchAuthMode() {
  if (state.mode === "login") {
    state.mode = "signup";
  } else if (state.mode === "signup") {
    state.mode = "login";
  }
}

function handleCloseErrorDialog() {
  state.error = null;
}
</script>

<template>
  <div>
    <base-dialog
      :show="!!state.error"
      title="An error occurred"
      @close="handleCloseErrorDialog"
    >
      <p>{{ state.error }}</p>
    </base-dialog>
    <base-dialog :show="state.isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="state.email" />
        </div>

        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="state.password" />
        </div>

        <p v-if="!state.formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long)
        </p>

        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">
          {{ switchModeButtonCaption }}
        </base-button>
      </form>
    </base-card>
  </div>
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
