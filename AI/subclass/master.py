from subclass.summary import SummaryAI
from subclass.topic import TopicAI
from subclass.dictation import DictationAI


class MasterAI:
    def __init__(self):
        self.summary_ai = SummaryAI()
        self.topic_ai = TopicAI()
        self.dication_ai = DictationAI()

    def get_summary(self, text: str) -> str:
        return self.summary_ai.generate_summary(text)

    def get_topic(self, text: list) -> list:
        return self.topic_ai.generate_topic(text)

    def get_dictation(self, text: str, qflag: int) -> str:
        return self.dication_ai.generate_dictation(qflag, text)

    def get_result(self, ai_flag: int, text: str | list, qflag: int | None) -> any:
        # ai_flag == 0, summary
        if ai_flag == 0:
            return self.get_summary(text)
        # ai_flag == 1, topic
        elif ai_flag == 1:
            return self.get_topic(text)
        # ai_flag == 2, dictation
        elif ai_flag == 2:
            return self.get_dictation(text, qflag)
        else:
            return 0
