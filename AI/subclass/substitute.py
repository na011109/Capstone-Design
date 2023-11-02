from sentence_transformers import SentenceTransformer, util
import os
import csv
import random as rd
import torch

# 모델 경로를 추적해서 Load
current_directory = os.getcwd()
model_directory = os.path.join(current_directory, "model\\embedding_model")


class SubstituteAI:
    # 클러스터 저장 및 laod 로직 필요
    def __init__(self) -> None:
        # embedding model
        # 모델 있다면 load, 없다면 download & save
        if os.path.exists(model_directory):
            self.model = SentenceTransformer(model_directory)
        else:
            self.model = SentenceTransformer("all-MiniLM-L6-v2")
            self.model.save(model_directory)

        # 개발용 샘플 데이터셋
        self.url = "http://qim.fs.quoracdn.net/quora_duplicate_questions.tsv"
        self.dataset_path = "quora_duplicate_questions.tsv"
        self.max_corpus_size = 500000

        # 샘플 dataset check 및 download
        if not os.path.exists(self.dataset_path):
            util.http_get(self.url, self.dataset_path)

        # 집합에 unique한 문장을 추출 및 저장
        self.corpus_sentences = set()
        with open(self.dataset_path, encoding="utf8") as file:
            reader = csv.DictReader(file, delimiter="\t", quoting=csv.QUOTE_MINIMAL)
            for row in reader:
                self.corpus_sentences.add(row["question1"])
                self.corpus_sentences.add(row["question2"])
                if len(self.corpus_sentences) >= self.max_corpus_size:
                    break

        self.corpus_sentences = list(self.corpus_sentences)
        self.corpus_embeddings = self.model.encode(
            self.corpus_sentences,
            batch_size=64,
            show_progress_bar=True,
            convert_to_tensor=True,
        )

        # 클러스터 내의 최소 문장 수 == 10, 최소 유사도 == 0.75
        self.clusters = util.community_detection(
            self.corpus_embeddings, min_community_size=5, threshold=0.85
        )

    def generate_low_high(self, text: str) -> list:
        text = [text]
        low_val = 0.5
        high_val = 0.5
        low_cluster = 0
        high_cluster = 0

        text_embedding = self.model.encode(text, convert_to_tensor=True)

        for i, cluster in enumerate(self.clusters):
            rnd_sentence_id = rd.sample(cluster, 5)
            rnd_cluster = [
                self.corpus_sentences[sentence_id] for sentence_id in rnd_sentence_id
            ]
            cluster_embeddings = self.model.encode(rnd_cluster, convert_to_tensor=True)
            cosine_scores = util.cos_sim(text_embedding, cluster_embeddings)
            cluster_cos_score = torch.mean(cosine_scores).item()

            if cluster_cos_score < low_val:
                low_val = cluster_cos_score
                low_cluster = i
            elif cluster_cos_score > high_val:
                high_val = cluster_cos_score
                high_cluster = i

        high_question_cluster = [
            self.corpus_sentences[sentence_id]
            for sentence_id in self.clusters[high_cluster]
        ]
        low_question_cluster = [
            self.corpus_sentences[sentence_id]
            for sentence_id in self.clusters[low_cluster]
        ]
        return [high_question_cluster, low_question_cluster]

    def generate_question(self, text: str, flag: int) -> list:
        # flag == 0 -> 가장 비슷한 문장 3개 return
        # flag == 1 -> 오답 문장 3개 return

        lowHigh_flag = 1

        if flag == 1:
            lowHigh_flag = -1

        question_cluster = self.generate_low_high(text)
        question_cluster_embedding = self.model.encode(
            question_cluster[flag], convert_to_tensor=True
        )
        top3_val, top3_index = torch.topk(
            lowHigh_flag
            * util.cos_sim(
                self.model.encode(text, convert_to_tensor=True),
                question_cluster_embedding,
            ),
            3,
        )
        output_question = [
            question_cluster[flag][index] for index in top3_index.tolist()[0]
        ]

        return output_question
