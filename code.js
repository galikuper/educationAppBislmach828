let events = [
    //  MAY
    {
        name: "הסברה שבועית",
        date: "2026-05-04",
        time: "19:00",
        location: "אולם צ'רה",
        description: "הסברה שבועית של מדור גפ''ה ",
        branches: ["מפח''ט"],
        types: ["כל"]
    },
    {
        name: "מרכז מורשת צה''ל",
        date: "2026-05-17",
        time: "12:00",
        location: "מרכז מורשת צה''ל בבהדי''ם",
        description: "הכנת מפקדים למרכז מורשת - קצינים ונגדים",
        branches: ["כל"],
        types: ["קבע"]
    },
    {
        name: "הסברה שבועית",
        date: "2026-05-11",
        time: "19:00",
        location: "אולם צ'רה",
        description: "ל''ג בעומר",
        branches: ["מפח''ט"],
        types: ["כל"]

    },
    {
        name: "הסברה שבועית",
        date: "2026-05-18",
        time: "19:00",
        location: "אולם צ'רה",
        description: "יום ירושלים",
        branches: ["מפח''ט"],
        types: ["כל"]

    },
    {
        name: "התנדבות במשק",
        date: "2026-05-28",
        time: "10:00",
        location: "מושב הודיה",
        description: "התנדבות במשק לציון חג השבועות",
        branches: ["מפח''ט"],
        types: ["סדיר", "קבע"]

    }
];

events = events.reduce((acc, event) => {
    if (!acc[event.date]) {
        acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
}, {});

{
    let navContainer;
    let hatakBtn;
    let hirVarekemBtn;
    let mafhatBtn;
    let contactsBtn;
    let dutyBtn;
    let careerBtn;

    let monthlyBtn;
    let weeklyBtn;

    // let selectedWeekBtn = null;
}

window.addEventListener("load", () => {
    // nav
    if (document.getElementById("nav-container")) {
        navContainer = document.getElementById("nav-container");
        hatakBtn = document.getElementById("hatak-btn");
        hirVarekemBtn = document.getElementById("hir-varekem-btn");
        mafhatBtn = document.getElementById("mafhat-btn");
        contactsBtn = document.getElementById("contacts-btn");
        dutyBtn = document.getElementById("duty-btn");
        careerBtn = document.getElementById("career-btn");

        hatakBtn.addEventListener("click", continueNav);
        hirVarekemBtn.addEventListener("click", continueNav);
        mafhatBtn.addEventListener("click", continueNav);
        contactsBtn.addEventListener("click", () => { window.location.href = "contacts.html" });
    }
    // luz
    else if (document.getElementById("calendar")) {
        // return button
        document.getElementById("arrow").addEventListener("click", () => {
            if (document.getElementById("week-title").textContent !== "") { //  from weekly -> choose week
                document.getElementById("week-title").textContent = "";
                document.getElementById("month-title").style.display = "block";
                createWeeklyCalendar();
            }
            else if (calendar.style.display === "flex") {   // from choose week -> monthly
                createMonthlyCalendar();
            }
            else {  // from monthly -> index
                window.history.back();
            }
        });

        monthlyBtn = document.getElementById("monthly-btn");
        weeklyBtn = document.getElementById("weekly-btn");
        const cover = document.getElementById("cover");
        createMonthlyCalendar();
        // createWeeklyCalendar(); // test

        cover.addEventListener("click", (e) => {
            if (e.target === cover || e.target === document.getElementById("popup-container")) {
                closePopup();
            }
        });

        weeklyBtn.addEventListener("click", createWeeklyCalendar);
        monthlyBtn.addEventListener("click", createMonthlyCalendar);
    }
    // contacts
    else if (document.getElementById("contacts-container")) {
        document.getElementById("arrow").addEventListener("click", () => { window.location.href = "index.html"; })
    }
});

function continueNav(event) {
    let returnBtn = document.getElementById("arrow-index");
    returnBtn.style.visibility = "visible";
    returnBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    })

    let branchName = (event.target.id).slice(0, -4);
    branchName = mapToHebrew(branchName, "button");
    sessionStorage.setItem("branchName", branchName);

    hatakBtn.style.display = "none"
    hirVarekemBtn.style.display = "none"
    mafhatBtn.style.display = "none"
    contactsBtn.style.display = "none"
    navContainer.classList.add("new-container");
    dutyBtn.style.display = "block"
    careerBtn.style.display = "block"

    dutyBtn.addEventListener("click", luz);
    careerBtn.addEventListener("click", luz);
}

function luz(event) {
    let type = (event.target.id).slice(0, -4);
    type = mapToHebrew(type, "button");
    sessionStorage.setItem("type", type);
    window.location.href = "calendar.html";
}

