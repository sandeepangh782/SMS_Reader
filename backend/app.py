from flask import Flask, request, jsonify
import requests
import re

app = Flask(__name__)

# Hugging Face API configuration
HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/meta-llama/LLaMA-2-7B-chat"  # Replace with model name
HUGGINGFACE_API_TOKEN = "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"  # Replace with your API key

headers = {
    "Authorization": f"Bearer {HUGGINGFACE_API_TOKEN}"
}

@app.route('/extract', methods=['POST'])
def extract():
    data = request.get_json()
    text = data['text']

    # Prompt to identify expense details
    prompt = f"Extract the amount, description, and date from the following expense message:\n\"{text}\""
    payload = {
        "inputs": prompt,
        "parameters": {"max_length": 50}
    }

    # Request inference from Hugging Face API
    response = requests.post(HUGGINGFACE_API_URL, headers=headers, json=payload)
    generated_text = response.json()[0]['generated_text']
    
    # Parse the generated text to structure the response
    structured_response = parse_entities(generated_text)
    return jsonify(structured_response)

def parse_entities(generated_text):
    details = {"amount": "N/A", "description": "Unknown Merchant", "date": "N/A"}
    
    # Regular expressions for amount, description, and date
    amount_match = re.search(r'\b(?:INR|\$|Rs.)?\s?(\d+(?:[.,]\d+)*)\b', generated_text)
    date_match = re.search(r'\b(?:\d{1,2}/\d{1,2}/\d{2,4}|\d{1,2}-\d{1,2}-\d{2,4})\b', generated_text)
    description_match = re.search(r'description:\s*([\w\s]+)', generated_text, re.IGNORECASE)
    
    # Fill details from matches
    if amount_match:
        details["amount"] = amount_match.group(0)
    if date_match:
        details["date"] = date_match.group(0)
    if description_match:
        details["description"] = description_match.group(1)
    
    return details

if __name__ == '__main__':
    app.run(port=5000)
