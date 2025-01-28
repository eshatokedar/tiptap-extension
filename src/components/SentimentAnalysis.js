import { Extension } from '@tiptap/core'
import Sentiment from 'sentiment'

const sentimentAnalyzer = new Sentiment()

const getSentimentEmoji = (score) => {
  if (score > 5) return '😃'
  if (score > 3) return '😊'
  if (score >= 0) return '😐'
  if (score < -3) return '😞'
  if (score < -5) return '😟'
}

const getSentimentColor = (score) => {
  if (score > 5) return '#C3E7CB' // green
  if (score > 3) return '#D4EDDA' // slightly green
  if (score >= 0) return '#FFFFFF' // white
  if (score < -3) return '#F8D7DA' // slightly red
  if (score < -5) return '#FAA0A0' // red
}

const getEmojiClass = (emoji) => {
  const emojiClasses = {
    '😃': 'very-positive',
    '😊': 'positive',
    '😞': 'negative',
    '😟': 'very-negative',
    '😐': 'neutral',
  }
  return emojiClasses[emoji] || 'neutral'
}

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

export { SentimentAnalysis, getSentimentColor, getEmojiClass }
export default SentimentAnalysis
