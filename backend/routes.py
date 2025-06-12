from flask import Blueprint, send_from_directory, request, jsonify
from backend.chatbot import get_bot_response
import os

main = Blueprint("main", __name__)

# Serve static files (HTML, JS, CSS)
@main.route('/')
def serve_index():
    return send_from_directory('public', 'home.html')

@main.route('/<path:filename>')
def serve_static_files(filename):
    return send_from_directory('public', filename)

# Handle chatbot messages
@main.route('/chatbot', methods=['POST'])
def chatbot_reply():
    user_msg = request.json.get("message", "")
    bot_reply = get_bot_response(user_msg)
    return jsonify({"response": bot_reply})
