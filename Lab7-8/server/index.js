import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

let inventory = []; 

app.get('/inventory', (req, res) => {
  res.json(inventory);
});

app.post('/register', upload.single('photo'), (req, res) => {
  const { inventory_name, description } = req.body;
  const newItem = {
    id: Date.now(),
    inventory_name,
    description,
    photo: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : null
  };
  inventory.push(newItem);
  res.status(201).json(newItem);
});

app.delete('/inventory/:id', (req, res) => {
  inventory = inventory.filter(item => item.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});