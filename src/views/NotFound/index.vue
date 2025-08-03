<template>
    <div class="not-found">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <router-link to="/club">Go back to Home</router-link>
    </div>
</template>

<script>
export default {
    name: "NotFound",
};
</script>

<style scoped>
.not-found {
    text-align: center;
    margin-top: 50px;
}
.not-found h1 {
    font-size: 2rem;
    color: #ff6b6b;
}
.not-found p {
    margin: 20px 0;
    font-size: 1.2rem;
}
</style>