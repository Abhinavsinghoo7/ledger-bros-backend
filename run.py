from flask import Flask
from backend.routes import main

app = Flask(__name__, static_folder="public", static_url_path="")
app.secret_key = "ledgerbro_secret_key"

# Register routes
app.register_blueprint(main)

if __name__ == "__main__":
    app.run(debug=True)
