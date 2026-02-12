<template>
  <div class="question-page">
    <h1 class="title">Quiz Test</h1>

    <div class="question-container">
      <h2 class="question-text">{{ this.currentQuestion.question }}</h2>

      <AnswerCard
        v-for="answer in this.currentQuestion.answers"
        :key="answer.value"
        :text="answer.text"
        :value="answer.value"
        :selectedValue="this.selectedValue"
        :correctValue="this.currentQuestion.correctAnswer"
        :isValidated="this.isValidated"
        @select="this.handleSelect"
      />
    </div>

    <button
      class="action-button"
      @click="this.handleAction"
      :disabled="this.selectedValue === null && !this.isValidated"
    >
      {{ this.isValidated ? 'Question suivante' : 'Valider' }}
    </button>
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
      currentIndex: 0,
      selectedValue: null,
      isValidated: false,
      questions: [
        {
          question: "Quelle est la capitale de la France ?",
          correctAnswer: "b",
          answers: [
            { value: "a", text: "Madrid" },
            { value: "b", text: "Paris" },
            { value: "c", text: "Rome" },
            { value: "d", text: "Berlin" }
          ]
        },
        {
          question: "Combien font 2 + 2 ?",
          correctAnswer: 2,
          answers: [
            { value: 1, text: "3" },
            { value: 2, text: "4" },
            { value: 3, text: "5" },
            { value: 4, text: "22" }
          ]
        }
      ]
    };
  },

  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex];
    }
  },

  methods: {
    // Handle selection from child component
    handleSelect(value) {
      this.selectedValue = value;
    },

    // Handle validate / next question logic with one button
    handleAction() {
      // If not validated yet → validate
      if (!this.isValidated) {
        this.isValidated = true;
        return;
      }

      // If already validated → go to next question
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
        this.selectedValue = null;
        this.isValidated = false;
      }
    }
  }
};
</script>

<style scoped>
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