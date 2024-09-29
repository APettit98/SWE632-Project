// Used to convert 24 hour time to 12 hour time
export function convertTime(time: string): string {
    const [hours, minutes] = time.split(":");
    const ampm = parseInt(hours) >= 12 ? 'pm' : 'am';
    let adjustedHours = parseInt(hours) % 12;
    if (adjustedHours === 0) {
        adjustedHours = 12;
    }
    return `${adjustedHours}:${minutes} ${ampm}`;
  }

// Convert duration in minutes to string with hours and minutes
export function convertDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}hr ${minutes}m`;
}