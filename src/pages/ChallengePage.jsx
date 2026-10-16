import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/layout/Container'
import DomainSelector from '../components/challenge/DomainSelector'
import ProblemCard from '../components/challenge/ProblemCard'
import HumanSolutionForm from '../components/challenge/HumanSolutionForm'
import Loader from '../components/common/Loader'
import CountdownTimer from '../components/common/CountdownTimer'
import Button from '../components/common/Button'
import { useChallengeStore } from '../store/challengeStore'
import { useCountdown } from '../hooks/useCountdown'
import { CHALLENGE_STATUS, ROUTES } from '../utils/constants'

function ChallengePage() {
  const navigate = useNavigate()

  const {
    status,
    selectedDomain,
    customDomainName,
    problem,
    humanSolution,
    timeLeft,
    error,
    selectDomain,
    startChallenge,
    setHumanSolution,
    submitSolution,
    resetChallenge,
    clearError,
  } = useChallengeStore()

  useCountdown()

  useEffect(() => {
    return () => clearError()
  }, [clearError])

  useEffect(() => {
    if (status === CHALLENGE_STATUS.COMPLETED) {
      navigate(ROUTES.RESULTS)
    }
  }, [status, navigate])

  if (
    status === CHALLENGE_STATUS.IDLE ||
    status === CHALLENGE_STATUS.SELECTING
  ) {
    return (
      <Container size="lg">
        <DomainSelector
          onSelect={(id, domainData, customName) => {
            selectDomain(id)
            startChallenge(id, domainData, customName)
          }}
          selectedId={selectedDomain}
        />
      </Container>
    )
  }

  if (status === CHALLENGE_STATUS.LOADING) {
    return (
      <Container size="md">
        <div className="py-20">
          <Loader size="xl" text="⏳ جارٍ تحضير التحدي..." />
        </div>
      </Container>
    )
  }

  if (status === CHALLENGE_STATUS.ERROR) {
    return (
      <Container size="md">
        <div className="py-20 text-center space-y-6">
          <p className="text-red-600 text-3xl font-black">⚠️ حدث خطأ</p>
          <p className="text-sky-800 text-lg font-bold">{error}</p>
          <Button variant="primary" onClick={() => resetChallenge()}>
            حاول مرة أخرى
          </Button>
        </div>
      </Container>
    )
  }

  if (status === CHALLENGE_STATUS.WRITING && problem) {
    return (
      <Container size="lg">
        <div className="space-y-6 animate-fadeIn">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-sky-900 mb-2">
                ⚔️ التحدي جارٍ
              </h1>
              <p className="text-sky-700 text-lg font-bold">
                {customDomainName
                  ? `🎨 مجال مخصص: ${customDomainName}`
                  : '✍️ اكتب فكرتك قبل انتهاء الوقت'}
              </p>
            </div>
            <CountdownTimer
              timeLeft={timeLeft}
              totalTime={problem.timeLimit || 300}
            />
          </div>

          <ProblemCard problem={problem} />

          <div className="rounded-2xl border-2 border-sky-200 bg-white shadow-lg p-6 md:p-8">
            <HumanSolutionForm
              onSubmit={(solution) => {
                setHumanSolution(solution)
                submitSolution()
              }}
              initialData={humanSolution}
            />
          </div>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => {
                resetChallenge()
              }}
            >
              ← تغيير المجال
            </Button>
          </div>

        </div>
      </Container>
    )
  }

  if (status === CHALLENGE_STATUS.EVALUATING) {
    return (
      <Container size="md">
        <div className="py-20 space-y-8">
          <Loader
            size="xl"
            variant="ai"
            text="🤖 الذكاء الاصطناعي يقيّم الحلّين..."
          />
          <div className="text-center text-sky-800 space-y-2 font-bold">
            <p>⏳ قد يستغرق التقييم بضع ثوانٍ</p>
            <p className="text-sm text-sky-700">
              يتم تحليل الأصالة، التنفيذ، والتأثير
            </p>
          </div>
        </div>
      </Container>
    )
  }

  return null
}

export default ChallengePage