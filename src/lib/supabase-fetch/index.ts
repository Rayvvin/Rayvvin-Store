const VITE_BASE_URL = process.env.NEXT_PUBLIC_VITE_BASE_URL || ""
const VITE_ANON_KEY = process.env.NEXT_PUBLIC_VITE_ANON_KEY || ""

import {
  PostgrestResponseFailure,
  PostgrestResponseSuccess,
} from "@supabase/postgrest-js"
import { createClient } from "@supabase/supabase-js"
// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your Supabase URL and key
const supabase = createClient(VITE_BASE_URL, VITE_ANON_KEY)

const supabaseRequest = async (operation, table, options: any = {}) => {
  let response
  let error: string | null = null
  try {
    const { filters = [], limit = 8, rangeStart, rangeEnd, select = "*" } = options
    let query

    // Perform the specified operation
    switch (operation) {
      case "read":
        query = supabase.from(table).select(select)
        break
      case "count":
        query = supabase.from(table).select(select)
        break
      case "insert":
        query = supabase.from(table).insert(options.data)
        break
      case "update":
        query = supabase.from(table).update(options.data)
        break
      case "delete":
        query = supabase.from(table).delete()
        break
      default:
        throw new Error("Invalid operation provided.")
    }

    // Apply each filter
    filters.forEach((filter) => {
      const { column, operator, value } = filter
      switch (operator) {
        case "eq":
          query = query.eq(column, value)
          break
        case "gt":
          query = query.gt(column, value)
          break
        case "lt":
          query = query.lt(column, value)
          break
        case "gte":
          query = query.gte(column, value)
          break
        case "lte":
          query = query.lte(column, value)
          break
        case "like":
          query = query.like(column, value)
          break
        case "ilike":
          query = query.ilike(column, value)
          break
        case "is":
          query = query.is(column, value)
          break
        case "in":
          query = query.in(column, value)
          break
        case "neq":
          query = query.neq(column, value)
          break
        case "contains":
          query = query.contains(column, value)
          break
        case "containedBy":
          query = query.containedBy(column, value)
          break
        default:
          throw new Error(`Invalid operator: ${operator}`)
      }
    })

    // Execute the query
    response = operation === 'read' ? await query.range(rangeStart || 0, limit) : await query
    // .range(options.rangeStart || 0, options.rangeEnd || 9)

    return { data: response?.data, count: response?.data.length, error }
  } catch (err: any) {
    console.error("Supabase request error:", err.message)
    error = err.message
    return { error }
  }
}

export default supabaseRequest
