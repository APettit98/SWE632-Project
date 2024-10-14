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

// Convert a weekday name to a Date object representing the next occurrence of that weekday
// Help from chatgpt
export function weekdayToDate(weekday: string): string {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const todayIndex = today.getDay(); // Get the index of the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    
    // Find the index of the target weekday
    const targetIndex = daysOfWeek.indexOf(weekday);
    if (targetIndex === -1) {
        throw new Error("Invalid weekday name");
    }

    // Calculate the number of days to add to today to get to the target weekday
    const daysUntilTarget = (targetIndex - todayIndex + 7) % 7;

    // Create the target date by adding the calculated number of days
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysUntilTarget);

    return targetDate.toLocaleDateString('en-US');
}