// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import UploadDocument from "./components/UploadDocument";
// import DocumentStatus from "./components/DocumentStatus";
// import ResultsDashboard from "./components/ResultsDashboard";

// const App = () => {
//     const extractedText = useState("Sample extracted text");
//     const status= useState("Pending");
//     const docId  = useState("12345");

//     const openDashboard = () => {
//         const url = `/results?extracted_text=${encodeURIComponent(extractedText)}&status=${encodeURIComponent(status)}&doc_id=${encodeURIComponent(docId)}`;
//         window.open(url, "_blank"); // ✅ Opens the results dashboard in a new tab
//     };

//     return (
//         <Router>
//             <div>
//                 <h1>Document Verification System</h1>
//                 <UploadDocument />
//                 <DocumentStatus />
//                 <button onClick={openDashboard}>Show Results Dashboard</button> {/* ✅ Button to show dashboard */}
//             </div>
//             <Routes>
//                 <Route path="/results" element={<ResultsDashboard />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadDocument from "./components/UploadDocument";
import DocumentStatus from "./components/DocumentStatus";
import ResultsDashboard from "./components/ResultsDashboard";

const App = () => {
    const extractedText= useState("Sample extracted text");
    const status = useState("Pending");
    const docId = useState("12345");

    const openDashboard = () => {
        const url = `/results?extracted_text=${encodeURIComponent(extractedText)}&status=${encodeURIComponent(status)}&doc_id=${encodeURIComponent(docId)}`;
        window.open(url, "_blank"); // ✅ Opens the results dashboard in a new tab
    };

    return (
        <Router>
            <div className="container mt-5">
                <h1 className="text-center mb-4">Document Verification System</h1>
                <div className="card mb-4">
                    <div className="card-body">
                        <UploadDocument />
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-body">
                        <DocumentStatus />
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={openDashboard}>Show Results Dashboard</button> {/* ✅ Button to show dashboard */}
                </div>
            </div>
            <Routes>
                <Route path="/results" element={<ResultsDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;