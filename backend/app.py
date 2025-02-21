import os
import fitz  # PyMuPDF for extracting text from PDFs
import pytesseract  # OCR for scanned PDFs
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PIL import Image

from database import db
from models import Document

app = Flask(__name__)
CORS(app)

# PostgreSQL Connection String
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://charan:123456@localhost/documentdb"
app.config["UPLOAD_FOLDER"] = "uploads"
db.init_app(app)

# Ensure uploads folder exists
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

def extract_text(file_path):
    """Extract text from PDFs and images using PyMuPDF and Tesseract OCR."""
    
    if file_path.lower().endswith(".pdf"):
        text = ""
        with fitz.open(file_path) as pdf:
            for page in pdf:
                extracted = page.get_text()
                
                if not extracted.strip():  # If page has no text, use OCR
                    img = page.get_pixmap()  # Convert PDF page to image
                    img_path = "temp_page.png"
                    img.save(img_path)  
                    extracted = pytesseract.image_to_string(Image.open(img_path))
                
                text += extracted + "\n"
        
        return text.strip()

    else:
        return pytesseract.image_to_string(Image.open(file_path))

@app.route("/upload-document", methods=["POST"])
def upload_document():
    """Handle document uploads, save file, extract text, and update status to 'Completed'."""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)

    print(f"DEBUG: Saving file to {file_path}")
    file.save(file_path)

    if not os.path.exists(file_path):
        return jsonify({"error": "File not saved!"}), 500

    extracted_text = extract_text(file_path)

    # ✅ Update status to "Completed" if text is extracted, else "Failed"
    status = "Completed" if extracted_text else "Failed"

    new_doc = Document(filename=filename, extracted_text=extracted_text, validation_status=status)
    db.session.add(new_doc)
    db.session.commit()

    return jsonify({
        "doc_id": new_doc.id,
        "extracted_text": extracted_text,
        "status": status
    }), 201

@app.route("/verification-status/<int:doc_id>", methods=["GET"])
def check_status(doc_id):
    """Check document verification status."""
    document = Document.query.get(doc_id)
    if not document:
        return jsonify({"error": "Document not found"}), 404

    return jsonify({
        "doc_id": document.id,
        "filename": document.filename,
        "extracted_text": document.extracted_text,
        "status": document.validation_status
    })

@app.route("/validate-document", methods=["POST"])
def validate_document():
    """Mark document verification as completed."""
    data = request.json
    doc_id = data.get("doc_id")

    document = Document.query.get(doc_id)
    if not document:
        return jsonify({"error": "Document not found"}), 404

    # ✅ If text is extracted, update status to "Completed"
    document.validation_status = "Completed" if document.extracted_text else "Failed"
    db.session.commit()

    return jsonify({"doc_id": document.id, "validation_status": document.validation_status})

@app.route("/get-all-documents", methods=["GET"])
def get_all_documents():
    """Fetch all documents for the results dashboard."""
    documents = Document.query.all()
    data = [
        {
            "id": doc.id,
            "filename": doc.filename,
            "extracted_text": doc.extracted_text,
            "status": doc.validation_status
        }
        for doc in documents
    ]
    return jsonify(data)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
