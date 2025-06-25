import React, { useState } from "react";
import pdfToText from "react-pdftotext";
import './PdfExtractor.css';
import { JsonEditor } from 'json-edit-react'

function PdfExtractor() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle the file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setPdfUrl(URL.createObjectURL(file));
      setExtractedText("");
      setApiResponse(null);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // Extract text from the PDF using react-pdftotext and post to a dummy endpoint
  const handleExtractAndPost = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF first.");
      return;
    }
    setLoading(true);
    try {
      // Use the separate PDF extraction library here
      const text = await pdfToText(pdfFile);
      setExtractedText(text);

      // Post the extracted text to a dummy endpoint (modify URL as needed)
      const response = await fetch("https://amock.io/api/ff4c71", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      setApiResponse(jsonResponse);
    } catch (err) {
      console.error(err);
      alert("Error extracting text or posting to the endpoint.");
    }
    setLoading(false);
  };

  const clearTool = () => {
    setPdfFile(null);
    setPdfUrl(null);
    setExtractedText("");
    setApiResponse(null);
  };

  return (
    <div className="body-main-container">
      <div className="button-bar body-header">
        <h2 className="tool-name-title">Data Extractor</h2>
        {pdfFile && (<button onClick={clearTool} class="clear-button">Reset Extractor</button>)}
      </div>

      <div className="button-bar">
        <label for="file-uploader" class="custom-file-uploader">
          Choose Files
        </label>
        <input type="file" id="file-uploader" className="file-input" accept="application/pdf" onChange={handleFileChange} />
        {pdfUrl && (<h3 className="file-name-preview">Preview: {pdfFile.name} </h3>)}
        <button onClick={handleExtractAndPost} className="button-main" disabled={loading}>
          {loading ? "Processing..." : "Extract & Post"}
        </button>
      </div>

      {pdfUrl && (
        <div className="pdf-viewer-container">
          <object data={pdfUrl} type="application/pdf" className="pdf-viewer">
            <p>
              Your browser does not support PDFs. Download it <a href={pdfUrl}>here</a>.
            </p>
          </object>
        </div>
      )}


      {/* {extractedText && (
        <div style={{ marginTop: "20px" }}>
          <h3>Extracted Text:</h3>
          <pre style={{ backgroundColor: "#f4f4f4", padding: "10px" }}>
            {extractedText}
          </pre>
        </div>
      )} */}

      {apiResponse && (
        <div style={{ marginTop: "20px" }}>
          <h3 className="file-name-preview">API Response:</h3>
          <JsonEditor
            data={apiResponse}
          />
        </div>
      )}
    </div>
  );
}

export default PdfExtractor;
