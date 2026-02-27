import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { api } from "../api/axios"

export default function Flashcards() {
  const { lessonId } = useParams()
  const navigate = useNavigate()

  const [cards, setCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await api.get(`/flashcard/flashcards/${lessonId}`)
        setCards(res.data.data || [])
      } catch (err) {
        console.log(err.response?.data || err.message)
      }
    }

    fetchCards()
  }, [lessonId])

  if (cards.length === 0) {
    return <div className="p-10 text-center">No flashcards available.</div>
  }

  const currentCard = cards[currentIndex]

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-card border border-border rounded-3xl p-10 space-y-8 text-center">

        <h2 className="text-3xl font-serif">Flashcards Review</h2>

        {/* Flip Card */}
        <div
          className="relative w-full h-56 perspective mx-auto"
          onClick={() => setFlipped(!flipped)}
        >
          <div
            className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              flipped ? "rotate-y-180" : ""
            }`}
          >
            {/* FRONT */}
            <div className="absolute inset-0 backface-hidden flex items-center justify-center rounded-2xl border border-border bg-background">
              <p className="text-2xl">{currentCard.front_text}</p>
            </div>

            {/* BACK */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center rounded-2xl border border-[#b89b3c] bg-[#b89b3c]/10">
              <p className="text-2xl text-[#b89b3c]">{currentCard.back_text}</p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-4">

          <button
            onClick={() => {
              setFlipped(false)
              setCurrentIndex(prev => prev - 1)
            }}
            disabled={currentIndex === 0}
            className="px-6 py-3 rounded-full border border-border hover:border-[#b89b3c] transition disabled:opacity-40"
          >
            Previous
          </button>

          <button
            onClick={() => {
              setFlipped(false)
              setCurrentIndex(prev => prev + 1)
            }}
            disabled={currentIndex === cards.length - 1}
            className="bg-[#b89b3c] text-black px-6 py-3 rounded-full font-semibold hover:opacity-90 transition disabled:opacity-40"
          >
            Next
          </button>

        </div>

        <button
          onClick={() => navigate(-1)}
          className="text-sm text-muted-foreground underline"
        >
          Back
        </button>

      </div>
    </div>
  )
}