# Document Verification System

## Overview

This project is a **Document Verification System** that allows users to:

- **Upload Documents (PDF/Images)**: Extracts text using OCR and stores it in a PostgreSQL database.
- **Check Verification Status**: Users can enter a document ID to track progress.
- **Results Dashboard**: Displays extracted documents and statuses **only when the button is clicked**.

---

## 📌 Features

✅ **Upload document (PDF/Image)** and extract text immediately.

✅ **Store extracted text** in PostgreSQL.

✅ **Automatically update status** to "Completed" after extraction.

✅ **Check document verification status** by entering the document ID.

✅ **Show Results Dashboard** only when the button is clicked.

---

## ⚙️ Installation & Setup

### **1️⃣ Backend (Flask + PostgreSQL)**

#### **Prerequisites:**

- **Check if Python 3.x is installed**:
  ```bash
  python --version
  ```
  If not installed, download from [python.org](https://www.python.org/downloads/).

- **Check if PostgreSQL is installed**:
  ```bash
  psql --version
  ```
  If not installed, download from [postgresql.org](https://www.postgresql.org/download/).

#### **Steps:**

```bash
# Clone the repository
 git clone https://github.com/your-repo/document-verification.git
 cd document-verification/backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use 'venv\Scripts\activate'

# Install dependencies
pip install -r requirements.txt

# Setup PostgreSQL Database (Run inside PostgreSQL Shell)
psql -U postgres
CREATE DATABASE documentdb;
CREATE USER charan WITH PASSWORD '123456';
GRANT ALL PRIVILEGES ON DATABASE documentdb TO charan;
\q  # Exit PostgreSQL shell

# Start the Flask backend
python app.py
```

---

### **2️⃣ Frontend (React + Axios)**

#### **Prerequisites:**

- **Check if Node.js is installed**:
  ```bash
  node -v
  ```
  If not installed, download from [nodejs.org](https://nodejs.org/).

#### **Steps:**

```bash
# Go to the frontend folder
cd ../frontend

# Install dependencies
npm install

# Start the React frontend
npm start
```

---

## 🚀 Usage

1. **Upload a Document**:
   - Go to `http://localhost:3000/` and upload a PDF or image.
   - The extracted text and status will be **immediately displayed** after uploading.

2. **Check Verification Status**:
   - Enter the **Document ID** and check its verification progress.

3. **Show Results Dashboard**:
   - Click the **"Show Results Dashboard"** button.
   - The results will appear **on the same page below the button**.

---

## 📌 API Endpoints

### **Backend (Flask) API Routes**

| Method | Endpoint                        | Description                               |
| ------ | ------------------------------- | ----------------------------------------- |
| POST   | `/upload-document`              | Upload a document and extract text        |
| GET    | `/verification-status/<doc_id>` | Check the status of a document            |
| GET    | `/get-all-documents`            | Fetch all documents for results dashboard |

---

## 📌 Folder Structure

```
document-verification/
│── backend/  # Flask Backend
│   ├── app.py  # Main Flask app
│   ├── models.py  # Database models
│   ├── database.py  # Database connection
│── frontend/  # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadDocument.js  ✅
│   │   │   ├── DocumentStatus.js  ✅
│   │   │   ├── ResultsDashboard.js  ✅
│   │   ├── App.js  # Main entry file
│   ├── package.json  # Dependencies
│   ├── public/
|   ├── requirements.txt
│── README.md  # Documentation
```

---

## 🎯 Future Improvements

🔹 Integrate **real-time updates** for verification status.

🔹 Add **user authentication** to track personal document uploads.

🔹 Deploy on **AWS/GCP** for production use.

---

## 🛠️ Troubleshooting

### **Backend Issues:**

- **If PostgreSQL connection fails**, check `app.py` for the correct database credentials.
- **Ensure `psycopg2` is installed**:
  ```bash
  pip install psycopg2-binary
  ```
- **If Flask doesn't start, check dependencies**:
  ```bash
  pip install -r requirements.txt
  ```

### **Frontend Issues:**

- **If API calls fail**, ensure Flask is running at `http://localhost:5000/`.
- **If React doesn't load, try**:
  ```bash
  npm cache clean --force
  rm -rf node_modules package-lock.json
  npm install
  npm start
  ```

---

