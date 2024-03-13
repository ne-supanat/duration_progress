const Durations = {
  day: "day",
  week: "week",
  month: "month",
  year: "year",
};

const style_btn =
  "flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 bg-indigo-300";
const style_selected_btn =
  "flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 bg-indigo-600";
var cat_index = 0;

main();
console.log("This is a popup!");

function main() {
  setup();
  getDurationProgress();
}

function setup() {
  document.addEventListener("DOMContentLoaded", function () {
    //TODO: get saved type and load percentage

    resetStyleButton();

    document
      .getElementById("day_btn")
      .addEventListener("click", () => onSelectDuration(Durations.day));
    document
      .getElementById("week_btn")
      .addEventListener("click", () => onSelectDuration(Durations.week));
    document
      .getElementById("month_btn")
      .addEventListener("click", () => onSelectDuration(Durations.month));
    document
      .getElementById("year_btn")
      .addEventListener("click", () => onSelectDuration(Durations.year));
  });
}

function onSelectDuration(duration) {
  resetStyleButton();

  let element;

  switch (duration) {
    case Durations.day:
      element = document.getElementById("day_btn");
      break;
    case Durations.week:
      element = document.getElementById("week_btn");
      break;
    case Durations.month:
      element = document.getElementById("month_btn");
      break;
    case Durations.year:
      element = document.getElementById("year_btn");
      break;
    default:
      break;
  }

  element.className = style_selected_btn;

  updatePercentage(getDurationProgress(duration));
}

function resetStyleButton() {
  document.getElementById("day_btn").className = style_btn;
  document.getElementById("week_btn").className = style_btn;
  document.getElementById("month_btn").className = style_btn;
  document.getElementById("year_btn").className = style_btn;
}

function getDurationProgress(duration) {
  let now = new Date();
  console.log(now);

  switch (duration) {
    case Durations.day:
      return now.getMinutes() / 1440;
    case Durations.week:
      return now.getDay() / 7;
    case Durations.month:
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return now.getDate() / lastDayOfMonth.getDate();
    case Durations.year:
      const lastDateOfLastYear = new Date(now.getFullYear(), 0, 0);
      const lastDateOfYear = new Date(now.getFullYear() + 1, 0, 0);
      const dayOfYear = Math.floor((now - lastDateOfLastYear) / 86_400_000);
      const lastDayOfYear = Math.floor(
        (lastDateOfYear - lastDateOfLastYear) / 86_400_000
      );
      return dayOfYear / lastDayOfYear;
    default:
      break;
  }

  return Math.random();
}

function updatePercentage(raw) {
  console.log(raw);
  let percentage = (raw * 100).toFixed(2);
  document.getElementById("percentage_bar").style.width = `${percentage}%`;
  document.getElementById("percentage_text").innerHTML = `${percentage}%`;
}
