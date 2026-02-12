<template>
  <div class="container">
    <div class="question-page">
      <h1 class="title">Quiz Test</h1>

      <div v-if="loading" class="loading">
        Chargement des questions...
      </div>

      <div v-else-if="currentQuestion" class="question-container">
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

      <button
        v-if="!loading"
        class="action-button"
        @click="handleAction"
        :disabled="selectedValue === null && !isValidated"
      >
        {{ isValidated ? 'Question suivante' : 'Valider' }}
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
      loading: true
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
          question: atob(q.question),
          correct_answer: atob(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map(ans => atob(ans)),
          answers: allAnswers.sort(() => atob(q.type) === "multiple" ? Math.random() - 0.5 : -1) 
        };
      });
      console.log(this.questions);
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
      if (!this.isValidated) {
        this.isValidated = true;
        return;
      }

      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
        this.selectedValue = null;
        this.isValidated = false;
      } else {
        alert("Quiz terminé !");
      }
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
  background-color: #111827;
}

.question-page {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #111827;
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
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #2563eb;
  color: white;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.action-button:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.action-button:disabled {
  background-color: #374151;
  cursor: not-allowed;
}
</style>