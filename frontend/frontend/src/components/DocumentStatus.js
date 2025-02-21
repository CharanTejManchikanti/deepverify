import React, { useState } from "react";
import axios from "axios";

const DocumentStatus = () => {
    const [docId, setDocId] = useState("");
    const [status, setStatus] = useState(null);

    const checkStatus = async () => {
        const res = await axios.get(`http://localhost:5000/verification-status/${docId}`);
        setStatus(res.data);
    };

    return (
        <div>
            <h2>Check Document Status</h2>
            <input type="text" placeholder="Enter Document ID" onChange={(e) => setDocId(e.target.value)} />
            <button onClick={checkStatus}>Check Status</button>

            {status && (
                <div>
                    <h3>Document Status</h3>
                    <p><strong>Document ID:</strong> {status.doc_id}</p>
                    <p><strong>Status:</strong> {status.status}</p>
                </div>
            )}
        </div>
    );
};

export default DocumentStatus;
