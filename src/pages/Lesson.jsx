import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { api } from "../api/axios"

export default function Lesson() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [lesson, setLesson] = useState(null)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await api.get(`/learning/questions/${id}`)
        setLesson(res.data.lesson)
        setQuestions(res.data.questions || [])
      } catch (err) {
        console.log(err.response?.data || err.message)
      }
    }

    fetchLesson()
  }, [id])

  const handleFinish = async () => {
    try {
      const res = await api.post("/progress/submitProgress", {
        lessonId: id,
        answers
      })
      setResult(res.data)
    } catch (err) {
      console.log(err.response?.data || err.message)
    }
  }

  const goToNextLesson = async () => {
    try {
      const res = await api.get(`/learning/lessons/${lesson.module_id}`)
      const lessons = res.data.data

      const index = lessons.findIndex(l => l.id === lesson.id)
      const nextLesson = lessons[index + 1]

      if (nextLesson && !nextLesson.locked) {
        navigate(`/lessons/${nextLesson.id}`)
      } else {
        navigate(`/modules/${lesson.module_id}`)
      }
    } catch {
      navigate(`/modules/${lesson.module_id}`)
    }
  }

  // 🔊 Pronunciation
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "es-ES"
    speechSynthesis.speak(utterance)
  }

  if (!lesson) {
    return <div className="text-center mt-20">Loading...</div>
  }

  // ================= INTRO =================
//   if (!started) {
//     return (
//       <div className="min-h-screen bg-background text-foreground flex items-center px-6">
//         <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

//           <div>
//             <h1 className="text-5xl font-serif mb-6">
//               {lesson.title}
//             </h1>

//             <p className="text-lg text-muted-foreground mb-8">
//               {lesson.content}
//             </p>

//             <div className="flex gap-6 text-sm text-muted-foreground mb-10">
//               <span>⏱ 5 mins</span>
//               <span>🔥 {lesson.xp || 40} XP</span>
//               <span>📘 Practice</span>
//             </div>

//             <button
//               onClick={() => setStarted(true)}
//               className="bg-[#b89b3c] text-black px-8 py-4 rounded-full font-semibold hover:opacity-90 transition"
//             >
//               Start Practice
//             </button>
//             <button
//   onClick={() => navigate(`/flashcards/${lesson.id}`)}
//   className="border border-[#b89b3c] text-[#b89b3c] px-8 py-4 rounded-full font-semibold hover:bg-[#b89b3c]/10 transition"
// >
//   Review with Flashcards
// </button>
//           </div>

//           <div className="hidden md:block bg-card border border-border rounded-3xl p-10 shadow-xl">
//             <h3 className="text-xl font-semibold mb-4 text-[#b89b3c]">
//               What you'll practice
//             </h3>

//             <ul className="space-y-3 text-muted-foreground">
//               <li>• Confidence through repetition</li>
//               <li>• Practical usage examples</li>
//               <li>• Real conversation patterns</li>
//               <li>• Structured sentence building</li>
//             </ul>
//           </div>

//         </div>
//       </div>
//     )
//   }
if (!started) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center px-6">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-5xl font-serif mb-6">
            {lesson.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            {lesson.content}
          </p>

          <div className="flex gap-6 text-sm text-muted-foreground mb-10">
            <span>⏱ 5 mins</span>
            <span>🔥 {lesson.xp || 40} XP</span>
            <span>📘 Practice</span>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-6 mt-6 flex-wrap">

            <button
              onClick={() => setStarted(true)}
              className="bg-[#b89b3c] text-black px-8 py-4 rounded-full font-semibold hover:opacity-90 transition"
            >
              Start Practice
            </button>

            <button
              onClick={() => navigate(`/flashcards/${lesson.id}`)}
              className="border border-[#b89b3c] text-[#b89b3c] px-8 py-4 rounded-full font-semibold hover:bg-[#b89b3c]/10 transition"
            >
              Review with Flashcards
            </button>

          </div>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="hidden md:block bg-card border border-border rounded-3xl p-10 shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-[#b89b3c]">
            What you'll practice
          </h3>

          <ul className="space-y-3 text-muted-foreground">
            <li>• Structured sentence building</li>
            <li>• Real conversation patterns</li>
            <li>• Practical usage examples</li>
            <li>• Confidence through repetition</li>
          </ul>
        </div>

      </div>
    </div>
  )
}
  // ================= RESULT =================
  if (result) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center px-6">
        <div className="max-w-3xl mx-auto w-full bg-card border border-border rounded-3xl p-10 space-y-6">

          <h2 className="text-3xl font-serif">
            Lesson Completed 🎉
          </h2>

          <div className="space-y-3 text-muted-foreground">
            <p>Score: <span className="text-[#b89b3c] font-semibold">{result.score}</span></p>
            <p>XP Earned: <span className="text-[#b89b3c] font-semibold">+{result.xpEarned}</span></p>
            <p>Total XP: <span className="text-[#b89b3c] font-semibold">{result.totalXp}</span></p>
            <p>Streak: <span className="text-[#b89b3c] font-semibold">{result.streak} 🔥</span></p>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              onClick={goToNextLesson}
              className="bg-[#b89b3c] text-black px-6 py-3 rounded-full font-semibold"
            >
              Continue
            </button>

