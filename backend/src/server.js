import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;
const HOST = '127.0.0.1';

app.listen(PORT, HOST, () => {
  console.log(`===============================================`);
  console.log(`  Nature Travel Tour backend server.js active!`);
  console.log(`  Server is listening on http://${HOST}:${PORT}`);
  console.log(`===============================================`);
});
