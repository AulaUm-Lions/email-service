import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

// ✅ Usa o __dirname nativo do CommonJS (sem import.meta)
const fileLog = fs.createWriteStream(
  path.join(__dirname, '..', 'storage', 'access.log'),
  { flags: 'a' }
);

export const log = morgan('combined', { stream: fileLog });
