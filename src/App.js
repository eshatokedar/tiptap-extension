import React, { useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import SentimentAnalysis from './components/SentimentAnalysis'
import './App.css'

const App = () => {
  const [emojiClass, setEmojiClass] = useState('very-positive')
  const [backgroundColor, setBackgroundColor] = useState('#C3E6CB') 

  const editor = useEditor({
    extensions: [StarterKit, SentimentAnalysis],
    content: '<p>Hello, I hope you are doing great!</p>',
  })

  useEffect(() => {
    if (editor) {
      editor.on('transaction', () => {
        const { emoji, score } = editor.storage.sentimentAnalysis
        updateUI(emoji, score)
      })
    }
  }, [editor])

  const updateUI = (emoji, score) => {
    const color = getSentimentColor(score)
    setEmojiClass(getEmojiClass(emoji))
    setBackgroundColor(color)
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

  const getSentimentColor = (score) => {
    if (score > 5) return '#C3E7CB' //green
    if (score > 3) return '#D4EDDA' //slightly green
    if (score >= 0) return '#FFFFFF' //white
    if (score < -3) return '#F8D7DA' //slightly red
    if (score < -5) return '#FAA0A0' //red
  }

  return (
    <>
      <div className="heading">Sentiment Analysis</div>
      <div className="editor-container" style={{ backgroundColor }}>
        <EditorContent editor={editor} id="editor" />
        <div id="sentiment-emoji" className={`emoji ${emojiClass}`}>
          {editor.storage.sentimentAnalysis.emoji}
        </div>
      </div>
    </>
  )
}

export default App
