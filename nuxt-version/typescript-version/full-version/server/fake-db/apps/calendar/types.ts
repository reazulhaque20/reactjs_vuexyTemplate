export interface CalendarEvent {
  id: number
  url: string
  title: string
  start: Date
  end: Date
  allDay: boolean

  extendedProps: Record<string, any>
}