function createMonthlyCalendar() {
    // // remove weekly calendar 
    document.getElementById("week-title").textContent = "";
    document.getElementById("month-title").style.display = "block";
    weeklyBtn.classList.remove("selected-calendar-btn");
    monthlyBtn.classList.add("selected-calendar-btn");

    // getting the current nav elements
    const branchName = sessionStorage.getItem("branchName") || "";
    const type = sessionStorage.getItem("type") || "";

    document.getElementById("current-calendar-nav").innerHTML = 
        branchName && type ? `${mapToHebrew(branchName, "title")} - ${mapToHebrew(type, "title")}` : "";

    // if (!branchName || !type) {
    // window.location.href = "index.html";
    // }   

    //get dates and elements
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const calendar = document.getElementById("calendar");

    document.getElementById("month-title").src = `./assets/monthTitles/${month}.png`

    calendar.style.display = "grid";
    calendar.style.gridTemplateColumns = "repeat(7, 1fr)";

    calendar.innerHTML = "<span>יום א'</span><span>יום ב'</span><span>יום ג'</span><span>יום ד'</span><span>יום ה'</span><span>יום ו'</span><span>יום ש'</span>"

    //empty cells of the month before
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("empty");
        calendar.appendChild(emptyCell);
    }

    //hebrew dates
    const monthFormatter = new Intl.DateTimeFormat("he-u-ca-hebrew", {
        month: "long"
    });

    //structure each cell
    for (let day = 1; day <= lastDay; day++) {
        const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
        const date = new Date(year, month, day);
        const hebrewDay = toHebrewNumber(
            new Intl.DateTimeFormat("en-u-ca-hebrew", { day: "numeric" }).format(date)
        );
        const hebrewMonth = monthFormatter.format(date);
        const hebrewDate = `${hebrewDay} ${hebrewMonth}`;

        const cell = document.createElement("div");
        cell.classList.add("day");

        if (isToday) {
            cell.classList.add("today");
        }
        cell.classList.add("day");

        const dateKey = formatDateKey(date);

        const dayEvents = (events[dateKey] || []).filter(event =>
            filterEvent(event, branchName, type)
        );

        cell.innerHTML = `
            <div class="gregorian">${day}</div>
            <div class="events">
            ${dayEvents.map(e => `<div class="event">${e.name.substring(0, 4)}..</div>`).join("")}
            </div>
            <div class="hebrew-date">${hebrewDate}</div>
        `;

        calendar.appendChild(cell);

        cell.addEventListener("click", () => {
            if (!dayEvents || dayEvents.length === 0) return;
            eventPopUp(date, dayEvents);
        });
    }
}

function eventPopUp(date, dayEvents) {
    document.getElementById("cover").style.display = "block";
    const popup = document.getElementById("event-popups");
    popup.innerHTML = '<img src="./assets/X.png" alt="X" id="x" />';
    document.getElementById("x").addEventListener("click", closePopup);

    //add each event as a popup
    dayEvents.forEach((event, index) => {
        const popupCard = document.createElement("div");
        const popupTop = document.createElement("div");
        const popupBottom = document.createElement("div");
        const popupTime = document.createElement("p");
        const popupName = document.createElement("p");
        const popupDesc = document.createElement("p");
        const popupBottomLinePopup = document.createElement("div");
        const locationAndIcon = document.createElement("div");
        const participantsAndIcon = document.createElement("div");
        const popupLocation = document.createElement("p");
        const popupParticipants = document.createElement("p");

        popupCard.classList.add("popup-card");
        popupTop.classList.add("popup-top");
        popupBottom.classList.add("popup-bottom");
        popupTime.classList.add("popup-event-time");
        popupName.classList.add("popup-event-name");
        popupDesc.classList.add("popup-event-description");
        popupBottomLinePopup.classList.add("bottom-line-popup");
        locationAndIcon.classList.add("location-and-icon");
        participantsAndIcon.classList.add("participents-and-icon");
        popupLocation.classList.add("popup-event-location");
        popupParticipants.classList.add("popup-event-participants");


        popupTime.textContent = formatHebrewDateTime(event.date, event.time);
        popupName.textContent = event.name;
        popupDesc.textContent = event.description;
        popupLocation.textContent = event.location;
        popupParticipants.textContent = formatParticipants(event);

        popupTop.appendChild(popupTime);
        popupTop.appendChild(popupName);
        popupBottom.appendChild(popupDesc);
        locationAndIcon.innerHTML = '<img src="./assets/location.png" alt="location" class="location-icon" />'
        locationAndIcon.appendChild(popupLocation);
        participantsAndIcon.innerHTML = '<img src="./assets/people.png" alt="people" class="people-icon" />'
        participantsAndIcon.appendChild(popupParticipants);
        popupBottomLinePopup.appendChild(popupParticipants);
        popupBottomLinePopup.appendChild(locationAndIcon);
        popupBottom.appendChild(popupBottomLinePopup);
        popupCard.appendChild(popupTop);
        popupCard.appendChild(popupBottom);
        popupCard.style.animationDelay = `${index * 0.1}s`;
        popup.appendChild(popupCard);
    });
}

