import { useMemo, useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    question: "Qual destas linguagens é tipicamente usada para estilizar páginas web?",
    answers: ["HTML", "CSS", "Python", "SQL"],
    correctAnswer: "CSS",
    explanation:
      "CSS é uma linguagem de estilo usada para controlar a apresentação visual de páginas web.",
  },
  {
    id: 2,
    question: "Qual método do array em JavaScript cria um novo array com os resultados de uma função aplicada a cada elemento?",
    answers: ["forEach", "map", "filter", "reduce"],
    correctAnswer: "map",
    explanation:
      "Array.prototype.map percorre o array e retorna um novo array com o resultado da função aplicada a cada item.",
  },
  {
    id: 3,
    question: "Em React, qual hook é usado para gerenciar estados em componentes funcionais?",
    answers: ["useEffect", "useState", "useContext", "useMemo"],
    correctAnswer: "useState",
    explanation:
      "O hook useState permite criar e atualizar estados dentro de componentes funcionais.",
  },
  {
    id: 4,
    question: "Qual comando é utilizado para inicializar um novo repositório Git?",
    answers: ["git start", "git init", "git create", "git new"],
    correctAnswer: "git init",
    explanation:
      "O comando git init cria um novo repositório Git vazio no diretório atual.",
  },
];

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, rgba(59,130,246,0.2), transparent 60%), linear-gradient(180deg, #0f172a 0%, #111827 100%)",
    color: "#e2e8f0",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "720px",
    background: "rgba(15, 23, 42, 0.85)",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 20px 45px rgba(15, 23, 42, 0.4)",
    border: "1px solid rgba(148, 163, 184, 0.1)",
    backdropFilter: "blur(12px)",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
  },
  questionCard: {
    background: "rgba(30, 41, 59, 0.8)",
    borderRadius: "20px",
    padding: "24px",
    marginBottom: "20px",
    border: "1px solid rgba(148, 163, 184, 0.1)",
  },
  questionText: {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: "16px",
    lineHeight: 1.4,
  },
  answersGrid: {
    display: "grid",
    gap: "12px",
  },
  answerButton: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "14px",
    border: "1px solid transparent",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    background: "rgba(15, 23, 42, 0.65)",
    color: "#e2e8f0",
    transition: "all 0.2s ease",
    textAlign: "left",
  },
  answerButtonHover: {
    background: "rgba(96, 165, 250, 0.18)",
    borderColor: "rgba(96, 165, 250, 0.6)",
  },
  answerButtonCorrect: {
    background: "rgba(34, 197, 94, 0.2)",
    borderColor: "rgba(34, 197, 94, 0.7)",
  },
  answerButtonWrong: {
    background: "rgba(248, 113, 113, 0.2)",
    borderColor: "rgba(248, 113, 113, 0.7)",
  },
  progressBar: {
    height: "10px",
    borderRadius: "999px",
    background: "rgba(148, 163, 184, 0.2)",
    overflow: "hidden",
    marginBottom: "24px",
  },
  progressFill: (percentage) => ({
    height: "100%",
    width: `${percentage}%`,
    background: "linear-gradient(90deg, #60a5fa, #8b5cf6)",
    transition: "width 0.4s ease",
  }),
  scoreBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    borderRadius: "999px",
    background: "rgba(59, 130, 246, 0.12)",
    color: "#bae6fd",
    fontWeight: 600,
    marginBottom: "16px",
  },
  feedbackCard: {
    marginTop: "16px",
    background: "rgba(15, 23, 42, 0.6)",
    borderRadius: "16px",
    padding: "16px",
    border: "1px solid rgba(148, 163, 184, 0.12)",
  },
  resetButton: {
    marginTop: "24px",
    padding: "12px 18px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #38bdf8, #6366f1)",
    color: "#0f172a",
    boxShadow: "0 12px 25px rgba(99, 102, 241, 0.35)",
  },
};

function useQuiz(questions) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const score = useMemo(
    () =>
      answers.reduce(
        (total, answer) =>
          answer.selected === answer.correctAnswer ? total + 1 : total,
        0
      ),
    [answers]
  );

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const answerAlreadyGiven = answers.some(
      (answer) => answer.id === currentQuestion.id
    );

    if (answerAlreadyGiven) {
      return;
    }

    const newAnswer = {
      id: currentQuestion.id,
      selected: selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation,
      question: currentQuestion.question,
    };

    setAnswers((prev) => [...prev, newAnswer]);

    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const reset = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
  };

  return {
    currentQuestionIndex,
    currentQuestion: questions[currentQuestionIndex],
    totalQuestions: questions.length,
    answers,
    score,
    handleAnswer,
    reset,
    isFinished: answers.length === questions.length,
  };
}

