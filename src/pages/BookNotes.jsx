import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useJsonData from '../hooks/useJsonData'
import usePageMeta from '../hooks/usePageMeta'
import LoadingSkeleton from '../components/LoadingSkeleton'
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
  usePageMeta('Book Notes', 'Key concepts, frameworks, and actionable takeaways from books')
  const { data: books, error, loading } = useJsonData('/data/books.json')
  const location = useLocation()
  const hashBook = location.hash.replace('#', '') || null
  const [manualBook, setManualBook] = useState(null)
  const activeBook = manualBook ?? hashBook

  const showIndex = () => setManualBook(null)

  if (loading) return <LoadingSkeleton />
  if (error) return <div className="content"><p>Error: {error}</p></div>
  if (!books || books.length === 0) return <div className="content"><h1 className="page-title">Book Notes</h1><p className="subtitle">No content available yet.</p></div>

  const ActiveBook = activeBook ? bookComponents[activeBook] : null

  return (
    <div className="content">
      <h1 className="page-title">Book Notes</h1>
      <p className="subtitle">Key concepts, frameworks, and actionable takeaways</p>

      {!activeBook && (
        <div className="book-index">
          {books.map(book => (
            <button key={book.id} onClick={() => setManualBook(book.id)} className="u-card book-index-link">
              <img className="book-thumb" src={book.thumb} alt={`${book.title} cover`} loading="lazy" style={book.thumbStyle} />
              <div>
                {book.title}
                <div className="book-meta">{book.meta}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {ActiveBook && <ActiveBook onBack={showIndex} />}
    </div>
  )
}
