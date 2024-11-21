import AssessmentRepository from '../repositories/AssessmentRepository.js';

class AssessmentService {
    async createAssessment(data) {
        if (data.stars < 1 || data.stars > 5) {
            throw new Error('As estrelas devem estar entre 1 e 5');
        }
        return await AssessmentRepository.create(data);
    }

    async getAllAssessments() {
        return await AssessmentRepository.findAll();
    }

    async getAssessmentById(id) {
        const assessment = await AssessmentRepository.findById(id);
        if (!assessment) {
            throw new Error('erro mano');
        }
        return assessment;
    }

    async updateAssessment(id, data) {
        return await AssessmentRepository.update(id, data);
    }

    async deleteAssessment(id) {
        return await AssessmentRepository.delete(id);
    }
}

export default new AssessmentService();
