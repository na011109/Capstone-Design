from flask import Flask, request, jsonify
from subclass.master import MasterAI

app = Flask(__name__)
test = MasterAI()


test_sample = (
    "What is a suitable inpatient drug and alcohol rehab center near Scott County AR?"
)

@app.route('/correct_sentences')
def correct_sentences():
    correct = test.get_result(3, test_sample, 0)
    return jsonify({"correct": correct})

@app.route('/incorrect_sentences')
def incorrect_sentences():
    incorrect = test.get_result(3, test_sample, 1)
    return jsonify({"incorrect": incorrect})


if __name__ == '__main__':
    app.run(debug=True)