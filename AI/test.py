from flask import Flask, request, jsonify
from flask_cors import CORS
from subclass.master import MasterAI

test_sample = (
    "I can't believe we're really doing this, going into the enchanted forest."
    "Yeah, it's been my dream since I was a kid."
    "Your dream? I thought you were afraid of magic."
    "I was, but dreams can change, can't they?"
    "Sure, as long as you're ready for whatever comes next."
    "Are you saying there's something we should worry about?"
    "You can never be too sure, especially when magic is involved."
    "But we have each other, right? That should count for something."
    "Absolutely, friendship is the most powerful magic of all."
    "Just promise me one thing: if things get tough, you won't leave me behind."
    "I promise, not only because of our friendship but also because we're stronger together."
    "Good, because we're about to cross the threshold, and there's no turning back."
)

app = Flask(__name__)
CORS(app)
test = MasterAI()


@app.route("/summarize")
def summarize():
    summary = test.get_result(0, test_sample, None)
    summary_list = summary.split(".")
    return jsonify({"summary": summary_list})


@app.route("/get_topic")
def get_topic():
    topic = test.get_result(1, test_sample, None)
    return jsonify({"topic": topic})


dictation_sample = "But we have each other, right? That should count for something."


@app.route("/get_dictation")
def get_dictation():
    dictation = test.get_result(2, dictation_sample, 0)
    response_data = {"dictation": dictation, "sample": dictation_sample}
    return jsonify(response_data)


test_sample2 = (
    "What is a suitable inpatient drug and alcohol rehab center near Scott County AR?"
)


@app.route("/correct_sentences")
def correct_sentences():
    correct = test.get_result(3, test_sample2, 0)
    response_data = {"correct": correct, "sample": test_sample2}
    return jsonify(response_data)


@app.route("/incorrect_sentences")
def incorrect_sentences():
    incorrect = test.get_result(3, test_sample2, 1)
    return jsonify({"incorrect": incorrect})


if __name__ == "__main__":
    app.run(debug=True, port=5001)
