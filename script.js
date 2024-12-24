const buatServerForm = document.getElementById('buat-server-form');
const buatAdminForm = document.getElementById('buat-admin-form');
const hasilServerDiv = document.getElementById('hasil-server');
const hasilAdminDiv = document.getElementById('hasil-admin');

buatServerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const paket = document.getElementById('paket').value;

  let ram, cpu, disk;
  switch (paket) {
    case '1gb':
      ram = 1024;
      cpu = 1;
      disk = 0; 
      break;
    case '2gb':
      ram = 2048;
      cpu = 2;
      disk = 0; 
      break;
    case '4gb':
      ram = 4096;
      cpu = 4;
      disk = 0; 
      break;
  }

  try {
    const response = await fetch('/buat-server', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, ram, cpu, disk })
    });
    const data = await response.json();
    hasilServerDiv.innerHTML = `
      <h2>Hasil Create Server:</h2>
      <p>Username: ${data.user.username}</p>
      <p>Password: ${data.user.password}</p>
      <p>Server Name: ${data.server.name}</p>
    `;
  } catch (error) {
    console.error(error);
    hasilServerDiv.innerText = 'Gagal membuat server!';
  }
});

buatAdminForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;
  const email = document.getElementById('admin-email').value;

  try {
    const response = await fetch('/buat-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email })
    });
    const data = await response.json();
    hasilAdminDiv.innerHTML = `
      <h2>Hasil Create Admin:</h2>
      <p>Username: ${data.username}</p>
      <p>Password: ${data.password}</p>
      <p>Email: ${data.email}</p>
    `;
  } catch (error) {
    console.error(error);
    hasilAdminDiv.innerText = 'Gagal membuat admin!';
  }
});
