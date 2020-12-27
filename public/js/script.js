const checkbox = document.getElementById('checkbox');
const currentTheme = localStorage.getItem("theme");
const btn = document.querySelector(".btn");

// Dark mode script
if(currentTheme == "dark") {
    document.body.classList.toggle("dark-theme");
    checkbox.checked = true;
}

checkbox.addEventListener('change', () => {
    document.body.classList.toggle("dark-theme"); 

    let theme = "light";
    
    if(document.body.classList.contains("dark-theme")) {
        theme = "dark";
    }

    localStorage.setItem("theme", theme);
});

// Add form validation
function validateForm() {
    const addForm = document.forms["addForm"]["nama"].value;

    if(addForm == "") {
        alert("Nama tidak boleh kosong!");
        return false;
    }
}


