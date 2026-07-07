
import type { CreateEventData, UpdateEventData } from "@/lib/types"
import api from "./axios"

export const fetchEvents = async () => {
  const res = await api.get("/events")
  return res.data.events
}

export const fetchFeedEvents = async () => {
  const res = await api.get("/events/feed")
  return res.data.data
}

export const fetchEventByCat = async (category: string) => {
  const res = await api.get(`/events/category/${category}`)
  return res.data.events
}

export const fetchEventById = async (id: string) => {
  const res = await api.get(`/events/${id}`)
  return res.data.event
}

export const createEvent = async (data: CreateEventData) => {
  const res = await api.post("/events", data)
  return res.data
}

export const updateEvent = async (data: UpdateEventData) => {
  const res = await api.put(`/events/${data.id}`, data)
  return res.data
}

export const deleteEvent = async (id: string) => {
  const res = await api.delete(`/events/${id}`)
  return res.data
}
