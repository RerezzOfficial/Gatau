
const express = require('express');
const bodyParser = require('body-parser');
const Pterodactyl = require('node-pterodactyl-api');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const domain = 'https://xyrezz-official.online-server.biz.id'; 
const apikey = 'ptla_NrSSRjczpiA1ZB2wxRXHDpNOSSkkhKvuVFf3Xnek0vv'; 
const capikey = '_'; 
const eggsnya = '15'; 
const location = '1'; 

const pterodactyl = new Pterodactyl(apikey, domain);

app.post('/buat-server', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const ram = req.body.ram;
  const cpu = req.body.cpu;
  const disk = req.body.disk;

  try {
    const user = await pterodactyl.createUser({
      email: `${username}@dalang.com`,
      username: username,
      first_name: username,
      last_name: Memb,
      language: 'en',
      password: password,
    });

    const server = await pterodactyl.createServer({
      name: `${username} Server`,
      description: '',
      egg: parseInt(eggsnya),
      docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
      startup: 'startup_cmd',
      environment: {
        INST: 'npm',
        USER_UPLOAD: '0',
        AUTO_UPDATE: '0',
        CMD_RUN: 'npm start',
      },
      limits: {
        memory: ram,
        swap: 0,
        disk: disk,
        io: 500,
        cpu: cpu,
      },
      feature_limits: {
        databases: 5,
        backups: 5,
        allocations: 1,
      },
      deploy: {
        locations: [parseInt(location)],
        dedicated_ip: false,
        port_range: [],
      },
    });

    res.json({
      message: 'Server berhasil dibuat!',
      user,
      server,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal membuat server!' });
  }
});

app.post('/buat-admin', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  try {
    const admin = await pterodactyl.createAdmin({
      username,
      password,
      email,
    });

    res.json({
      message: 'Admin berhasil dibuat!',
      admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal membuat admin!' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
        
