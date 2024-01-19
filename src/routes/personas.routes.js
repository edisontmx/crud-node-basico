import { Router } from 'express';
import pool from '../database.js';

const router = Router();

router.get('/add', (req,res)=>{
    res.render('personas/add');
})

router.post('/add', async(req, res)=>{
    try{
        const {nombre, correo}= req.body;
        const newReg={
            nombre, correo
        }
        await pool.query('INSERT INTO empleados SET ?', [newReg]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/list', async(req, res)=>{
    try{
        const [result]=await pool.query('SELECT * FROM empleados');
        res.render('personas/list', {personas: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
        

    }
})

router.get('/edit/:id', async(req, res)=>{
    try{
        const {id}=req.params;
        const [persona]=await pool.query('SELECT * FROM empleados WHERE id=?', [id]);
        const personaEdit=persona[0];
        res.render('personas/edit', {persona: personaEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/edit/:id', async(req, res)=>{
    try{
        const {nombre, correo}=req.body;
        const editPersona={nombre, correo};
        const {id}=req.params;
        await pool.query('UPDATE empleados SET ? WHERE id=?', [editPersona, id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/delete/:id', async(req, res)=>{
    try {
        const {id}= req.params;
        await pool.query('DELETE FROM empleados WHERE id=?', [id]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});

export default router;