import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useJsonData from '../hooks/useJsonData'
import DePositioning from './books/DePositioning'
import B2BCX from './books/B2BCX'
import DigitalExhaustion from './books/DigitalExhaustion'
import DemingProfoundKnowledge from './books/DemingProfoundKnowledge'
import TheGoal from './books/TheGoal'
import PhoenixProject from './books/PhoenixProject'
import VibeCoding from './books/VibeCoding'
import './BookNotes.css'

const bookComponents = {
  'de-positioning': DePositioning,
  'b2b-cx': B2BCX,
  'digital-exhaustion': DigitalExhaustion,
  'deming-profound-knowledge': DemingProfoundKnowledge,
  'the-goal': TheGoal,
  'phoenix-project': PhoenixProject,
  'vibe-coding': VibeCoding,
}

export default function BookNotes() {
  const { data: books, error, loading } = useJsonData('/data/books.json')
  const [activeBook, setActiveBook] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (hash) setActiveBook(hash)
  }, [location.hash])

  const showIndex = () => setActiveBook(null)

  if (loading) return <div className="content"><p>Loading...</p></div>
  if (error) return <div className="content"><p>Error: {error}</p></div>

  const ActiveBook = activeBook ? bookComponents[activeBook] : null

  return (
    <div className="content">
      <h1 className="page-title">Book Notes</h1>
      <p className="subtitle">Key concepts, frameworks, and actionable takeaways</p>

      {!activeBook && (
        <div className="book-index">
          {books.map(book => (
            <a key={book.id} href="#" onClick={e => { e.preventDefault(); setActiveBook(book.id) }} className="u-card book-index-link">
              <img className="book-thumb" src={book.thumb} alt={`${book.title} cover`} style={book.thumbStyle} />
              <div>
                {book.title}
                <div className="book-meta">{book.meta}</div>
              </div>
            </a>
          ))}
        </div>
      )}

      {ActiveBook && <ActiveBook onBack={showIndex} />}
    </div>
  )
}
