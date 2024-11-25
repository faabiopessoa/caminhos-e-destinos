import TouristSpot from '../models/TouristSpot.js';

const TouristSpotRepository = {
    create: async (foto, nome, descricao) => {
        return await TouristSpot.create({ foto, nome, descricao });
    },

    findAll: async () => {
        return await TouristSpot.findAll();
    },

    findById: async (id) => {
        return await TouristSpot.findByPk(id);
    },

    update: async (id, foto, nome, descricao) => {
        const touristSpot = await TouristSpot.findByPk(id);
        if (touristSpot) {
            touristSpot.foto = foto;
            touristSpot.nome = nome;
            touristSpot.descricao = descricao;
            await touristSpot.save();
        }
        return touristSpot;
    },

    delete: async (id) => {
        const touristSpot = await TouristSpot.findByPk(id);
        if (touristSpot) {
            await touristSpot.destroy();
            return true;
        }
        return false;
    },
};

export default TouristSpotRepository;