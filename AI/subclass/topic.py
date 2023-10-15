from sentence_transformers import SentenceTransformer
from umap import UMAP
from hdbscan import HDBSCAN
from sklearn.feature_extraction.text import CountVectorizer
from bertopic import BERTopic
from bertopic.representation import (
    KeyBERTInspired,
    MaximalMarginalRelevance,
    PartOfSpeech,
)
import os
import torch


# 모델 경로를 추적해서 Load
current_directory = os.getcwd()
model_directory = os.path.join(current_directory, "model\\embedding_model")


class TopicAI:
    def __init__(self) -> None:
        # 디버깅용 코드

        # if torch.cuda.is_available():
        #     print("Using GPU")
        # else:
        #     print("Using CPU")

        torch.cuda.empty_cache()

        # embedding model
        # 모델 있다면 load, 없다면 download & save
        if os.path.exists(model_directory):
            self.embedding_model = SentenceTransformer(model_directory)
        else:
            self.embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
            self.embedding_model.save(model_directory)

        # 차원 축소
        self.umap_model = UMAP(
            n_neighbors=15,
            n_components=5,
            min_dist=0.0,
            metric="cosine",
            random_state=42,
        )

        # topic 수 조절
        self.hdbscan_model = HDBSCAN(
            min_cluster_size=150,
            metric="euclidean",
            cluster_selection_method="eom",
            prediction_data=True,
        )

        # stopwords, 빈도 적은 단어, ngram 제어
        self.vectorizer_model = CountVectorizer(
            stop_words="english", min_df=2, ngram_range=(1, 2)
        )

        # 다각적 주제 모델링

        # KeyBERT
        self.keybert_model = KeyBERTInspired()

        # Part-of-Speech
        self.pos_model = PartOfSpeech("en_core_web_sm")

        # MMR
        self.mmr_model = MaximalMarginalRelevance(diversity=0.3)

        # All representation models
        self.representation_model = {
            "KeyBERT": self.keybert_model,
            "MMR": self.mmr_model,
            "POS": self.pos_model,
        }

    # Topic 출력 함수
    def generate_topic(self, text: list) -> list:
        # 임시로 dataset을 사용하여 구현
        #########################################################
        from datasets import load_dataset

        dataset = load_dataset("CShorten/ML-ArXiv-Papers")["train"]
        abstracts = dataset["abstract"]
        #########################################################
        self.embeddings = self.embedding_model.encode(abstracts, show_progress_bar=True)
        topic_model = BERTopic(
            # Pipeline models
            embedding_model=self.embedding_model,
            umap_model=self.umap_model,
            hdbscan_model=self.hdbscan_model,
            vectorizer_model=self.vectorizer_model,
            representation_model=self.representation_model,
            # Hyperparameters
            top_n_words=10,
            verbose=True,
        )

        self.topics, self.probs = topic_model.fit_transform(abstracts, self.embeddings)
        temp = topic_model.get_topic(-1, full=True).get("KeyBERT")
        temp = [keyword[0] for keyword in temp]

        return temp[:5]
