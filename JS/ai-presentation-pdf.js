import * as pdfjsLib from
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";


/* =========================================
   PDF ELEMENTS
========================================= */

const pdfFile = document.getElementById("pdfFile");
const pdfFileName = document.getElementById("pdfFileName");
const summarizePdf = document.getElementById("summarizePdf");
const clearPdf = document.getElementById("clearPdf");
const pdfOutput = document.getElementById("pdfOutput");
const copySummary = document.getElementById("copySummary");


/* =========================================
   PDF FILE SELECT
========================================= */

pdfFile.addEventListener("change", function () {

    const file = pdfFile.files[0];

    if (!file) {
        pdfFileName.textContent = "";
        return;
    }

    if (file.type !== "application/pdf") {

        pdfFileName.textContent =
            "⚠️ Please select a PDF file.";

        pdfFile.value = "";
        return;
    }

    pdfFileName.innerHTML = `
        📄 <strong>${escapeHTML(file.name)}</strong>
        <br>
        <small>
            ${(file.size / 1024 / 1024).toFixed(2)} MB
        </small>
    `;

});


/* =========================================
   SUMMARIZE PDF
========================================= */

summarizePdf.addEventListener("click", async function () {

    const file = pdfFile.files[0];

    if (!file) {

        pdfOutput.innerHTML = `
            <div class="empty-notes">

                <div class="empty-icon">⚠️</div>

                <h4>Select a PDF first</h4>

                <p>
                    Choose your study PDF to continue.
                </p>

            </div>
        `;

        return;
    }


    pdfOutput.innerHTML = `
        <div class="empty-notes">

            <div class="empty-icon">⏳</div>

            <h4>Reading your PDF...</h4>

            <p>
                Extracting text from your document.
            </p>

        </div>
    `;


    try {

        const arrayBuffer =
            await file.arrayBuffer();

        const pdf =
            await pdfjsLib.getDocument({
                data: arrayBuffer
            }).promise;


        let fullText = "";


        /* Read every page */

        for (let pageNumber = 1;
            pageNumber <= pdf.numPages;
            pageNumber++) {

            const page =
                await pdf.getPage(pageNumber);

            const textContent =
                await page.getTextContent();


            const pageText =
                textContent.items
                    .map(item => item.str)
                    .join(" ");


            fullText += pageText + "\n";

        }


        fullText =
            fullText.replace(/\s+/g, " ").trim();


        if (!fullText) {

            pdfOutput.innerHTML = `
                <div class="empty-notes">

                    <div class="empty-icon">📷</div>

                    <h4>No readable text found</h4>

                    <p>
                        This PDF may contain scanned images
                        instead of selectable text.
                    </p>

                </div>
            `;

            return;
        }


        /* Create simple study summary */

        const sentences =
            fullText
                .split(/[.!?]+/)
                .map(sentence => sentence.trim())
                .filter(sentence => sentence.length > 30);


        const importantPoints =
            sentences.slice(0, 8);


        let pointsHTML = "";


        importantPoints.forEach(function (point) {

            pointsHTML += `
                <li>
                    ${escapeHTML(point)}
                </li>
            `;

        });


        pdfOutput.innerHTML = `

            <div class="pdf-summary-result">

                <div class="summary-heading">
                    🧠 Study Summary
                </div>


                <h4>
                    ${escapeHTML(file.name)}
                </h4>


                <div class="summary-meta">

                    📄 ${pdf.numPages} pages

                    &nbsp; • &nbsp;

                    📝 ${fullText.length} characters

                </div>


                <h4 class="summary-subtitle">
                    📌 Important Points
                </h4>


                <ul class="summary-points-list">

                    ${pointsHTML}

                </ul>


                <div class="presentation-tip">

                    💡 <strong>Study Tip:</strong>

                    Use these points as a quick revision
                    guide and read the original PDF for
                    complete details.

                </div>

            </div>

        `;


    } catch (error) {

        console.error(error);


        pdfOutput.innerHTML = `

            <div class="empty-notes">

                <div class="empty-icon">❌</div>

                <h4>
                    Unable to read this PDF
                </h4>

                <p>
                    Please try another PDF file.
                </p>

            </div>

        `;

    }

});


/* =========================================
   CLEAR PDF
========================================= */

clearPdf.addEventListener("click", function () {

    pdfFile.value = "";

    pdfFileName.textContent = "";


    pdfOutput.innerHTML = `

        <div class="empty-notes">

            <div class="empty-icon">
                📖
            </div>

            <h4>
                No PDF Selected
            </h4>

            <p>
                Upload your study PDF to get started.
            </p>

        </div>

    `;

});


/* =========================================
   COPY SUMMARY
========================================= */

copySummary.addEventListener("click", async function () {

    const text =
        pdfOutput.innerText.trim();


    if (!text ||
        text.includes("No PDF Selected")) {

        alert(
            "⚠️ Please summarize a PDF first."
        );

        return;
    }


    try {

        await navigator.clipboard.writeText(text);

        copySummary.textContent =
            "✅ Copied!";


        setTimeout(function () {

            copySummary.textContent =
                "📋 Copy Summary";

        }, 2000);


    } catch (error) {

        alert(
            "Unable to copy the summary."
        );

    }

});


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}