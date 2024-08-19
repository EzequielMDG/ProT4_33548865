import { Router } from 'express';
import { libro } from './controller.js';

export const router = Router()

router.get('/libros', libro.getAll);
router.post('/libro', libro.add);
router.delete('/libro', libro.delete);
router.put('/libro', libro.update);

// Ruta para obtener un libro por id
router.post('/libros', libro.getOne);

// Ruta para eliminar un libro por ISBN
router.delete('/libros', libro.deleteByISBN);