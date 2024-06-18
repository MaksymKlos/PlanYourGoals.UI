import { DateInput } from "@fullcalendar/core";

export interface CalendarEvent {
  title: string,
  date?: Date,
  color?: string,
  backgroundColor?: string,
  borderColor?: string,
  overlap?: boolean
}
