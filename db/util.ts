import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '')

export const addTodo = async (text: string) => {
  const { data, error } = await supabase
    .from('todos')
    .insert({ text, done: false })

  if (error) {
    console.error("Error adding todo:", error)
    throw error
  }

  return data?.[0]
}

export const updateTodo = async (id: number, done: boolean) => {
  const { data, error } = await supabase
    .from('todos')
    .update({ done })
    .eq('id', id)

  if (error) {
    console.error("Error updating todo:", error)
    throw error
  }

  return data?.[0]
}