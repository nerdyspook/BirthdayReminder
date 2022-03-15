/* Today's Date */
const today = new Date();
const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
};

document.getElementById("heading").innerHTML = today.toLocaleDateString(
    "en-US",
    options
);

/* ============================= Data ============================ */

/**
 * For making birth date to current date to show content
 * We can change birth dates to current dates to see person in results
 */

var currentDateAndMonth =
    (today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1) +
    "/" +
    today.getDate();

// Date :  MM/DD/YYYY
const data = [
    {
        id: 1,
        name: "Bertie Yates",
        date: "01/25/2000",
        image: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
    },
    {
        id: 2,
        name: "Hester Hogan",
        date: currentDateAndMonth + "/1997", // changing date and month to current date to show initial content
        image: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-3_rxtqvi.jpg",
    },
    {
        id: 3,
        name: "Larry Little",
        date: currentDateAndMonth + "/1996", // changing date and month to current date to show initial content
        image: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
    },
    {
        id: 4,
        name: "Sean Walsh",
        date: "09/11/1996",
        image: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
    },
    {
        id: 5,
        name: "Lola Gardner",
        date: "05/25/1996",
        image: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
    },
];

/**
 * Today Birthday Data Filter
 * Filters only those person who are having birthday today
 */

let todayData = [];
let upcomingData = [];

const currentDate = today.getDate();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

todayData = data.filter((person, index) => {
    const { date } = person;
    return (
        parseInt(date.substring(3, 5)) === currentDate &&
        parseInt(date.substring(0, 2)) === currentMonth + 1
    );
});

/**
 * Upcoming Birthday Data Filter
 * Filters only thos person who are NOT having birthday today
 */

upcomingData = data.filter((person, index) => {
    const { date } = person;
    return (
        parseInt(date.substring(3, 5)) !== currentDate &&
        parseInt(date.substring(0, 2)) !== currentMonth + 1
    );
});

/* ================= Count remaining days till next birthday =================== */

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

const getNextDate = (date) => {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Check for February
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }

    // Check for other months
    else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };
};

const remainingDays = (date) => {
    let counter = 0;
    const todayDate = {
        day: currentDate,
        month: currentMonth + 1,
        year: currentYear,
    };
    let nextDate = getNextDate(todayDate);
    date = date.split("/");

    let birthday = {
        day: Number(date[1]),
        month: Number(date[0]),
        year: currentYear + 1,
    };

    while (1) {
        counter++;
        if (
            nextDate.day === birthday.day &&
            nextDate.month === birthday.month &&
            nextDate.year === birthday.year
        ) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    if (date[2] <= currentYear) {
        if (counter >= 365 && date[1] !== currentDate) {
            counter -= 365;
        }
    }

    return counter;
};

/* =========================== Element for a Person ========================= */

const createPerson = (fullName, date, image) => {
    let article = document.createElement("article");
    article.setAttribute("class", "person");

    let img = new Image();
    img.src = image;
    img.setAttribute("alt", fullName);

    let info = document.createElement("div");

    let h4 = document.createElement("h4");
    h4.setAttribute("id", "name");
    h4.innerHTML = fullName;

    let p = document.createElement("p");

    let age = Math.abs(Number(currentYear) - Number(date.substring(6, 10)));

    if (Number(date.substring(6, 10) >= Number(currentYear))) {
        p.innerHTML = `not born yet`;
        if (Number(date.substring(0, 2) > Number(currentMonth))) {
            p.innerHTML = `not born yet`;
            if (Number(date.substring(3, 5) > Number(currentDate))) {
                p.innerHTML = `not born yet`;
            } else {
                p.innerHTML = `${age} years`;
            }
        } else {
            p.innerHTML = `${age} years`;
        }
    } else {
        p.innerHTML = `${age} years`;
    }
    console.log(date);

    let daysLeft = document.createElement("p");
    daysLeft.setAttribute("id", "days-left");
    daysLeft.innerText = `${remainingDays(date)} days left`;

    info.appendChild(h4);
    info.appendChild(p);

    article.appendChild(img);
    article.appendChild(info);
    article.appendChild(daysLeft);

    return article;
};

/* =========================== People in Today List ============================ */

let noOfBirthdays = document.getElementById("noOfBirthdays");
noOfBirthdays.innerHTML = todayData.length + " birthdays today";

let people = document.getElementById("people");

todayData.forEach((person) => {
    const { id, name, date, image } = person;

    const personElement = createPerson(name, date, image);

    people.appendChild(personElement);
});

/* ========================== People in Upcoming List ========================== */

let upcomingNoOfBirthdays = document.getElementById("upcoming__noOfBirthdays");
upcomingNoOfBirthdays.innerHTML = `${upcomingData.length} birthdays upcoming`;

let upcomingPeople = document.querySelector("#upcoming__people");

upcomingData.forEach((person) => {
    const { id, name, date, image } = person;

    const personElement = createPerson(name, date, image);

    upcomingPeople.appendChild(personElement);
});

/* ========================= Change format of date ============================ */
const correctDate = (date) => {
    let dobObj = { day: "", month: "", year: "" };

    if (date.day < 10) {
        dobObj.day = "0" + date.day;
    } else {
        dobObj.day = date.day;
    }

    if (date.month < 10) {
        dobObj.month = "0" + date.month;
    } else {
        dobObj.month = date.month;
    }

    dobObj.year = date.year;

    return dobObj;
};

/* ========================= Add a new person in the list ====================== */

let todayCount = 0;
let upcomingCount = 0;
const addBirthdate = (person) => {
    const { id, name, date, image } = person;

    const personElement = createPerson(name, date, image);

    if (
        parseInt(Number(date.substring(3, 5))) === currentDate &&
        parseInt(Number(date.substring(0, 2))) === currentMonth + 1
    ) {
        todayCount++;
        people.appendChild(personElement);
        noOfBirthdays.innerHTML = `${
            todayData.length + todayCount
        } birthdays today`;
    } else {
        upcomingCount++;
        upcomingPeople.appendChild(personElement);

        upcomingNoOfBirthdays.innerHTML = `${
            upcomingData.length + upcomingCount
        } birthdays upcoming`;
    }
};

/* ======================== Value to enter a new person ======================== */

const dateOfBirth = document.querySelector("#dob");
const fullName = document.querySelector("#fullname");
const profilePic = document.querySelector("#pictureInput");
const submitButton = document.querySelector("#submit");

profilePic.addEventListener("change", function () {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        sessionStorage.setItem("recent-image", reader.result);
    });

    reader.readAsDataURL(this.files[0]);
});

const clickHandler = () => {
    let dobStr = dateOfBirth.value;

    if (dobStr !== "" && fullName.value !== "") {
        let listOfDate = dobStr.split("-");
        let dobDate = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0]),
        };

        dobDate = correctDate(dobDate);

        let obj = {};
        obj["id"] = data.length + 1;
        obj["name"] = fullName.value;
        obj["date"] = `${dobDate.month}/${dobDate.day}/${dobDate.year}`;
        obj["image"] = sessionStorage.getItem("recent-image");

        data.push(obj);

        addBirthdate(obj);

        dateOfBirth.value = "";
        fullName.value = "";
        profilePic.value = "";

        /* Clear previous session data */
        sessionStorage.clear();
    } else {
        dateOfBirth.value = "";
        fullName.value = "";
        profilePic.value = "";
        console.log("Please Enter the BirthDate and Name");
    }
};

submitButton.addEventListener("click", clickHandler);
