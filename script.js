var attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];

function submitAttendance() {
    var studentName = document.getElementById("studentName").value;
    
    var attendanceStatus;
    var radioButtons = document.getElementsByName("attendance");
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            attendanceStatus = radioButtons[i].value;
            break;
        }
    }

    if (studentName && attendanceStatus) {
        attendanceData.push({ studentName: studentName, attendanceStatus: attendanceStatus });

        updateAttendanceList();

        localStorage.setItem("attendanceData", JSON.stringify(attendanceData));

        document.getElementById("studentName").value = "";
        
        for (var i = 0; i < radioButtons.length; i++) {
            radioButtons[i].checked = false;
        }

        document.getElementById("attendanceList").style.opacity = 0;
    } else {
        alert("Please provide both student name and attendance status.");
    }
}

function updateAttendanceList() {
    var listElement = document.getElementById("list");
    listElement.innerHTML = ""; 

    attendanceData.forEach(function (attendance) {
        var listItem = document.createElement("li");
        listItem.textContent = attendance.studentName + " - " + attendance.attendanceStatus;
        listItem.classList.add("animate__animated", "animate__fadeIn");
        listElement.appendChild(listItem);
    });

    document.getElementById("attendanceList").style.opacity = 1;
}

function clearAttendanceList() {
    attendanceData = [];
    updateAttendanceList();

    localStorage.removeItem("attendanceData");
}

function saveAttendanceList() {
    var wb = XLSX.utils.book_new();
    
    var ws = XLSX.utils.json_to_sheet(attendanceData);
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");

    XLSX.writeFile(wb, "attendance_list.xlsx");
}
