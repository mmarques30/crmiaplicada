import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Contact, ContactFull, ContactWithDeals, Activity } from '@/lib/types'
import type { Database } from '@/lib/types'

type ContactInsert = Database['public']['Tables']['contacts']['Insert']
type ContactUpdate = Database['public']['Tables']['contacts']['Update']

const PAGE_SIZE = 25

export function useContacts(search?: string, page = 0, lifecycleFilter?: string) {
  const [data, setData] = useState<ContactFull[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContacts() {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('contacts_full')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

      if (search && search.trim()) {
        const term = `%${search.trim()}%`
        query = query.or(
          `first_name.ilike.${term},last_name.ilike.${term},email.ilike.${term},company.ilike.${term},phone.ilike.${term}`
        )
      }

      if (lifecycleFilter && lifecycleFilter !== 'all') {
        query = query.eq('lifecycle_stage', lifecycleFilter)
      }

      const { data: contacts, error: err, count } = await query

      if (err) {
        setError(err.message)
      } else {
        setData((contacts ?? []) as ContactFull[])
        setTotal(count ?? 0)
      }

      setLoading(false)
    }

    fetchContacts()
  }, [search, page, lifecycleFilter])

  return { data, total, loading, error, pageSize: PAGE_SIZE }
}

export function useContact(id: string) {
  const [data, setData] = useState<ContactWithDeals | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setData(null)
      setLoading(false)
      return
    }

    async function fetchContact() {
      setLoading(true)
      setError(null)

      // Fetch contact with deals (and stage info for each deal)
      const { data: contact, error: err } = await supabase
        .from('contacts')
        .select('*, deals(*, stages(*))')
        .eq('id', id)
        .single()

      if (err) {
        setError(err.message)
      } else {
        setData(contact as unknown as ContactWithDeals)
      }

      // Fetch activities
      const { data: acts } = await supabase
        .from('activities')
        .select('*')
        .eq('contact_id', id)
        .order('created_at', { ascending: false })
        .limit(20)

      setActivities((acts ?? []) as Activity[])
      setLoading(false)
    }

    fetchContact()
  }, [id])

  return { data, activities, loading, error }
}

export function useCreateContact() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createContact = useCallback(async (contact: ContactInsert) => {
    setLoading(true)
    setError(null)

    const { data, error: err } = await supabase
      .from('contacts')
      .insert(contact as never)
      .select()
      .single()

    setLoading(false)

    if (err) {
      setError(err.message)
      return null
    }

    return data as Contact
  }, [])

  return { createContact, loading, error }
}

export function useUpdateContact() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateContact = useCallback(async (id: string, updates: ContactUpdate) => {
    setLoading(true)
    setError(null)

    const { data, error: err } = await supabase
      .from('contacts')
      .update(updates as never)
      .eq('id', id)
      .select()
      .single()

    setLoading(false)

    if (err) {
      setError(err.message)
      return null
    }

    return data as Contact
  }, [])

  return { updateContact, loading, error }
}
