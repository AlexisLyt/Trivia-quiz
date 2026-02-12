<script setup>
import router from '@/router';
function goToQuiz () {
  router.push("/quiz")
}
</script>

<template>
  <main class="home-container">
    <div class="content">
      <img src="@/assets/logo.png" alt="Trivia Quiz Logo" class="logo" />
      <button class="start-btn" @click="goToQuiz">Start Playing</button>
    </div>
  </main>
</template>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1a1a1a;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.logo {
  width: 200px;
  height: auto;
  object-fit: contain;
}

.start-btn {
  padding: 12px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.start-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.4);
}
</style>
