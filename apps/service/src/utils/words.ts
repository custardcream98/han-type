import WORDS_DB from "@/db/words.json"

export const getRandomWords = (count: number): string[] => {
  const words: string[] = []
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * WORDS_DB.length)
    words.push(WORDS_DB[randomIndex])
  }
  return words
}
