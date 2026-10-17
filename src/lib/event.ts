import { EVENT_DATE, contact } from "./data";

function stamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function downloadCalendar() {
  const start = new Date(EVENT_DATE);
  const end = new Date(start.getTime() + 8 * 60 * 60 * 1000);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SSCICTS//Cypher 27//EN",
    "BEGIN:VEVENT",
    `UID:cypher27-gaming-zone@sscicts`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escapeText("Cypher ’27 · Gaming Zone")}`,
    `DESCRIPTION:${escapeText("Cypher ’27 by the Sri Sumangala College ICT Society. Details at " + window.location.origin)}`,
    `LOCATION:${escapeText(contact.address)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "cypher-27.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function shareSite(): Promise<"shared" | "copied" | "failed"> {
  const data = {
    title: "Cypher ’27 · SSCICTS",
    text: "Inter & Intra school competitions by the Sri Sumangala College ICT Society.",
    url: window.location.origin,
  };
  try {
    if (navigator.share) {
      await navigator.share(data);
      return "shared";
    }
    await navigator.clipboard.writeText(data.url);
    return "copied";
  } catch {
    return "failed";
  }
}

export async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}
