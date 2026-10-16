import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/layout/Container'
import Button from '../components/common/Button'
import WinnerBanner from '../components/evaluation/WinnerBanner'
import ScoreCard from '../components/evaluation/ScoreCard'
import CriteriaGrid from '../components/evaluation/CriteriaGrid'
import ComparisonView from '../components/challenge/ComparisonView'
import ProblemCard from '../components/challenge/ProblemCard'
import { useChallengeStore } from '../store/challengeStore'
import { useUserStore } from '../store/userStore'
import { ROUTES, CHALLENGE_STATUS } from '../utils/constants'

function ResultsPage() {
  const navigate = useNavigate()
  const {
    status,
    problem,
    humanSolution,
    aiSolution,
    evaluation,
    resetChallenge,
  } = useChallengeStore()

  const { updateStats } = useUserStore()

  useEffect(() => {
    if (status === CHALLENGE_STATUS.COMPLETED && evaluation) {
      updateStats(evaluation.winner)
    }
  }, [status, evaluation, updateStats])

  if (status !== CHALLENGE_STATUS.COMPLETED || !evaluation) {
    return (
      <Container size="md">
        <div className="py-20 text-center space-y-6">
          <div className="text-6xl">📊</div>
          <h2 className="text-3xl font-black text-sky-900">
            لا توجد نتائج بعد
          </h2>
          <p className="text-sky-700 font-medium">
            أكمل تحديًا أولًا لترى النتائج
          </p>
          <Button
            variant="primary"
            onClick={() => navigate(ROUTES.CHALLENGE)}
          >
            🎯 ابدأ تحديًا
          </Button>
        </div>
      </Container>
    )
  }

  const { human, ai, winner, difference, summary } = evaluation

  return (
    <Container size="lg">
      <div className="space-y-8 py-8">

        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-sky-900 mb-2">
            🏆 النتائج النهائية
          </h1>
          <p className="text-sky-700 text-lg font-medium">
            لحظة الحسم بين الإنسان والآلة
          </p>
        </div>

        <WinnerBanner
          winner={winner}
          humanScore={human.total}
          aiScore={ai.total}
          difference={difference}
        />

        <div className="rounded-2xl border-2 border-sky-200 bg-white shadow-lg p-6">
          <p className="text-sky-900 text-lg leading-relaxed text-center font-bold">
            💬 {summary.verdict}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ScoreCard
            side="human"
            score={human.total}
            scores={human.scores}
          />
          <ScoreCard
            side="ai"
            score={ai.total}
            scores={ai.scores}
          />
        </div>

        <CriteriaGrid
          humanScores={human.scores}
          aiScores={ai.scores}
        />

        <ComparisonView
          humanSolution={humanSolution}
          aiSolution={aiSolution}
        />

        <ProblemCard problem={problem} showDetails={false} />

        <div className="flex flex-wrap gap-3 justify-center pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              resetChallenge()
              navigate(ROUTES.CHALLENGE)
            }}
          >
            🔄 تحدي جديد
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(ROUTES.HOME)}
          >
            🏠 الرئيسية
          </Button>
        </div>

      </div>
    </Container>
  )
}

export default ResultsPage