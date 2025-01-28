document.getElementById('searchButton').addEventListener('click', function() {
    fetchPostOfficeData();
});

// Navbar Toggle Functionality
const navbarToggle = document.getElementById('navbarToggle');
const navbarLinks = document.getElementById('navbarLinks');

navbarToggle.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

async function fetchPostOfficeData() {
    const pincode = document.getElementById('pincode').value;
    if (!pincode) {
        alert("Please enter a pincode.");
        return;
    }

    const url = `https://api.postalpincode.in/pincode/${pincode}`;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p>Please wait! We are fetching your postal details...</p>';

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data[0].Status === "Success") {
            const postOffices = data[0].PostOffice;
            let html = '';
            postOffices.forEach(office => {
                html += `
                    <div class="post-office">
                        <h3>${office.Name}</h3>
                        <p><strong>Branch Type:</strong> ${office.BranchType}</p>
                        <p><strong>Delivery Status:</strong> ${office.DeliveryStatus}</p>
                        <p><strong>District:</strong> ${office.District}</p>
                        <p><strong>State:</strong> ${office.State}</p>
                        <p><strong>Pincode:</strong> ${office.Pincode}</p>
                    </div>
                `;
            });
            resultDiv.innerHTML = html;
        } else {
            resultDiv.innerHTML = `<p>No post offices found for pincode: ${pincode}</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p>Error fetching data. Please try again.</p>`;
        console.error(error);
    }
}