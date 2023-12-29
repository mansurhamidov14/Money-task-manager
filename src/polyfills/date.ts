interface Date {
  getWeekDay: () => number;
  toLocaleDateTimePickerString: () => string 
}

Date.prototype.toLocaleDateTimePickerString = function() {
  const dateStr = this.toISOString().split("T")[0];
  const timeStr = this.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return `${dateStr}T${timeStr}`;
}

Date.prototype.getWeekDay = function() {
  return this.getDay() || 7;
}
