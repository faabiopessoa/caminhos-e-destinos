import touristSpotService from '../services/TouristSpotService.js';

const touristSpotController = {
    create: async (req, res) => {
        const { foto, nome, descricao } = req.body;
        const newTouristSpot = await touristSpotService.create(foto, nome, descricao);
        res.status(201).json(newTouristSpot);
    },

    findAll: async (req, res) => {
        const touristSpots = await touristSpotService.findAll();
        res.json(touristSpots);
    },

    findById: async (req, res) => {
        const touristSpot = await touristSpotService.findById(parseInt(req.params.id));
        if (!touristSpot) {
            return res.status(404).json({ message: 'Ponto turístico não encontrado' });
        }
        res.json(touristSpot);
    },

    update: async (req, res) => {
        const { foto, nome, descricao } = req.body;
        const touristSpot = await touristSpotService.update(parseInt(req.params.id), foto, nome, descricao);
        if (!touristSpot) {
            return res.status(404).json({ message: 'Ponto turístico não encontrado' });
        }
        res.json(touristSpot);
    },

    delete: async (req, res) => {
        const deleted = await touristSpotService.delete(parseInt(req.params.id));
        if (!deleted) {
            return res.status(404).json({ message: 'Ponto turístico não encontrado' });
        }
        res.status(200).send();
    },
};

export default touristSpotController;