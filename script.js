if (volunteerForm) {
  volunteerForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('vname').value;
    const email = document.getElementById('vemail').value;
    const phone = document.getElementById('vphone').value;

    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, phone })
      });

      const data = await response.json();
      alert("Registration Successful!");
      volunteerForm.reset();

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  });
}
