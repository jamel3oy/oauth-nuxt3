<template>
    <div>
        ===>{{ JSON.stringify(jwt) }}
    </div>
</template>
<script setup lang="ts">
    const jwt = useState()
    jwt.value = "dddd"
</script>