function AnswerButton({
  answer,
  isSelected,
  isCorrect,
  reveal,
  onSelect,
}) {
  const baseStyles = styles.answerButton;

  let stateStyle = {};
  if (reveal) {
    stateStyle = isCorrect
      ? styles.answerButtonCorrect
      : isSelected
      ? styles.answerButtonWrong
      : {};
  }

  return (
    <button
      type="button"
      style={{
        ...baseStyles,
        ...(reveal ? stateStyle : {}),
      }}
      onClick={onSelect}
      disabled={reveal}
      onMouseEnter={(event) => {
        if (!reveal) {
          Object.assign(event.currentTarget.style, styles.answerButtonHover);
        }
      }}
      onMouseLeave={(event) => {
        if (!reveal) {
          Object.assign(event.currentTarget.style, baseStyles);
        }
      }}
    >
      {answer}
    </button>
  );
}

function QuestionCard({ question, onAnswer, userAnswer, reveal }) {
  return (
    <div style={styles.questionCard}>
      <h2 style={styles.questionText}>{question.question}</h2>
      <div style={styles.answersGrid}>
        {question.answers.map((answerOption) => (
          <AnswerButton
            key={answerOption}
            answer={answerOption}
            onSelect={() => onAnswer(answerOption)}
            isSelected={userAnswer?.selected === answerOption}
            isCorrect={question.correctAnswer === answerOption}
            reveal={reveal}
          />
        ))}
      </div>
      {reveal && userAnswer && (
        <div style={styles.feedbackCard}>
          <p style={{ fontWeight: 600, marginBottom: "8px" }}>
            {userAnswer.selected === userAnswer.correctAnswer
              ? "Você acertou! 🎉"
              : "Não foi dessa vez..."}
          </p>
          <p style={{ color: "#cbd5f5", lineHeight: 1.5 }}>
            {userAnswer.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

function QuizResults({ score, totalQuestions, onReset, answers }) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const performanceLabel =
    percentage === 100
      ? "Perfeito! Você dominou o conteúdo."
      : percentage >= 75
      ? "Excelente trabalho!"
      : percentage >= 50
      ? "Bom esforço, continue praticando!"
      : "Vamos revisar um pouco mais?";

  return (
    <div style={styles.questionCard}>
      <div style={styles.scoreBadge}>
        🧠 Resultado
        <span style={{ fontWeight: 700, color: "#38bdf8" }}>
          {score} / {totalQuestions}
        </span>
      </div>
      <h2 style={{ marginBottom: "12px" }}>{performanceLabel}</h2>
      <p style={{ color: "#cbd5f5", marginBottom: "16px" }}>
        Você acertou {score} de {totalQuestions} perguntas ({percentage}%).
      </p>
      <div style={{ display: "grid", gap: "12px" }}>
        {answers.map((answer) => (
          <div key={answer.id} style={styles.feedbackCard}>
            <p style={{ fontWeight: 600, marginBottom: "8px" }}>{answer.question}</p>
            <p style={{ marginBottom: "4px" }}>
              Sua resposta: <strong>{answer.selected}</strong>
            </p>
            <p>
              Correta: <strong>{answer.correctAnswer}</strong>
            </p>
          </div>
        ))}
      </div>
      <button type="button" style={styles.resetButton} onClick={onReset}>
        Tentar novamente
      </button>
    </div>
  );
}

export default function Home() {
  const {
    currentQuestionIndex,
    currentQuestion,
    totalQuestions,
    answers,
    score,
    handleAnswer,
    reset,
    isFinished,
  } = useQuiz(QUESTIONS);

  const progress = Math.round((answers.length / totalQuestions) * 100);
  const currentAnswer = answers.find((answer) => answer.id === currentQuestion?.id);

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <p style={{ letterSpacing: "0.2em", textTransform: "uppercase", color: "#38bdf8" }}>
            CRMJA Quiz Lab
          </p>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>
            Teste seus conhecimentos
          </h1>
          <p style={{ color: "#cbd5f5" }}>
            Responda às perguntas e descubra seu nível em tecnologia e desenvolvimento.
          </p>
        </header>

        <div style={styles.progressBar}>
          <div style={styles.progressFill(progress)} />
        </div>

        <p style={{ marginBottom: "16px", color: "#94a3b8" }}>
          Pergunta {Math.min(currentQuestionIndex + 1, totalQuestions)} de {totalQuestions}
        </p>

        {currentQuestion && !isFinished ? (
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            userAnswer={currentAnswer}
            reveal={Boolean(currentAnswer)}
          />
        ) : (
          <QuizResults
            score={score}
            totalQuestions={totalQuestions}
            onReset={reset}
            answers={answers}
          />
        )}
      </div>
    </main>
  );
}
