import random, string
import spacy


class DictationAI:
    def __init__(self):
        # 틀리기 쉬운 알파벳 글자들
        self.tricky_letters = {
            "i": "l",
            "l": "i",
            "m": "n",
            "n": "m",
            "u": "v",
            "v": "u",
            "b": "d",
            "d": "b",
            "q": "g",
            "g": "q",
            "p": "q",
        }

        self.ADP_array = [
            "in",
            "on",
            "at",
            "by",
            "over",
            "under",
            "above",
            "below",
            "between",
            "through",
            "around",
            "across",
            "to",
            "from",
            "into",
            "onto",
            "off",
            "out of",
            "with",
            "without",
            "against",
            "along",
            "beside",
            "about",
            "until",
        ]
        self.PRP_array = [
            "I",
            "you",
            "he",
            "she",
            "it",
            "we",
            "they",
            "me",
            "you",
            "him",
            "her",
            "it",
            "us",
            "them",
        ]
        self.PRPS_array = [
            "my",
            "your",
            "his",
            "her",
            "its",
            "our",
            "their",
            "mine",
            "yours",
            "hers",
            "ours",
            "theirs",
        ]
        self.WP_array = ["who", "whom", "which", "what", "whose"]
        self.MD_array = [
            "can",
            "could",
            "may",
            "might",
            "must",
            "shall",
            "should",
            "will",
            "would",
        ]
        self.nlp = spacy.load("en_core_web_sm")

    def generate_spelling_error(self, sentence: str, n_mistakes: int = 2) -> str:
        """
        문장에서 틀리기 쉬운 알파벳 글자로 철자 오류 문제를 만드는 함수.

        Parameters:
        - sentence (str): 기본 문장
        - n_mistakes (int): 만들 철자 오류의 수 (기본값: 2)

        Returns:
        - str: 철자 오류가 포함된 문장
        """

        words = sentence.split()
        if n_mistakes > len(words):
            n_mistakes = len(words)

        mistake_indices = random.sample(range(len(words)), n_mistakes)

        for index in mistake_indices:
            word = list(words[index])
            possible_mistakes = [
                i
                for i, letter in enumerate(word)
                if letter in self.tricky_letters and letter in string.ascii_letters
            ]

            # 틀리기 쉬운 알파벳이 없다면 다른 단어를 선택
            if not possible_mistakes:
                continue

            pos = random.choice(possible_mistakes)
            word[pos] = self.tricky_letters[word[pos]]
            words[index] = "".join(word)

        return " ".join(words)

    def generate_grammar_error(self, sentence: str, n_mistakes: int = 2) -> str:
        # tokenizating
        doc = self.nlp(sentence)
        words = [token.text for token in doc]
        flag = 0

        tag_mapping = {
            "ADP": self.ADP_array,
            "PRP": self.PRP_array,
            "PRP$": self.PRPS_array,
            "WP": self.WP_array,
            "MD": self.MD_array,
        }

        def replace_word(token, arr):
            nonlocal flag
            filtered_arr = [word for word in arr if word != token.text]
            words[token.i] = random.choice(filtered_arr)
            flag += 1

        for token in doc:
            if flag >= n_mistakes:
                break
            elif tag_mapping.get(token.tag_):
                replace_word(token, tag_mapping.get(token.tag_))

            # 동사 기본형

            elif token.tag_ in ["VB", "VBP"]:
                words[token.i] = token.lemma_ + "s"
                flag += 1

            elif token.tag_ in ["VBD", "VBG", "VBZ"]:
                words[token.i] = token.lemma_
                flag += 1

            else:
                continue
        return " ".join(words)

    def generate_dictation(self, flag, sentence: str, n_mistakes: int = 2) -> str:
        if flag == 0:
            return self.generate_spelling_error(sentence, n_mistakes)

        elif flag == 1:
            return self.generate_grammar_error(sentence, n_mistakes)
        else:
            return sentence


test = DictationAI()
a = test.generate_dictation(
    1, "I can't believe we're really doing this, going into the enchanted forest."
)
print(a)
