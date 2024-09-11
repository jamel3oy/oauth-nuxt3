<template>
    <button @click="signIn('custom-oauth')">Sign In with custom-oauth</button>
    {{ x }}
    <hr>
    <button @click="signOut()">Sign In with custom-oauth</button>
</template>
<script setup lang="ts">
const { signIn, getSession, signOut } = await useAuth()
const x = await getSession()
</script>