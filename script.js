
function register() {

    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value.trim();

    if(user === "" || pass === ""){
        alert("Please enter username and password");
        return;
    }

    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);

    alert("Registration Successful");
}

function login() {

    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value.trim();

    let savedUser = localStorage.getItem("user");
    let savedPass = localStorage.getItem("pass");

    if(user === savedUser && pass === savedPass){

        alert("Login Successful");
        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Username or Password");
    }
}


function addMedicine() {

    let name =
    document.getElementById("medicineName").value;

    let time =
    document.getElementById("medicineTime").value;

    if(name === "" || time === "") {

        alert("Please fill all fields");
        return;

    }

    let medicines =
    JSON.parse(localStorage.getItem("medicines")) || [];

    medicines.push({
        name: name,
        time: time,
        taken: false
    });

    localStorage.setItem(
        "medicines",
        JSON.stringify(medicines)
    );

    alert("Medicine Added Successfully");

    document.getElementById("medicineName").value = "";
    document.getElementById("medicineTime").value = "";
}
function loadHistory() {

    let historyList =
    document.getElementById("historyList");

    if (!historyList) return;

    let medicines =
    JSON.parse(localStorage.getItem("medicines")) || [];

    historyList.innerHTML = "";

    medicines.forEach((medicine, index) => {

        let li = document.createElement("li");

        li.innerHTML = `
            <strong>${medicine.name}</strong><br>
            Time: ${medicine.time}<br>
            Status: ${medicine.taken ? "Taken" : "Pending"}
            <br><br>
            <button onclick="markTaken(${index})">
                Mark Taken
            </button>
        `;

        historyList.appendChild(li);
    });
}

function markTaken(index) {

    let medicines =
    JSON.parse(localStorage.getItem("medicines")) || [];

    medicines[index].taken = true;

    localStorage.setItem(
        "medicines",
        JSON.stringify(medicines)
    );

    loadHistory();
}
function loadDashboard() {

    let totalMed =
    document.getElementById("totalMed");

    let takenMed =
    document.getElementById("takenMed");

    let pendingMed =
    document.getElementById("pendingMed");

    if(!totalMed || !takenMed || !pendingMed){
        return;
    }

    let medicines =
    JSON.parse(localStorage.getItem("medicines")) || [];

    let total = medicines.length;

    let taken =
    medicines.filter(
        medicine => medicine.taken
    ).length;

    let pending =
    total - taken;

    totalMed.innerText = total;
    takenMed.innerText = taken;
    pendingMed.innerText = pending;
}
function logout() {

    if(confirm("Do you want to logout?")) {
        window.location.href = "index.html";
    }

}
window.onload = function(){

    loadDashboard();
    loadHistory();
    loadReports();
    loadProfile();

};