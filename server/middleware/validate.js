const { z } = require('zod');

const submissionSchema = z.object({
  name: z.string(),
  college: z.string(),
  project_title: z.string().min(1).max(255),
  domain: z.enum(['Full Stack', 'Platforms Engineering', 'Quant Research', 'Finance', 'Machine Learning', 'Data Science', 'DevOps', 'Blockchain']),
});

const validateSubmission = (req, res, next) => {
    try{
        const validData = submissionSchema.parse(req.body);
        req.validatedData = validData;
        next();
    }
    catch(error){
        return res.status(400).json({
            error: 'Validation Failed',
            details: error.errors ? error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
        })) : [{ message: error.message }]
        });
    };
};

module.exports = { validateSubmission };