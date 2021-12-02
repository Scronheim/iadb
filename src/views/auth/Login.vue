<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex class="xs12 sm4 elevation-6">
        <v-card>
          <v-card-title style="background-color: #313131">Welcome!</v-card-title>
          <v-card-text class="pt-4">
            <v-form v-model="valid" ref="form">
              <v-text-field
                  label="Enter your username"
                  v-model="user.username"
                  :rules="usernameRules"
                  required
              />
              <v-text-field
                  label="Enter your password"
                  v-model="user.password"
                  :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="e1 = !e1"
                  :type="e1 ? 'password' : 'text'"
                  :rules="passwordRules"
                  required
              />
              <v-layout justify-space-between>
                <v-btn text color="orange" :disabled="!valid" @click="login">Login</v-btn>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    valid: false,
    e1: true,
    user: {
      username: null,
      password: null,
    },
    usernameRules: [
      (v) => !!v || 'E-mail is required',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
    ],
  }),
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch('login', this.user)
      }
    }
  }
}
</script>

<style scoped>

</style>
