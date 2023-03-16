// time frame from 8am
var startHour = moment().startOf('day').add(7,'h');
var totalHours = 11;

// time right now
var timeRn = moment().format('H');

// initialize calendar event and state 
var calendarEvent;
var stateRn;


function displayToday() {
    var today = moment().format("dddd, MMMM Do, HH:mm A");
    $('#currentDay').text(today);
}

function fillTotalHours() {

    for (var hour = 0; hour < totalHours; hour++) { 
        var realHour = hour + 8;

        calendarEvent = startHour.add(1,'h').format('HH:mm A');

        if (timeRn == realHour) {
            stateRn = 'present';
        } else if (timeRn < realHour) {
            currentState = 'past';
        } else {
            stateRn = 'future';
        }

        var appendBlock = 
            `<div id="hour-${realHour}" class="row time-block ${stateRn}">
                <div class="col-md-1 hour">${calendarEvent}</div>
                <textarea class="col-md-10 description ${realHour}"></textarea>
                <button class="btn saveBtn col-md-1">
                    <i class="fas fa-save"></i>
                </button>
            </div>`;

        $(".container").append(appendBlock);

    }

    loadSchedule();
}

// function for save schedule in the local storage
function saveSchedule() {

    var keyName = $(this).parent().attr('id');
    var keyValue = $(this).parent().children().eq(1).val();

    localStorage.setItem(keyName, keyValue);
}


function loadSchedule() {

    for (var hour = 0; hour < totalHours; hour++) {
        var realHour = hour + 8;
        var loadedSchedule = localStorage.getItem(`hour-${realHour}`);

        $(`.${realHour}`).val(loadedSchedule);
    }

}

// update time
setInterval(function() {
    displayToday();
}, 60000);

// updating entire time table every 10 minutes
setInterval(function() {
    fillTotalHours();
}, 600000);

// call functions
displayToday();
fillTotalHours();
$('.saveBtn').on('click', saveSchedule);