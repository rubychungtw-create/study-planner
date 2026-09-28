import fs from "node:fs";
const html = fs.readFileSync("dist/index.html", "utf8");
const script = fs.readFileSync("dist/app.js", "utf8");
const privacy = fs.readFileSync("dist/privacy.html", "utf8");
const terms = fs.readFileSync("dist/terms.html", "utf8");
const worker = fs.readFileSync("worker/index.mjs", "utf8");
const focusRescue = fs.readFileSync("dist/focus-rescue.css", "utf8");
const dashboard = fs.readFileSync("dist/dashboard.js", "utf8");
const dashboardCss = fs.readFileSync("dist/dashboard.css", "utf8");
new Function(script);
new Function(dashboard);
if (!html.includes('id="questMatrix"') || !html.includes('id="googleSignIn"') || !html.includes('id="settingsDialog"')) {
  throw new Error("missing core UI");
}
if (!privacy.includes("隱私權政策") || !terms.includes("服務條款")) throw new Error("missing policy pages");
if (!script.includes("function moveTask") || !script.includes("function openTaskEditor") || !script.includes("function wireTaskCards")) {
  throw new Error("missing task board interactions");
}
if (!html.includes('id="questSubmitButton"') || !html.includes('name="editId"')) throw new Error("missing task editor UI");
if (!html.includes('id="timerDisplay"') || !html.includes('id="timerStartPause"') || !script.includes("function advanceTimer") || !script.includes("function renderTimer")) throw new Error("missing mission timer");
if (!html.includes('id="timerFullscreen"') || !script.includes("function toggleTimerFocus")) throw new Error("missing fullscreen focus timer");
if (!html.includes('id="reflectionForm"') || !html.includes('id="notePhotoInput"') || !script.includes("function saveReflection")) throw new Error("missing daily reflection UI");
if (!html.includes('id="examPanel"') || !html.includes('id="scoreDialog"') || !html.includes('id="scoreChart"') || !script.includes("function saveExamResult") || !script.includes("function renderScoreChart")) throw new Error("missing exam score progression UI");
if (!html.includes('FIRST MIDTERM RAID') || !script.includes('const examSprintPlan=') || !script.includes("'2026-10-06'")) throw new Error("missing first midterm sprint plan");
if (!script.includes('const examSprintOrder=') || !script.includes('必讀保底') || !script.includes('熟練加分')) throw new Error("missing interleaved low-motivation pacing");
if (!script.includes('quest[0]=source[newIndex][0]')) throw new Error("interleaved quests must keep chronological slots");
if (!html.includes('id="coverageText"') || !html.includes('id="coverageFill"') || !script.includes('const examRequiredIndexes=') || !script.includes('必讀保底')) throw new Error("missing guaranteed scope coverage system");
if (!html.includes('id="examPlanTableBody"') || !html.includes('id="examPlanSummary"') || !script.includes('function renderExamPlanTable')) throw new Error("missing full exam review table");
if (!html.includes('id="weekPanel"') || !html.includes('id="weekCalendar"') || !script.includes('function renderWeek') || !script.includes('data-week-add')) throw new Error("missing weekly calendar task flow");
if (!html.includes('FOCUS FOREST') || !html.includes('id="forestPlants"') || !html.includes('data-forest-filter="week"') || !script.includes('function plantFocusTree') || !script.includes("db.from('focus_forest')")) throw new Error("missing focus forest flow");
if (!html.includes('id="forestRefreshNote"') || html.includes('data-forest-filter="today"') || !script.includes('function forestWeekBounds') || !script.includes("dataset.density=shown.length>=24?'lush'") || !script.includes('visible.slice(0,84)')) throw new Error("missing weekly lush forest cycle");
if (!html.includes('id="homeworkPanel"') || !html.includes('id="homeworkBoard"') || !script.includes('function loadHomework') || !worker.includes("url.pathname==='/api/homework'")) throw new Error("missing school homework sync");
if (!html.includes('id="forestSeasonBadge"') || !script.includes('function forestSeasonFor') || !script.includes("key:'christmas'")) throw new Error("missing seasonal focus forest");
if (!script.includes('function recoveryQueueFor') || !script.includes("type:'自動補救'") || !script.includes('全部接續')) throw new Error("missing full automatic recovery flow");
if (!script.includes('function importHomeworkTask') || !html.includes('id="recoveryPlan"')) throw new Error("missing homework import and recovery UI");
if (!html.includes('id="focusSoundVolume"') || !script.includes('function startRainSound') || !script.includes('function startMozartSound') || !script.includes('function syncFocusSound')) throw new Error("missing focus sound controls");
if (!html.includes('data-timer-minutes="15"') || !html.includes('data-timer-minutes="25"') || !html.includes('data-timer-minutes="45"') || !script.includes('function setWorkMinutes') || !script.includes('focus_minutes:workMinutes')) throw new Error("missing adaptive focus timer");
if (!html.includes('id="timerRescue"') || !html.includes('id="rescueDialog"') || !script.includes('function handleRescue') || !script.includes('function saveRescueStep')) throw new Error("missing focus rescue flow");
if (!html.includes('id="breakGuide"') || !html.includes('id="focusQuickPark"') || !focusRescue.includes('.mission-timer.focus-mode .focus-quick-park')) throw new Error("missing guided break and focus shield");
if (!html.includes('id="focusReportGrid"') || !html.includes('id="distractionCategory"') || !script.includes('function renderFocusReport') || !script.includes('DISTRACTION_CATEGORIES')) throw new Error("missing weekly distraction report");
if (!html.includes('id="homePanel"') || !html.includes('id="lifeInboxForm"') || !html.includes('data-weekly-priority="0"') || !dashboard.includes('function setupHabits') || !dashboard.includes('function setupEnergy') || !dashboardCss.includes('.bottom-nav')) throw new Error("missing Notion-inspired life dashboard");
if (!html.includes('value="instagram"') || !dashboard.includes('const quotes=[') || !dashboard.includes('dayNumber') || !fs.readFileSync("dist/cloud.css", "utf8").includes('data-theme="instagram"')) throw new Error("missing daily quote or Instagram theme");
if (!script.includes('function homeworkCarryoverDate') || !script.includes('study-quest-homework-cache-v2') || !script.includes('homework-carry-tag')) throw new Error("missing 9/24 homework carryover");
if (!html.includes('id="taskTrash"') || !script.includes('function restoreDeletedTask') || !script.includes('function rememberDeletedTask') || !script.includes('今晚 23:59 前有效')) throw new Error("missing same-day task restore");
if (!script.includes("db.from('homework_progress')") || !script.includes("db.from('review_revives')") || !html.includes('id="revivalSchedule"')) throw new Error("missing cloud homework and mistake revival flow");
if (script.includes("['2026-09-29','作文'") || script.includes("['2026-09-30','英文聽力'")) throw new Error("first midterm writing/listening review should be excluded");
for (const subject of ['物理','化學','生物','數學','國文','英文','公民','地理']) if (!script.includes(`'${subject}'`)) throw new Error(`missing subject plan: ${subject}`);
console.log(JSON.stringify({ htmlBytes: Buffer.byteLength(html), scriptBytes: Buffer.byteLength(script), scriptSyntax: "ok", coreUi: "ok", taskEditing: "ok", dragAndDrop: "ok", missionTimer: "ok", fullscreenFocus: "ok", dailyReflection: "ok", examBosses: "ok", scoreChart: "ok", firstMidtermSprint: "ok" }));

