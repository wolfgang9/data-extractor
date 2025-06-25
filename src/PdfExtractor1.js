// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// // Configure PDF.js worker
// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

// function PdfExtractor() {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [extractedText, setExtractedText] = useState("");
//   const [apiResponse, setApiResponse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Handle the file upload change event
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type === "application/pdf") {
//       setPdfFile(file);
//       setPdfUrl(URL.createObjectURL(file));
//       // Clear previous states when a new file is uploaded
//       setExtractedText("");
//       setApiResponse(null);
//     } else {
//       alert("Please upload a valid PDF file.");
//     }
//   };

//   // Extract text from the uploaded PDF using pdfjs-dist
//   const extractText = async (file) => {
//     const reader = new FileReader();
//     return new Promise((resolve, reject) => {
//       reader.onload = async () => {
//         try {
//           const typedarray = new Uint8Array(reader.result);
//           const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
//           let text = "";
//           // Iterate through each page and extract text
//           for (let i = 1; i <= pdf.numPages; i++) {
//             const page = await pdf.getPage(i);
//             const content = await page.getTextContent();
//             // Join all text items on the page
//             const pageText = content.items.map((item) => item.str).join(" ");
//             text += pageText + "\n";
//           }
//           resolve(text);
//         } catch (err) {
//           reject(err);
//         }
//       };

//       reader.onerror = () => {
//         reject(reader.error);
//       };

//       reader.readAsArrayBuffer(file);
//     });
//   };

//   // Extract text from PDF & post to a dummy endpoint
//   const handleExtractAndPost = async () => {
//     if (!pdfFile) {
//       alert("Please upload a PDF first.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const text = await extractText(pdfFile);
//       setExtractedText(text);

//       // Replace the URL with your actual endpoint when ready
//       const response = await fetch("http://httpbin.org/get", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ text })
//       });

//       const jsonResponse = await response.json();
//       setApiResponse(jsonResponse);
//     } catch (err) {
//       console.error(err);
//       alert("Error extracting PDF data or posting to the endpoint.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
//       <h2>PDF Data Extractor</h2>
//       <input type="file" accept="application/pdf" onChange={handleFileChange} />

//       {pdfUrl && (
//         <div style={{ margin: "20px 0" }}>
//           <h3>PDF Preview:</h3>
//           <object data={pdfUrl} type="application/pdf" width="600" height="500">
//             <p>
//               Your browser does not support PDFs. Please download the PDF{" "}
//               <a href={pdfUrl}>here</a>.
//             </p>
//           </object>
//         </div>
//       )}

//       <button onClick={handleExtractAndPost} disabled={loading}>
//         {loading ? "Processing..." : "Extract Data & Post"}
//       </button>

//       {extractedText && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Extracted Text:</h3>
//           <pre style={{ backgroundColor: "#f4f4f4", padding: "10px" }}>
//             {extractedText}
//           </pre>
//         </div>
//       )}

//       {apiResponse && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>API Response:</h3>
//           <pre style={{ backgroundColor: "#f4f4f4", padding: "10px" }}>
//             {JSON.stringify(apiResponse, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PdfExtractor;
