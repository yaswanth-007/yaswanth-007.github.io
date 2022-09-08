function validateAge(today, dobobj) {
    var age = today.getFullYear() - dobobj.getFullYear();
    var m = today.getMonth() - dobobj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobobj.getDate())) {
      age--;
    }
    return age;
  }
  let dobelement = document.getElementById("dob");
  dobelement.addEventListener("change", () => {
    let [y,m,d] = document.getElementById("dob").value.split("-");
    let dob = new Date(y,m,d);
    let Today = new Date();
    age = validateAge(Today, dob);
    if (age < 18 || age > 55) {
      dobelement.setCustomValidity("Age must lie in 18 and 55 year`s only..");
   
      return;
    } else {
      dobelement.setCustomValidity("");
    }
  });

let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if(entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};

  

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();


    const tableEntries = entries.map((entry) => {
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passwordcell = `<td>${entry.password}</td>`;
        const dobcell = `<td>${entry.dob}</td>`;
        const acceptTermscell = `<td>${entry.acceptTerms}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordcell} ${dobcell} ${acceptTermscell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class = "result-class"><tr> 
    <th>Name</th>
    <th>Email</th>
     <th>Password</th> 
     <th>Dob</th> 
     <th> Accepted terms?</th>
      </tr>${tableEntries} </table>`;

let details = document.getElementById("user-entries");
details.innerHTML = table;
}

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptTerms
    }
    userEntries.push(entry);

    localStorage.setItem("user-entries",JSON.stringify(userEntries));
    displayEntries();
};
userForm.addEventListener("submit", saveUserForm);

displayEntries();