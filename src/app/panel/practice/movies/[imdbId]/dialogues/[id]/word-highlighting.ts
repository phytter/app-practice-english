import { DialoguePracticeWordTiming } from "@/domain/models";

export type WordStatus = "matched" | "low-confidence" | "missing";

const LOW_CONFIDENCE_THRESHOLD = 0.7;

export function normalizeWord(word: string): string {
  return word
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, "")
    .replace(/^'+|'+$/g, "");
}

export function alignExpectedWords(
  expected: string[],
  transcribed: DialoguePracticeWordTiming[],
): WordStatus[] {
  const n = expected.length;
  const m = transcribed.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(m + 1).fill(0),
  );

  const exp = expected.map(normalizeWord);
  const got = transcribed.map((t) => normalizeWord(t.word));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] =
        exp[i - 1] === got[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const result: WordStatus[] = new Array(n).fill("missing");
  let i = n;
  let j = m;
  while (i > 0 && j > 0) {
    if (exp[i - 1] === got[j - 1]) {
      result[i - 1] =
        transcribed[j - 1].confidence >= LOW_CONFIDENCE_THRESHOLD
          ? "matched"
          : "low-confidence";
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return result;
}

export function tokenizeLine(text: string): string[] {
  return text.match(/\S+/g) ?? [];
}

export function isWordToken(token: string): boolean {
  return normalizeWord(token).length > 0;
}
