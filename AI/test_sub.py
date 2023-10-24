from subclass.master import MasterAI

test = MasterAI()


test_sample = (
    "What is a suitable inpatient drug and alcohol rehab center near Scott County AR?"
)

# 정답 문장 3개

temp = test.get_result(3, test_sample, 0)
print(temp)

# 오답 문장 3개

temp = test.get_result(3, test_sample, 1)
print(temp)
