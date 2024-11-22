
from flask import Flask, request, jsonify
import fitz  # PyMuPDF
from pdf2image import convert_from_path
import os

app = Flask(__name__)

# Function to extract text from PDF using PyMuPDF 
def extract_text(pdf_path):
    extracted_text = ""
    pdf_document = fitz.open(pdf_path)

    for page_num in range(len(pdf_document)):
        page = pdf_document[page_num]
        page_text = page.get_text()
        extracted_text += f"\n--- Page {page_num + 1} ---\n{page_text}"

    return extracted_text

@app.route('/extract-text', methods=['POST'])
def extract_text_from_pdf():
    if not os.path.exists('./temp'):
        os.makedirs('./temp')

    pdf_file = request.files['file']
    pdf_path = f"./temp/{pdf_file.filename}"
    pdf_file.save(pdf_path)

    try:
        text = extract_text(pdf_path)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        os.remove(pdf_path)  # Clean up temporary file
    
    return jsonify({"text": text})

if __name__ == '__main__':
    print("Python Text Extraction Server is running on port 5001")
    app.run(port=5001)