const Durations = {
  day: "day",
  week: "week",
  month: "month",
  year: "year",
};

const duration_pref_key = "duration_pref_key";

const style_btn =
  "flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 bg-indigo-300";
const style_selected_btn =
  "flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 bg-indigo-600";

const style_step = "h-full bg-blue-200 rounded-full";
const style_active_step = "h-full bg-blue-600 rounded-full";

main();
console.log("This is a popup!");

function main() {
  setup();
}

function setup() {
  document.addEventListener("DOMContentLoaded", function () {
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

    const initialDurationType = localStorage.getItem(duration_pref_key);
    console.log(initialDurationType);
    if (initialDurationType) {
      onSelectDuration(initialDurationType);
    } else {
      onSelectDuration(Durations.year);
    }
  });
}

function onSelectDuration(duration) {
  localStorage.duration_pref_key = duration;

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

  updateDisplay(duration);
}

function resetStyleButton() {
  document.getElementById("day_btn").className = style_btn;
  document.getElementById("week_btn").className = style_btn;
  document.getElementById("month_btn").className = style_btn;
  document.getElementById("year_btn").className = style_btn;
}

function updateDisplay(duration) {
  if (duration == Durations.week) {
    document.getElementById("percentage_display").style.display = "none";
    document.getElementById("weekly_step").style.display = "block";

    updateWeeklyStep();
  } else {
    document.getElementById("percentage_display").style.display = "block";
    document.getElementById("weekly_step").style.display = "none";

    updatePercentage(getDurationProgress(duration));
  }
}

function updateWeeklyStep() {
  const dayOfWeek = new Date().getDay();

  console.log(dayOfWeek);

  for (let i = 0; i < 7; i++) {
    if (i < dayOfWeek) {
      document.getElementById(`weekly_step_${i}`).className = style_active_step;
    } else {
      document.getElementById(`weekly_step_${i}`).className = style_step;
    }
  }
}

function updatePercentage(raw) {
  console.log(raw);
  let percentage = (raw * 100).toFixed(2);
  document.getElementById("percentage_bar").style.width = `${percentage}%`;
  document.getElementById("percentage_text").innerHTML = `${percentage}%`;
}

function getDurationProgress(duration) {
  let now = new Date();
  console.log(now);

  switch (duration) {
    case Durations.day:
      const minutePass =
        (now - new Date(now.getFullYear(), now.getMonth(), now.getDate())) /
        86_400_000;
      return minutePass;
    case Durations.week:
      console.log(now.getDay());
      return 0;
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
