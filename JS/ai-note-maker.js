// ========================================
// AI NOTE MAKER
// ========================================

const noteInput = document.getElementById("noteInput");
const notesOutput = document.getElementById("notesOutput");

const generateNotes = document.getElementById("generateNotes");
const clearNotes = document.getElementById("clearNotes");
const copyNotes = document.getElementById("copyNotes");

const characterCount = document.getElementById("characterCount");


// ========================================
// CHARACTER COUNT
// ========================================

noteInput.addEventListener("input", function () {

    characterCount.textContent = noteInput.value.length;

});


// ========================================
// GENERATE NOTES
// ========================================

generateNotes.addEventListener("click", function () {

    const text = noteInput.value.trim();

    if (text === "") {

        notesOutput.innerHTML = `
            <div class="empty-notes">
                <div class="empty-icon">⚠️</div>

                <h4>Please enter some study material</h4>

                <p>
                    Add a topic, lesson, or paragraph first.
                </p>
            </div>
        `;

        return;
    }


    // Split text into sentences
    const sentences = text
        .split(/[.!?]+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0);


    // Create key points
    const keyPoints = sentences.slice(0, 6);


    // Create notes
    let pointsHTML = "";

    keyPoints.forEach(function (point) {

        pointsHTML += `
            <li>${point}</li>
        `;

    });


    notesOutput.innerHTML = `

        <div class="generated-note">

            <div class="generated-note-title">
                📚 Smart Study Notes
            </div>

            <h4>📌 Key Points</h4>

            <ul>
                ${pointsHTML}
            </ul>

            <div class="note-highlight">
                💡 Review these points regularly for better revision.
            </div>

        </div>

    `;

});


// ========================================
// CLEAR NOTES
// ========================================

clearNotes.addEventListener("click", function () {

    noteInput.value = "";

    characterCount.textContent = "0";

    notesOutput.innerHTML = `

        <div class="empty-notes">

            <div class="empty-icon">
                ✨
            </div>

            <h4>
                Ready to Create Notes?
            </h4>

            <p>
                Enter your study material and click
                <strong>Generate Notes</strong>.
            </p>

        </div>

    `;

});


// ========================================
// COPY NOTES
// ========================================

copyNotes.addEventListener("click", function () {

    const text = notesOutput.innerText.trim();

    if (!text) {

        return;

    }


    navigator.clipboard.writeText(text).then(function () {

        copyNotes.textContent = "✅ Copied!";

        setTimeout(function () {

            copyNotes.textContent = "📋 Copy Notes";

        }, 2000);

    });

});


// ========================================
// STUDY TOOLS
// ========================================

const toolButtons = document.querySelectorAll(".tool-btn");


toolButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const tool = button.dataset.tool;

        const text = noteInput.value.trim();


        if (text === "") {

            notesOutput.innerHTML = `

                <div class="empty-notes">

                    <div class="empty-icon">
                        ⚠️
                    </div>

                    <h4>
                        Add your study material first
                    </h4>

                    <p>
                        Enter some content above and then
                        choose a study tool.
                    </p>

                </div>

            `;

            noteInput.focus();

            return;

        }


        const sentences = text
            .split(/[.!?]+/)
            .map(sentence => sentence.trim())
            .filter(sentence => sentence.length > 0);


        let title = "";
        let content = "";


        // --------------------------------
        // SUMMARY
        // --------------------------------

        if (tool === "summary") {

            title = "📖 Quick Summary";

            const summary = sentences.slice(0, 3);

            content = `
                <ul>
                    ${summary.map(item => `<li>${item}</li>`).join("")}
                </ul>
            `;

        }


        // --------------------------------
        // KEY POINTS
        // --------------------------------

        else if (tool === "keypoints") {

            title = "📌 Key Points";

            const points = sentences.slice(0, 6);

            content = `
                <ul>
                    ${points.map(item => `<li>${item}</li>`).join("")}
                </ul>
            `;

        }


        // --------------------------------
        // IMPORTANT QUESTIONS
        // --------------------------------

        else if (tool === "questions") {

            title = "❓ Important Questions";

            const questions = sentences.slice(0, 5);

            content = `
                <ol>
                    ${questions.map(item => `<li>Explain: ${item}?</li>`).join("")}
                </ol>
            `;

        }


        // --------------------------------
        // SHORT NOTES
        // --------------------------------

        else if (tool === "shortnotes") {

            title = "🧠 Short Notes";

            const shortNotes = sentences.slice(0, 4);

            content = `
                <div class="short-note-list">

                    ${shortNotes.map(item => `
                        <div class="short-note-item">
                            💜 ${item}
                        </div>
                    `).join("")}

                </div>
            `;

        }


        notesOutput.innerHTML = `

            <div class="generated-note">

                <div class="generated-note-title">
                    ${title}
                </div>

                ${content}

            </div>

        `;


        // Scroll to output

        notesOutput.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});


// ========================================
// QUICK QUIZ
// ========================================

const quizQuestions =
    document.querySelectorAll(".note-quiz-question");

const checkNoteQuiz =
    document.getElementById("checkNoteQuiz");

const noteQuizResult =
    document.getElementById("noteQuizResult");


quizQuestions.forEach(function (question) {

    const options =
        question.querySelectorAll(".note-quiz-option");


    options.forEach(function (option) {

        option.addEventListener("click", function () {

            // Remove old selection
            options.forEach(function (item) {

                item.classList.remove("selected");
                item.classList.remove("correct");
                item.classList.remove("wrong");

            });


            // Mark selected option
            option.classList.add("selected");


            // Save answer
            question.dataset.answer =
                option.dataset.correct;


            // Show result immediately

            if (option.dataset.correct === "true") {

                option.classList.add("correct");

            } else {

                option.classList.add("wrong");


                // Show correct answer

                options.forEach(function (item) {

                    if (item.dataset.correct === "true") {

                        item.classList.add("correct");

                    }

                });

            }

        });

    });

});


// ========================================
// CHECK QUIZ SCORE
// ========================================

checkNoteQuiz.addEventListener("click", function () {

    let score = 0;
    let answered = 0;


    quizQuestions.forEach(function (question) {

        if (question.dataset.answer) {

            answered++;


            if (question.dataset.answer === "true") {

                score++;

            }

        }

    });


    if (answered < quizQuestions.length) {

        noteQuizResult.innerHTML =
            "⚠️ Please answer all 3 questions first.";

        return;

    }


    if (score === 3) {

        noteQuizResult.innerHTML =
            "🏆 Excellent! You scored 3/3.";

    }

    else if (score === 2) {

        noteQuizResult.innerHTML =
            "🌟 Great job! You scored 2/3.";

    }

    else if (score === 1) {

        noteQuizResult.innerHTML =
            "👍 Good effort! You scored 1/3.";

    }

    else {

        noteQuizResult.innerHTML =
            "💡 Keep practicing! You scored 0/3.";

    }

});