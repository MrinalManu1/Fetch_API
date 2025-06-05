const userContainer = document.getElementById('userContainer');
const errorMsg = document.getElementById('errorMsg');
const reloadBtn = document.getElementById('reloadBtn');

async function fetchUsers() {
  userContainer.innerHTML = '';
  errorMsg.textContent = '';
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    users.forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>Email:</strong> ${user.email}</p>
        <p>
          <strong>Address:</strong>
          ${user.address.street}, ${user.address.suite}, 
          ${user.address.city}, ${user.address.zipcode}
        </p>
      `;
      userContainer.appendChild(card);
    });
  } catch (error) {
    errorMsg.textContent = 'Failed to fetch user data. Please check your connection and try again.';
  }
}

reloadBtn.addEventListener('click', fetchUsers);

// Initial fetch
fetchUsers();
