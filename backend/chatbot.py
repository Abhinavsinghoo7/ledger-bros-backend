def get_bot_response(user_msg):
    user_msg = user_msg.lower()
    if "register" in user_msg:
        return "Sure, I can help you with company registration."
    elif "gst" in user_msg:
        return "We offer full GST registration and filing support."
    elif "help" in user_msg:
        return "I'm here to assist with all your business setup queries!"
    else:
        return "Sorry, I didn't get that. Could you rephrase?"
