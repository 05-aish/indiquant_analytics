import { useState } from 'react'
import { useMetrics } from './hooks/useMetrics'
import { useActivityLog } from './hooks/useActivityLog'
import { useContributors } from './hooks/useContributors'
import { useSubmissions } from './hooks/useSubmissions'
import Dashboard from './pages/Dashboard'


function App() {
  const { metrics } = useMetrics()
  const { activity } = useActivityLog()
  const { contri } = useContributors()
  const { subs } = useSubmissions()

  console.log("metrics are:        ",metrics)
  console.log("activity logs are:    ", activity)
  console.log("subs logs are:    ", subs)
  console.log("contri logs are:    ", contri)
  return (
    <>
      <Dashboard/>
    </>
  )
}

export default App
