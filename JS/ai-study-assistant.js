// ========================================
// AI STUDY ASSISTANT - QUIZ
// ========================================

const questions = document.querySelectorAll(".quiz-question");
const submitQuiz = document.getElementById("submitQuiz");
const quizResult = document.getElementById("quizResult");

questions.forEach(function (question) {

    const buttons = question.querySelectorAll("button");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Remove previous selection
            buttons.forEach(function (btn) {
                btn.classList.remove("selected");
                btn.classList.remove("correct");
                btn.classList.remove("wrong");
            });

            // Check answer immediately
            if (button.dataset.correct === "true") {

                button.classList.add("correct");
                button.innerHTML = "✅ " + button.textContent;

            } else {

                button.classList.add("wrong");
                button.innerHTML = "❌ " + button.textContent;

                // Also show the correct answer
                buttons.forEach(function (btn) {

                    if (btn.dataset.correct === "true") {
                        btn.classList.add("correct");

                        if (!btn.textContent.includes("✅")) {
                            btn.innerHTML = "✅ " + btn.textContent;
                        }
                    }

                });

            }

            // Save selected answer
            question.dataset.answer = button.dataset.correct;

            // Disable buttons after answering
            buttons.forEach(function (btn) {
                btn.disabled = true;
            });

        });

    });

});


// ========================================
// CHECK QUIZ SCORE
// ========================================

submitQuiz.addEventListener("click", function () {

    let score = 0;
    let answered = 0;

    questions.forEach(function (question) {

        if (question.dataset.answer) {

            answered++;

            if (question.dataset.answer === "true") {
                score++;
            }

        }

    });


    if (answered < questions.length) {

        quizResult.innerHTML =
            "⚠️ Please answer all 5 questions first.";

        return;

    }


    if (score === 5) {

        quizResult.innerHTML =
            "🏆 Excellent! You scored 5/5.";

    } else if (score === 4) {

        quizResult.innerHTML =
            "🌟 Great job! You scored 4/5.";

    } else if (score === 3) {

        quizResult.innerHTML =
            "👍 Good effort! You scored 3/5.";

    } else {

        quizResult.innerHTML =
            "💡 Keep practicing! You scored " + score + "/5.";

    }

});