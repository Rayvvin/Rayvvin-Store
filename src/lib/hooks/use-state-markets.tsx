import { useState, useEffect } from "react"
import supabaseRequest from "../supabase-fetch/index" // Adjust the import path based on your project structure
import { getStatesWithMarkets } from "@lib/data"

const useStateMarkets = (stateName = null) => {
  const [stateInfo, setStateInfo] = useState<any>(null)
  const [statesAndMarkets, setStatesAndMarkets] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Function to find the state and its markets
  const findState = (name, states: any = null) => {
    let stateAndMarkts = states && states.length ? states : statesAndMarkets
    return stateAndMarkts.find((state) => {
      return state.state === name
    })
  }

  // Function to format the state object
  const formatStateInfo = (state) => {
    const stateId = state.state.split(" ")[0].toLowerCase().replace(/\s/g, "-")
    return {
      stateName: state.state,
      id: stateId,
      markets: state.markets.map((market) => ({
        ...market,
        stateName: state.state,
        state_id: stateId,
      })),
    }
  }

  // Function to fetch state info
  const fetchStateInfo = (states) => {
    const state = findState(stateName, states)
    if (state) {
      // console.log(state)
      const formattedStateInfo = formatStateInfo(state)
      setStateInfo(formattedStateInfo)
    } else {
      console.error(`State '${stateName}' not found.`)
    }
  }

  // Fetch states and markets on component mount
  useEffect(() => {
    const fetchStatesWithMarkets = async () => {
      try {
        setLoading(true)
        const states = await getStatesWithMarkets()
        setStatesAndMarkets(states)
        if (stateName) {
          fetchStateInfo(states)
        }
      } catch (err: any) {
        console.error("Error fetching states and markets:", err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStatesWithMarkets()
  }, [stateName])

  return { stateInfo, statesAndMarkets, loading, error }
}

export default useStateMarkets
