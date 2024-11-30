import touristSpotService from '../services/TouristSpotService.js';
import TouristSpot from '../models/TouristSpot.js';
import Assessment from '../models/Assessment.js';

const touristSpotController = {
    create: async (req, res) => {
        try {
            const { nome, preco, descricao } = req.body;
            const foto = req.file.filename; 

            const newTouristSpot = await TouristSpot.create({
                nome,
                preco,
                descricao,
                foto,
            });

            return res.status(201).json(newTouristSpot);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const touristSpots = await touristSpotService.findAll();
            const spotsWithFullImageUrl = touristSpots.map(spot => ({
                ...spot.toJSON(),
                foto: `http://localhost:3000/uploads/${spot.foto}`  
            }));
            res.json(spotsWithFullImageUrl);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    

    findById: async (req, res) => {
        try {
            const touristSpot = await TouristSpot.findByPk(req.params.id, {
                include: [{
                    model: Assessment,
                    as: 'assessments',
                }],
            });

            if (!touristSpot) {
                return res.status(404).json({ message: 'Ponto turístico não encontrado' });
            }

            touristSpot.foto = `http://localhost:3000/uploads/${touristSpot.foto}`;

            res.json(touristSpot);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },   

    /*update: async (req, res) => {
        const { foto, nome, descricao } = req.body;
        const touristSpot = await touristSpotService.update(parseInt(req.params.id), foto, nome, descricao);
        if (!touristSpot) {
            return res.status(404).json({ message: 'Ponto turístico não encontrado' });
        }
        res.json(touristSpot);
    },*/

    delete: async (req, res) => {
        const deleted = await touristSpotService.delete(parseInt(req.params.id));
        if (!deleted) {
            return res.status(404).json({ message: 'Ponto turístico não encontrado' });
        }
        res.status(200).send();
    },
};

export default touristSpotController;