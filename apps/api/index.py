from flask import Flask

app = Flask(__name__)

@app.get("/")
def hello():
    return "hello from flask backend", 200, {"Access-Control-Allow-Origin": "*"}
