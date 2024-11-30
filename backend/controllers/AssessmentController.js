import AssessmentService from '../services/AssessmentService.js';

class AssessmentController {
    async create(req, res) {
    try {
      const data = req.body;
      
      if (!data.touristSpotId) {
        throw new Error("O ID do ponto turístico é obrigatório.");
      }
  
      const assessment = await AssessmentService.createAssessment(data);
      return res.status(201).json(assessment);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  

    async getAll(req, res) {
        try {
            const assessments = await AssessmentService.getAllAssessments();
            return res.status(200).json(assessments);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const assessment = await AssessmentService.getAssessmentById(id);
            return res.status(200).json(assessment);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedAssessment = await AssessmentService.updateAssessment(id, data);
            return res.status(200).json(updatedAssessment);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await AssessmentService.deleteAssessment(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}

export default new AssessmentController();
