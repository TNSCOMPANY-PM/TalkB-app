export interface QuestionResult {
  depth: "D1" | "D2" | "D3";
  type: string;
  question: string;
  answered: boolean;
  /** GPT가 실제로 추천한 매장 목록. 사장님 매장이 포함되면 answered: true */
  recommendedStores?: string[];
}

export interface DiagnosisResult {
  storeName: string;
  results: QuestionResult[];
  answeredCount: number;
  totalCount: number;
}
