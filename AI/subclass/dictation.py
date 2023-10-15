import random, string


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

    def generate_dictation(self, flag, sentence: str, n_mistakes: int = 2) -> str:
        if flag == 0:
            return self.generate_spelling_error(sentence, n_mistakes)
        else:
            return sentence
