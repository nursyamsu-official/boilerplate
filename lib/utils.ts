import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*
| Input (seconds) | Output                        |
| --------------- | ----------------------------- |
| 45              | `45 seconds`                  |
| 60              | `1 minute`                    |
| 61              | `1 minute 1 second`           |
| 3600            | `1 hour`                      |
| 3660            | `1 hour 1 minute`             |
| 3661            | `1 hour 1 minute 1 second`    |
| 7325            | `2 hours 2 minutes 5 seconds` |
*/
export function formatDurationCombined(seconds: number): string {
  const parts: string[] = [];

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    parts.push(hours === 1 ? "1 hour" : `${hours} hours`);
  }

  if (minutes > 0) {
    parts.push(minutes === 1 ? "1 minute" : `${minutes} minutes`);
  }

  if (secs > 0 || parts.length === 0) {
    parts.push(secs === 1 ? "1 second" : `${secs} seconds`);
  }

  return parts.join(" ");
}
