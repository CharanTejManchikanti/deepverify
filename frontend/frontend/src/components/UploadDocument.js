import React, { useState } from "react";
import axios from "axios";

const UploadDocument = () => {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post("http://localhost:5000/upload-document", formData);
        setResponse(res.data);
    };

    return (
        <div>
            <h2>Upload Document</h2>
            <input type="file"  onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>

            {response && (
                <div>
                    <h3>Uploaded Document</h3>
                    <p><strong>Document ID:</strong> {response.doc_id}</p>
                    <h3>Extracted Text:</h3>
                    <pre>{response.extracted_text}</pre>
                    <p><strong>Status:</strong> {response.status}</p>
                </div>
            )}
        </div>
    );
};

export default UploadDocument;
