<template>
  <div
    class="answer-card"
    :class="computedClasses"
    @click="this.handleClick"
  >
    <span class="answer-text">{{ this.text }}</span>
  </div>
</template>

<script>
export default {
  name: "AnswerCard",

  props: {
    text: {
      type: String,
      required: true
    },

    value: {
      type: [String, Number],
      required: true
    },

    selectedValue: {
      type: [String, Number],
      default: null
    },

    correctValue: {
      type: [String, Number],
      default: null
    },

    isValidated: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    computedClasses() {
      const classes = [];

      const isSelected = this.selectedValue === this.value;
      const isCorrect = this.correctValue === this.value;

      if (!this.isValidated) {
        if (isSelected) {
          classes.push("selected");
        }
      } else {
        if (isCorrect) {
          classes.push("correct");
        } else if (isSelected && !isCorrect) {
          classes.push("incorrect");
        } else {
          classes.push("disabled");
        }
      }

      return classes;
    }
  },

  methods: {
    handleClick() {
      if (this.isValidated) {
        return;
      }

      this.$emit("select", this.value);
    }
  }
};
</script>

<style scoped>
/* Base dark card */
.answer-card {
  border: 2px solid #374151;
  border-radius: 14px;
  padding: 16px 20px;
  margin-bottom: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  user-select: none;
  background-color: #1f2937;
  color: #f9fafb;
}

.answer-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4);
  border-color: #4b5563;
}

.answer-text {
  font-size: 16px;
}

/* Selected before validation */
.selected {
  border-color: #3b82f6;
  background-color: rgba(59, 130, 246, 0.15);
}

/* Correct answer after validation */
.correct {
  border-color: #22c55e;
  background-color: rgba(34, 197, 94, 0.2);
}

/* Incorrect selected answer after validation */
.incorrect {
  border-color: #ef4444;
  background-color: rgba(239, 68, 68, 0.2);
}

/* Other answers after validation */
.disabled {
  border-color: #374151;
  background-color: #111827;
  color: #6b7280;
  cursor: default;
  opacity: 0.7;
}
</style>