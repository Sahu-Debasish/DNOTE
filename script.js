function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function downloadWord(text) {
    mammoth.convertToHtml({ text: text })
        .then(displayResult)
        .catch(handleError);

    function displayResult(result) {
        download('notepad.docx', result.value);
    }

    function handleError(err) {
        console.log('Error converting to Word: ', err);
    }
}

function downloadPDF(text) {
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    doc.save('notepad.pdf');
}

function downloadDocument() {
    const selectedFormat = document.getElementById('formatSelect').value;
    const text = document.getElementById('notepad').innerText;

    if (selectedFormat === 'text') {
        download('notepad.txt', text);
    } else if (selectedFormat === 'html') {
        const html = `<!DOCTYPE html><html><head></head><body>${text}</body></html>`;
        download('notepad.html', html);
    } else if (selectedFormat === 'word') {
        downloadWord(text);
    } else if (selectedFormat === 'pdf') {
        downloadPDF(text);
    }
}
