from transformers import AutoTokenizer, BartForConditionalGeneration
import os
import torch

# 모델 경로를 추적해서 Load
current_directory = os.getcwd()
model_directory = os.path.join(current_directory, "model")


class SummaryAI:
    def __init__(self) -> None:
        # 디버깅용 코드

        # if torch.cuda.is_available():
        #     print("Using GPU")
        # else:
        #     print("Using CPU")

        torch.cuda.empty_cache()

        self.tokenizer = AutoTokenizer.from_pretrained(
            "facebook/bart-large-cnn", cache_dir=model_directory
        )

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        self.model = BartForConditionalGeneration.from_pretrained(
            "facebook/bart-large-cnn", cache_dir=model_directory
        ).to(self.device)

    # 요약 출력 함수
    def generate_summary(self, text: str) -> str:
        # 입력 예시

        """
        ARTICLE_TO_SUMMARIZE = (
        "PG&E stated it scheduled the blackouts in response to forecasts for high winds "
        "amid dry conditions. The aim is to reduce the risk of wildfires. Nearly 800 thousand customers were "
        "scheduled to be affected by the shutoffs which were expected to last through at least midday tomorrow."
        )
        """

        inputs = self.tokenizer(
            [text], max_length=1024, truncation=True, return_tensors="pt"
        ).to(self.device)

        summary_ids = self.model.generate(
            inputs["input_ids"], num_beams=64, min_length=0, max_length=40
        )

        torch.cuda.empty_cache()

        return self.tokenizer.batch_decode(
            summary_ids, skip_special_tokens=True, clean_up_tokenization_spaces=False
        )[0]
