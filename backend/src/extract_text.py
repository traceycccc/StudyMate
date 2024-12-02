
from flask import Flask, request, jsonify # server to handle HTTP requests
import fitz  # PyMuPDF library 
import os #For interacting with the file system 

#Initialize a Flask app to handle routes for text extraction
app = Flask(__name__)

# Function to extract text from PDF using PyMuPDF 
def extract_text(pdf_path):
    extracted_text = ""
    pdf_document = fitz.open(pdf_path)

    for page_num in range(len(pdf_document)): 
        page = pdf_document[page_num]
        page_text = page.get_text()
        extracted_text += f"\n--- Page {page_num + 1} ---\n{page_text}" # add separator 

    return extracted_text

#route (/extract-text), accepts POST requests. for extracting text from uploaded PDF 
@app.route('/extract-text', methods=['POST'])
def extract_text_from_pdf():
    # make directory 'temp' if not created
    if not os.path.exists('./temp'):
        os.makedirs('./temp')

    pdf_file = request.files['file'] # receive file, from that http request
    pdf_path = f"./temp/{pdf_file.filename}"
    pdf_file.save(pdf_path) #save the received file into that directory/file path, in disk

    # extracting text
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