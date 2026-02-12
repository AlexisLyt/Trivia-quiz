<template>
  <div class="container">
    <div class="question-page">
      <h1 class="title">Quiz Test</h1>

      <div v-if="loading" class="loading">
        Loading questions...
      </div>

      <!-- Question display -->
      <div v-else-if="currentQuestion && !finished" class="question-container">
        <h2 class="question-text">{{ currentQuestion.question }}</h2>

        <AnswerCard
          v-for="(answer, index) in currentQuestion.answers"
          :key="index"
          :text="answer"
          :value="answer"
          :selectedValue="selectedValue"
          :correctValue="currentQuestion.correct_answer"
          :isValidated="isValidated"
          @select="handleSelect"
        />
      </div>

      <!-- Result display -->
      <div v-else-if="finished" class="result-container">
        <h2 class="result-title">Quiz terminé 🎉</h2>
        <p class="result-score">
          Score final : <strong>{{ score }}</strong> / {{ questions.length }}
        </p>

        <button class="replay-button" @click="goHome">
          Rejouer
        </button>
      </div>

      <!-- Action button -->
      <button
        v-if="!loading && !finished"
        class="action-button"
        @click="handleAction"
        :disabled="selectedValue === null && !isValidated"
      >
        {{ isValidated ? (isLastQuestion ? 'Finish quiz' : 'Next question') : 'Validate' }}
      </button>
    </div>
  </div>
</template>

<script>
import AnswerCard from "@/components/AnswerCard.vue";

export default {
  name: "QuestionView",

  components: {
    AnswerCard
  },

  data() {
    return {
      questions: [],
      currentIndex: 0,
      selectedValue: null,
      isValidated: false,
      loading: true,
      finished: false,
      score: 0,
      isLastQuestion: false,
    };
  },

  async created() {
    const url = "https://opentdb.com/api.php?amount=10&difficulty=easy&encode=base64";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error : ${response.status} - ${response.statusText}`);
      }
      const result = await response.json();
      this.questions = result.results.map(q => {
        const allAnswers = [...q.incorrect_answers.map(ans => atob(ans)), atob(q.correct_answer)];
        return {
          category: atob(q.category),
          type: atob(q.type),
          difficulty: atob(q.difficulty),
          question: atob(q.question).replace(/Ã©/g, 'é').replace(/Ã¨/g, 'è'),
          correct_answer: atob(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map(ans => atob(ans)),
          answers: allAnswers.sort(() => atob(q.type) === "multiple" ? Math.random() - 0.5 : -1)
        };
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },

  computed: {
    currentQuestion() {
      if (!this.questions || this.questions.length === 0) return null;
      return this.questions[this.currentIndex];
    }
  },

  methods: {
    handleSelect(value) {
      if (this.isValidated) return;
      this.selectedValue = value;
    },

    handleAction() {
      if (this.currentIndex === this.questions.length - 1) {
        this.isLastQuestion = true;
      }

      if (!this.isValidated) {
        this.isValidated = true;
        return;
      }

      if (this.selectedValue === this.currentQuestion.correct_answer) {
        this.score++;
      }

      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
        this.selectedValue = null;
        this.isValidated = false;
      } else {
        this.finished = true;
      }
    },

    goHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.loading {
  text-align: center;
  color: #fff;
  font-size: 1.2rem;
}

.container {
  background-color: #1a1a1a;
  min-height: 100vh;
}

.question-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: Arial, sans-serif;
  background-color: #1a1a1a;
  color: #f9fafb;
  min-height: 100vh;
}

.title {
  text-align: center;
  margin-bottom: 30px;
}

.question-container {
  margin-bottom: 20px;
}

.question-text {
  margin-bottom: 15px;
}

.action-button {
  padding: 12px 30px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.action-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

.result-container {
  text-align: center;
  margin-top: 40px;
}

.result-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.result-score {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.replay-button {
  padding: 12px 40px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.replay-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}
</style>