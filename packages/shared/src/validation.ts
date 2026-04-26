export function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase();
}

export function isAnswerEmpty(answer: string): boolean {
  return answer.trim().length === 0;
}

export function answersMatch(a: string, b: string): boolean {
  return normalizeAnswer(a) === normalizeAnswer(b);
}

export function isAnswerValid(answer: string, letter: string): boolean {
  const trimmed = answer.trim();
  if (!trimmed) return false;
  return trimmed.toUpperCase().startsWith(letter.toUpperCase());
}
