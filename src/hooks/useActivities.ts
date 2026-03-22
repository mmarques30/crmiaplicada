import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Activity } from '@/lib/types'
import type { Database } from '@/lib/types'

type ActivityInsert = Database['public']['Tables']['activities']['Insert']

export function useActivities(contactId?: string, dealId?: string) {
  const [data, setData] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!contactId && !dealId) {
      setData([])
      setLoading(false)
      return
    }

    async function fetchActivities() {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false })

      if (contactId) {
        query = query.eq('contact_id', contactId)
      }

      if (dealId) {
        query = query.eq('deal_id', dealId)
      }

      const { data: activities, error: err } = await query

      if (err) {
        setError(err.message)
      } else {
        setData(activities ?? [])
      }

      setLoading(false)
    }

    fetchActivities()
  }, [contactId, dealId])

  return { data, loading, error }
}

export function useCreateActivity() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createActivity = useCallback(async (activity: ActivityInsert) => {
    setLoading(true)
    setError(null)

    const { data, error: err } = await supabase
      .from('activities')
      .insert(activity as never)
      .select()
      .single()

    setLoading(false)

    if (err) {
      setError(err.message)
      return null
    }

    return data as Activity
  }, [])

  return { createActivity, loading, error }
}