<button
  onClick={() => navigate(`/modules/${lesson.module_id}`)}
  className="border border-[#b89b3c] text-[#b89b3c] px-8 py-4 rounded-full font-semibold hover:bg-[#b89b3c]/10 transition"
>
  Back to Module
</button>
          </div>

        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        No questions available for this lesson.
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="max-w-2xl mx-auto space-y-8">

        <h2 className="text-2xl font-serif">
          {lesson.title}
        </h2>

        <p className="text-lg">
          {currentQuestion.question}
        </p>

        {/* 🔊 Pronunciation */}
        <button
          onClick={() => speakText(currentQuestion.question)}
          className="text-sm text-[#b89b3c] underline"
        >
          🔊 Listen
        </button>

        <div className="space-y-3">
          {[currentQuestion.option_a,
            currentQuestion.option_b,
            currentQuestion.option_c,
            currentQuestion.option_d].map(opt => {

            const isSelected = selected === opt
            const isCorrect = opt === currentQuestion.correct_answer

            return (
              <button
                key={opt}
                onClick={() => {
                  if (showResult) return
                  setSelected(opt)
                  setShowResult(true)

                  setAnswers(prev => [
                    ...prev.filter(a => a.questionId !== currentQuestion.id),
                    { questionId: currentQuestion.id, selected: opt }
                  ])
                }}
                className={`w-full p-4 rounded-xl border transition-all duration-300
                  ${
                    showResult
                      ? isCorrect
                        ? "border-green-500 bg-green-500/20"
                        : isSelected
                        ? "border-red-500 bg-red-500/20"
                        : "border-border bg-card"
                      : isSelected
                      ? "border-[#b89b3c] bg-[#b89b3c]/10"
                      : "border-border bg-card hover:border-[#b89b3c]"
                  }
                `}
              >
                {opt}
              </button>
            )
          })}
        </div>

        {/* 📘 Grammar Insight */}
        {showResult && (
          <div className="mt-6 bg-card border border-[#b89b3c]/40 p-4 rounded-xl">
            <p className="text-sm text-muted-foreground mb-2">
              Grammar Insight
            </p>
            <p className="text-sm">
              This sentence demonstrates correct verb agreement and structure.
            </p>
          </div>
        )}

        <div className="flex justify-between pt-6">

          <button
            onClick={() => {
              setSelected(null)
              setShowResult(false)
              setCurrentIndex(prev => prev - 1)
            }}
            disabled={currentIndex === 0}
            className={`px-6 py-3 rounded-full font-semibold border
              ${currentIndex === 0 
                ? "opacity-40 cursor-not-allowed border-border"
                : "border-border hover:border-[#b89b3c]"}
            `}
          >
            Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => {
                setSelected(null)
                setShowResult(false)
                setCurrentIndex(prev => prev + 1)
              }}
              disabled={!showResult}
              className="bg-[#b89b3c] text-black px-6 py-3 rounded-full font-semibold"
            >
              Next
            </button>
          ) : (
            showResult && (
              <button
                onClick={handleFinish}
                className="bg-[#b89b3c] text-black px-6 py-3 rounded-full font-semibold"
              >
                Finish
              </button>
            )
          )}

        </div>

      </div>
    </div>
  )
}