const db = require('../config/connFirebase');

const getAllTravelData = async (req, res) => {
    try {
        const snapshot = await db.collection('travel').get();
        const docs = snapshot.docs.map((docs) => ({ id: docs.id, ...docs.data() }));
        res.status(200).json(docs);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getTravelDataById = async (req, res) => {
    try {
        const doc = await db.collection('travel').doc(req.params.id).get();
        res.status(200).json(doc.data());
    } catch (err) {
        res.status(500).json(err);
    }
}

const createTravel = async (req, res) => {
    try {
        await db.collection('travel').add(req.body);
        res.status(201).json({ msg: 'Travel data created successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateTravel = async (req , res) => {
    try{
        const doc = db.collection('travel').doc(req.params.id);
        await doc.update(req.body);
        res.status(200).json({msg: 'Travel data updated successfully'});
    }catch(err){
        res.status(500).json(err);
    }
}

const deleteTravel = async (req , res) => {
    try{
        const doc = db.collection('travel').doc(req.params.id);
        await doc.delete();
        res.status(200).json({msg: 'Travel data deleted successfully'});
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    getAllTravelData,
    getTravelDataById,
    createTravel,
    updateTravel,
    deleteTravel
}