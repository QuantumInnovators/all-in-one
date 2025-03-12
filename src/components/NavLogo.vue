<template>
  <div class="logo-container">
    <div class="logo">
      <span class="logo-text">A</span>
      <span class="logo-circle"></span>
      <span class="logo-text">O</span>
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
  margin-bottom: 10px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo-text {
  font-size: 2.8rem;
  font-weight: bold;
  color: #3498db;
  letter-spacing: -2px;
}

.logo-circle {
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-radius: 50%;
  margin: 0 5px;
  position: relative;
  top: -2px;
}

.logo-text:first-child {
  color: #2c3e50;
}

.logo-text:last-child {
  color: #2c3e50;
}
</style> 