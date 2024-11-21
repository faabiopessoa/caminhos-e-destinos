import Assessment from '../models/Assessment.js';

class AssessmentRepository {
    async create(data) {
        return await Assessment.create(data);
    }

    async findAll() {
        return await Assessment.findAll();
    }

    async findById(id) {
        return await Assessment.findByPk(id);
    }

    async update(id, data) {
        const assessment = await Assessment.findByPk(id);
        if (!assessment) {
            throw new Error('erro mano');
        }
        return await assessment.update(data);
    }

    async delete(id) {
        const assessment = await Assessment.findByPk(id);
        if (!assessment) {
            throw new Error('erro mano');
        }
        await assessment.destroy();
    }
}

export default new AssessmentRepository();
