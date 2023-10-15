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
# static 고려
test = MasterAI()

# 요약
# str -> str
summary = test.get_result(0, test_sample, None)
print(summary)
# I can't believe we're really doing this, going into the enchanted forest.Yeah, it's been my dream since I was a kid. I thought you were afraid of magic.

# 토픽
# str -> list
topic = test.get_result(1, test_sample, None)
print(topic)
# 출력은 예제(dataset 임의 사용)
# ['deep learning', 'classification', 'machine learning', 'learning', 'neural networks']

# 철자 오류 문제 (만 구현)
# str -> str
# I can't believe we're really doing this, going into the enchanted forest
print(test_sample.split(".")[0])
dicatation = test.get_result(2, test_sample.split(".")[0], 0)
# I can't believe we're really doimg this, going into the enchanted forest
print(dicatation)
