Date.prototype.toLocaleDateTimePickerString = function() {
  const dateStr = this.toISOString().split("T")[0];
  const timeStr = this.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return `${dateStr}T${timeStr}`;
}

Date.prototype.getWeekDay = function() {
  return this.getDay() || 7;
}

Date.prototype.toDatePickerString = function() {
  const year = this.toLocaleString('default', {year: 'numeric'});
  const month = this.toLocaleString('default', {
    month: '2-digit',
  });
  const day = this.toLocaleString('default', {day: '2-digit'});

  return [year, month, day].join('-');
}
