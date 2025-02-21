from database import db

class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    extracted_text = db.Column(db.Text, nullable=False)
    validation_status = db.Column(db.String(20), default="Pending")
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
