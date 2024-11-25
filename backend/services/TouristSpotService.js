import touristSpotRepository from '../repositories/TouristSpotRepository.js';

const touristSpotService = {
    create: async (foto, nome, descricao) => await touristSpotRepository.create(foto, nome, descricao),
    
    findAll: async () => await touristSpotRepository.findAll(),
    findById: async (id) => await touristSpotRepository.findById(id),
    update: async (id, foto, nome, descricao) => await touristSpotRepository.update(id, foto, nome, descricao),
    delete: async (id) => await touristSpotRepository.delete(id),
};

export default touristSpotService;