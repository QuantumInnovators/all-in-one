<template>
  <div class="logo-container">
    <div class="logo">
      <span class="logo-icon">⭐</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavLogo'
}
</script>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.logo-icon {
  font-size: 2rem;
  color: white;
}
</style>