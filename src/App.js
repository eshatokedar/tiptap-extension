import React, { useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import SentimentAnalysis, { getSentimentColor, getEmojiClass } from './components/SentimentAnalysis'
import './App.css'

const App = () => {
  const [emojiClass, setEmojiClass] = useState('very-positive')
  const [backgroundColor, setBackgroundColor] = useState('#C3E7CB')

  const editor = useEditor({
    extensions: [StarterKit, SentimentAnalysis],
    content: '<p>Hello, I hope you are doing great!</p>',
  })

  useEffect(() => {
    if (editor) {
      editor.on('transaction', () => {
        const { emoji, score } = editor.storage.sentimentAnalysis
        const color = getSentimentColor(score)
        setEmojiClass(getEmojiClass(emoji))
        setBackgroundColor(color)
      })
    }
  }, [editor])

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
