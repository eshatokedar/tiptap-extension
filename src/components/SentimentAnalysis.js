import { Extension } from '@tiptap/core'
import Sentiment from 'sentiment'

const sentimentAnalyzer = new Sentiment()

const SentimentAnalysis = Extension.create({
  name: 'sentimentAnalysis',

  addStorage() {
    return {
      score: 0,
      emoji: '😐',
    }
  },

  onTransaction({ editor }) {
    const text = editor.state.doc.textContent
    const result = sentimentAnalyzer.analyze(text)

    const sentimentScore = result.score + result.comparative
    const sentimentEmoji = getSentimentEmoji(sentimentScore)

    this.storage.score = sentimentScore
    this.storage.emoji = sentimentEmoji
  },
})

const getSentimentEmoji = (score) => {
  if (score > 5) return '😃'
  if (score > 3) return '😊'
  if (score >= 0) return '😐'
  if (score < -3) return '😞'
  if (score < -5) return '😟'
 
}

export default SentimentAnalysis
