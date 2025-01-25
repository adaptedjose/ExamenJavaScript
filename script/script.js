//Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(users => {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        closeLoginModal(); 
        localStorage.setItem('user', JSON.stringify(user)); 
        alert(`¡Bienvenido de nuevo, ${user.username}!`); 
        window.location.href = './index_2.html'; 
      } else {
        alert('Usuario o contraseña incorrectos. Por favor verifique su información o regístrese');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

//Register function
function register() {
    const newUsername = document.getElementById('new-username').value;
    const newEmail = document.getElementById('new-email').value;
    const newPassword = document.getElementById('new-password').value;
  
    const user = { username: newUsername, email: newEmail, password: newPassword };
  
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        closeRegisterModal(); 
        localStorage.setItem('user', JSON.stringify(data)); 
        alert(`¡Bienvenido, ${data.username}!`); 
      })
      .catch(error => {
        console.error('Error:', error);
      });
};

//Logout function 
function logout() {
    localStorage.removeItem('user');
    alert('Sesión cerrada.');
    window.location.href = './index.html';
};

//Open login modal function
function openLoginModal() {
    document.getElementById('loginModal').classList.remove('hidden');
};

//Open register modal function
function openRegisterModal() {
    document.getElementById('registerModal').classList.remove('hidden');
};

//Close login modal function
function closeLoginModal() {
    document.getElementById('loginModal').classList.add('hidden');
};

//Close register modal function
function closeRegisterModal() {
    document.getElementById('registerModal').classList.add('hidden');
    window.location.href = './index_2.html'; 
};

let currentColumn = '';

//Open task form function
function openForm(column) {
    currentColumn = column;
    document.getElementById('addTaskModal').classList.remove('hidden');
}

//Close task form function
function closeForm(column) {
    document.getElementById('addTaskModal').classList.add('hidden');
    document.getElementById('taskForm').reset();
}

//Add a task function
document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const startDate = document.getElementById('taskStartDate').value;
    const endDate = document.getElementById('taskEndDate').value;

    const taskHTML = `
        <div class="border-2 p-4 rounded-md mb-4 bg-green-400">
            <h3 class="font-semibold">${title}</h3>
            <p class="text-sm mb-2">${description}</p>
            <p class="text-xs text-gray-600">Inicio: ${startDate}</p>
            <p class="text-xs text-gray-600">Fin: ${endDate}</p>
        </div>
    `;
    document.getElementById(`${currentColumn}`).innerHTML += taskHTML;
    closeForm();
});

//Upload the information to the json-server
function uploadTask() {
  const newTaskTitle = document.getElementById('taskTitle').value;
  const newTaskDescription = document.getElementById('taskDescription').value;
  const newTaskStartDate = document.getElementById('taskStartDate').value;
  const newTaskEndDate = document.getElementById('taskEndDate').value;

  const task = {title: newTaskTitle, description: newTaskDescription, startDate: newTaskStartDate, endDate: newTaskEndDate};

  fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Tarea subida:', data);
      localStorage.setItem('task', JSON.stringify(data)); 
      alert("Su tarea ha sido registrada en la nube"); 
      //window.location.href = '/index_3.html'; 
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

