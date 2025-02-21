import React, { useState, useEffect } from "react";
import axios from "axios";

const ResultsDashboard = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const res = await axios.get("http://localhost:5000/get-all-documents"); // New API needed
            setDocuments(res.data);
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };

    return (
        <div>
            <h2>Results Dashboard</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Document ID</th>
                        <th>Filename</th>
                        <th>Extracted Text</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc) => (
                        <tr key={doc.id}>
                            <td>{doc.id}</td>
                            <td>{doc.filename}</td>
                            <td><pre>{doc.extracted_text.substring(0, 100)}...</pre></td>
                            <td>{doc.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsDashboard;
