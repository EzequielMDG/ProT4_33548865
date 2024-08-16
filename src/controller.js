import {pool} from './database.js';

class LibroController { 

    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async add(req, res) {
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, año, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.año, libro.ISBN]);
        res.json({"Id insertado": result.insertId});
    }

    async delete(req,res){
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM Libros WHERE id=(?)`,[libro.id]);
        res.json({"Registros eliminados": result.affectedRows});
    }

    async update(req,res){
        const libro = req.body;
        const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), año-publicacion=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.año-publicacion, libro.ISBN, libro.id]);
        res.json({"Registros actualizados": result.changedRows});
    }

    // Método para obtener un libro por id

    async getOne(req, res) {
        const id = req.params;
        if (!id) {
            return res.status(400).json({ 
                message: 'Falta el id del libro a consultar',
            });
        }

        try {
            const [result] = await pool.query('SELECT * FROM Libros WHERE id = ?', [id]);
            if (result.length === 0) {
                return res.status(404).json({ 
                    message: 'Libro no encontrado',
                });
            }
            res.json({ 
                data: result[0],
            });
        } catch (error) {
            res.status(500).json({ 
                message: 'Error al obtener el libro',
                error: error.message,
            });
        }
    }

    // Método para eliminar un libro por ISBN

    async deleteByISBN(req, res) {
    const { ISBN } = req.body; // Extraer ISBN del cuerpo de la solicitud

    if (!ISBN) {
        return res.status(400).json({ 
            message: 'Ingrese el ISBN correcto del libro a eliminar',
        });
    }

    try {
        const [result] = await pool.query('DELETE FROM Libros WHERE ISBN = ?', [ISBN]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Libro no encontrado',
            });
        }
        
        res.json({ 
            message: 'Libro eliminado exitosamente',
            affectedRows: result.affectedRows,
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al eliminar el libro',
            error: error.message,
        });
    }
}
}

export const libro = new LibroController(); 