function closePopup() {
    const popup = document.getElementById("event-popups");
    popup.classList.add("popup-closing");

    setTimeout(() => {
        document.getElementById("cover").style.display = "none";
        popup.classList.remove("popup-closing");
    }, 300);
}

function createWeeklyCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "<div style='visibility:hidden;'><span>-</span></div>";

    calendar.style.display = "flex";
    calendar.style.flexDirection = "column";

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const weeksSet = new Set();

    //get all week numbers in this month
    for (let day = 1; day <= lastDay; day++) {
        const date = new Date(year, month, day); +
            weeksSet.add(getWeekNumber(date));
    }
    const weeks = Array.from(weeksSet).sort((a, b) => a - b);

    weeks.forEach(weekNum => {
        const weekBtn = document.createElement("div");
        weekBtn.classList.add("week-row");
        weekBtn.textContent = `שבוע ${weekNum}`;
        weekBtn.addEventListener("click", () => {
            showWeek(weekNum, year);
        });
        calendar.appendChild(weekBtn);
    });

    weeklyBtn.classList.add("selected-calendar-btn");
    monthlyBtn.classList.remove("selected-calendar-btn");
}

function showWeek(weekNum, year) {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    document.getElementById("month-title").style.display = "none";
    document.getElementById("week-title").innerHTML = `שבוע ${weekNum}`

    const startOfWeek = getStartOfWeek(year, weekNum);

    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(startOfWeek);
        dayDate.setDate(startOfWeek.getDate() + i);

        const dateKey = formatDateKey(dayDate);
        const branchName = sessionStorage.getItem("branchName");
        const type = sessionStorage.getItem("type");

        const dayEvents = (events[dateKey] || []).filter(event =>
            filterEvent(event, branchName, type)
        );

        const row = document.createElement("div");
        row.classList.add("week-day-row");

        row.innerHTML = `<div class="week-day">
                ${(() => {
                let str = dayDate.toLocaleDateString("he-IL", { weekday: "short" });
                str = str.replace(/^יום\s*/, "");
                return str === "שבת" ? "ש׳" : str;
            })()}
            </div >
        <div class="week-events">
            ${dayEvents.length
                ? dayEvents.map(e => weeklyEventCard(e.name, e.location, e.time)).join("<br>")
                : ""}
        </div>`;

        row.addEventListener("click", () => {
            if (dayEvents.length) {
                eventPopUp(dayDate, dayEvents);
            }
        });

        calendar.appendChild(row);
    }
}

function weeklyEventCard(name, location, time) {
    return `<div class="weekly-event-card" >
                <div class="weekly-event-card-right">
                    <p class="name-weekly-event-card">${name}</p>
                </div>
                <div class="weekly-event-card-left">
                    <p class="time-weekly-event-card">${time}</p>
                    <div class="location-and-icon">
                        <p class="location-weekly-event-card">${location}</p>
                        <img src='./assets/location.png' alt="location" class="location-icon" />
                    </div>
                </div>
            </div> `
}

// helper functions

function toHebrewNumber(num) {
    const ones = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];
    const tens = ["", "י", "כ", "ל"];
    if (num === 15) return "ט״ו";
    if (num === 16) return "ט״ז";

    let result = "";

    if (num >= 10) {
        const t = Math.floor(num / 10);
        result += tens[t];
        num %= 10;
    }

    if (num > 0) {
        result += ones[num];
    }

    if (result.length === 1) {
        return result + "׳";
    } else if (result.length > 1) {
        return result.slice(0, -1) + "״" + result.slice(-1);
    }

    return result;
}

function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function formatDisplayDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

function getWeekNumber(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const firstSunday = new Date(startOfYear);
    firstSunday.setDate(startOfYear.getDate() - startOfYear.getDay());
    const diff = date - firstSunday;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return Math.floor(days / 7) + 1;

}

function formatHebrewDateTime(dateString, timeString) {
    const date = new Date(`${dateString}T${timeString}`);

    const formatted = date.toLocaleDateString("he-IL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const time = date.toLocaleTimeString("he-IL", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    return `${formatted} • ${time}`;
}

function getStartOfWeek(year, weekNum) {
    const startOfYear = new Date(year, 0, 1);
    const firstSunday = new Date(startOfYear);
    firstSunday.setDate(startOfYear.getDate() - startOfYear.getDay());
    const startOfWeek = new Date(firstSunday);
    startOfWeek.setDate(firstSunday.getDate() + (weekNum - 1) * 7);
    return startOfWeek;
}

function filterEvent(event, branchName, type) {
    // const branches = event.branches || [];
    const branches = expandBranches(event.branches || []);
    const types = event.types || [];

    const branchMatch =
        branches.includes("כל") ||
        branches.some(b => normalize(b) === normalize(branchName));

    const typeMatch =
        types.includes("כל") ||
        types.some(t => normalize(t) === normalize(type));

    return branchMatch && typeMatch;
}

function formatParticipants(event) {
    let branches = expandBranches(event.branches || []);
    const types = event.types || [];

    // return to display form
    const backToAbnormal = {
        "מפחט": "מפח''ט",
        "חירורקם": "חיר ורקם",
        "חתק": "חת''ק",
    };
    branches = branches.map(b => backToAbnormal[b] || b);

    // in case of all branches and all types
    if ((branches.includes("כל") ||
        ["מפח''ט", "חת''ק", "חיר ורקם"]
            .every(b => branches.some(x => normalize(x) === normalize(b))))
        &&
        (types.includes("כל") ||
            ["סדיר", "קבע"]
                .every(b => types.some(x => normalize(x) === normalize(b)))
        )) {
        return "כלל החטיבה";
    }

    // wording format
    const joinParticipants = (arr) => {
        if (!arr || arr.length === 0) return "";
        if (arr.length === 1) return arr[0];
        if (arr.length === 2) return arr.join(" ו");
        return arr.slice(0, -1).join(", ") + " ו" + arr.at(-1);
    };

    // in case of all branches or all types
    const branchText =
        (branches.includes("כל") ||
            ["מפח''ט", "חת''ק", "חיר ורקם"]
                .every(b => branches.some(x => normalize(x) === normalize(b))))
            ? "כלל החטיבה"
            : joinParticipants(branches);
    const typeText =
        types.includes("כל") ||
            ["סדיר", "קבע"]
                .every(b => types.some(x => normalize(x) === normalize(b)))
            ? ""
            : joinParticipants(types);
    if (branchText && typeText) {
        return `${branchText} ${typeText}`;
    }

    return branchText || typeText || "";
}

function normalize(str) {
    return (str || "")
        .replace(/\s+/g, "")
        .replace(/['״״"]/g, "")
        .trim();
}

function mapToHebrew(value, type) {
    if (!value) return "";

    const mapButton = {
        "mafhat": "מפח''ט",
        "hir-varekem": "חיר ורקם",
        "hatak": "חת''ק",

        "duty": "סדיר",
        "career": "קבע"
    };
    const mapTitle = {
        "מפח''ט": "מפח''ט",
        "חיר ורקם": "ענף חיר ורקם",
        "חת''ק": "ענף חת''ק",

        "סדיר": "משרתי סדיר",
        "קבע": "משרתי קבע",


        "מפחט": "מפח''ט",
        "חירורקם": "ענף חיר ורקם",
        "חתק": "ענף חת''ק"
    };
    if (type === "title") { return mapTitle[value] || value; }
    else if (type === "button") { return mapButton[value] || value; }
}

function expandBranches(branches) {
    if (!branches) return [];
    let normalized = branches.map(normalize);

    if (normalized.includes("ענפים")) {
        normalized = normalized.filter(b => b !== "ענפים");
        normalized.push("חת''ק", "חיר ורקם");
    }
    return normalized;
}


// זה הפורמט לאירועים, פשוט למלא בין הגרשיים (``) את המידע הנכון.
// בשורה האחת לפני האחרונה אפשר למלא ספציפית את הענפים שמשתתפים או לכתוב 'כל'.
// בשורה האחרונה אפשר למלא ספציפית סדיר/קבע או לכתוב 'כל'.

// {
//     name: `כותרת אירוע`,
//     date: `YYYY-MM-DD`,
//     time: `00:00`,
//     location: `מיקום אירוע`,
//     description: `תיאור כלשהו לאירוע`,
//     branches: [`מפח''ט`, `חת''ק`, `חיר ורקם`, `ענפים`, `כל`],
//     types: [`קבע`, `סדיר`, `כל`]
// },
// {
//     name: `מרכז מורשת צה''ל`,
//     date: `2026-05-11`,
//     time: `12:00`,
//     location: `יד ושם בבהדי''ם`,
//     description: `הכנת מפקדים למרכז מורשת`,
//     branches: [`כל`],
//     types: [`קבע`]
// },