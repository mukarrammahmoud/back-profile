import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Portfolio API',
            version: '1.0.0',
            description:
                'REST API for a developer portfolio backend — manages profile, projects, skills, work/education history and contact messages.',
            contact: {
                name: 'Mukarram Mahmoud',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local development server',
            },
        ],
        components: {
            schemas: {
                // ─── Profile ───────────────────────────────────────────
                Profile: {
                    type: 'object',
                    properties: {
                        id:          { type: 'integer', example: 1 },
                        fullName:    { type: 'string',  example: 'Mukarram Mahmoud' },
                        title:       { type: 'string',  example: 'Full Stack Developer' },
                        bio:         { type: 'string',  example: 'Passionate developer...' },
                        cvUrl:       { type: 'string',  example: 'https://example.com/cv.pdf' },
                        socialLinks: {
                            type: 'object',
                            example: { github: 'https://github.com/user', linkedin: 'https://linkedin.com/in/user' },
                        },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                ProfileInput: {
                    type: 'object',
                    properties: {
                        fullName:    { type: 'string',  example: 'Mukarram Mahmoud' },
                        title:       { type: 'string',  example: 'Full Stack Developer' },
                        bio:         { type: 'string',  example: 'Passionate developer...' },
                        cvUrl:       { type: 'string',  example: 'https://example.com/cv.pdf' },
                        socialLinks: {
                            type: 'object',
                            example: { github: 'https://github.com/user', linkedin: 'https://linkedin.com/in/user' },
                        },
                    },
                },

                // ─── Project ───────────────────────────────────────────
                Project: {
                    type: 'object',
                    properties: {
                        id:           { type: 'integer', example: 1 },
                        title:        { type: 'string',  example: 'Portfolio Backend' },
                        description:  { type: 'string',  example: 'A Node.js REST API...' },
                        imageUrl:     { type: 'string',  example: 'https://example.com/img.png' },
                        technologies: { type: 'array', items: { type: 'string' }, example: ['Node.js', 'PostgreSQL'] },
                        demoUrl:      { type: 'string',  example: 'https://demo.example.com' },
                        repoUrl:      { type: 'string',  example: 'https://github.com/user/repo' },
                        isFeatured:   { type: 'boolean', example: true },
                        createdAt:    { type: 'string',  format: 'date-time' },
                    },
                },
                ProjectInput: {
                    type: 'object',
                    required: ['title'],
                    properties: {
                        title:        { type: 'string',  example: 'Portfolio Backend' },
                        description:  { type: 'string',  example: 'A Node.js REST API...' },
                        imageUrl:     { type: 'string',  example: 'https://example.com/img.png' },
                        technologies: { type: 'array', items: { type: 'string' }, example: ['Node.js', 'PostgreSQL'] },
                        demoUrl:      { type: 'string',  example: 'https://demo.example.com' },
                        repoUrl:      { type: 'string',  example: 'https://github.com/user/repo' },
                        isFeatured:   { type: 'boolean', example: false },
                    },
                },

                // ─── Skill ─────────────────────────────────────────────
                Skill: {
                    type: 'object',
                    properties: {
                        id:               { type: 'integer', example: 1 },
                        name:             { type: 'string',  example: 'TypeScript' },
                        category:         { type: 'string',  example: 'Frontend' },
                        proficiencyLevel: { type: 'integer', example: 90, description: '0–100' },
                        iconUrl:          { type: 'string',  example: 'https://example.com/ts.svg' },
                    },
                },
                SkillInput: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name:             { type: 'string',  example: 'TypeScript' },
                        category:         { type: 'string',  example: 'Frontend' },
                        proficiencyLevel: { type: 'integer', example: 90 },
                        iconUrl:          { type: 'string',  example: 'https://example.com/ts.svg' },
                    },
                },

                // ─── History ───────────────────────────────────────────
                History: {
                    type: 'object',
                    properties: {
                        id:               { type: 'integer', example: 1 },
                        type:             { type: 'string',  example: 'work', enum: ['work', 'education'] },
                        organization:     { type: 'string',  example: 'Acme Corp' },
                        positionOrDegree: { type: 'string',  example: 'Senior Developer' },
                        description:      { type: 'string',  example: 'Led a team of 5 engineers...' },
                        startDate:        { type: 'string',  format: 'date', example: '2022-01-01' },
                        endDate:          { type: 'string',  format: 'date', example: '2024-12-31' },
                        isCurrent:        { type: 'boolean', example: false },
                    },
                },
                HistoryInput: {
                    type: 'object',
                    required: ['organization'],
                    properties: {
                        type:             { type: 'string',  example: 'work', enum: ['work', 'education'] },
                        organization:     { type: 'string',  example: 'Acme Corp' },
                        positionOrDegree: { type: 'string',  example: 'Senior Developer' },
                        description:      { type: 'string',  example: 'Led a team of 5 engineers...' },
                        startDate:        { type: 'string',  format: 'date', example: '2022-01-01' },
                        endDate:          { type: 'string',  format: 'date', example: '2024-12-31' },
                        isCurrent:        { type: 'boolean', example: false },
                    },
                },

                // ─── ContactMessage ────────────────────────────────────
                ContactMessage: {
                    type: 'object',
                    properties: {
                        id:          { type: 'integer', example: 1 },
                        senderName:  { type: 'string',  example: 'John Doe' },
                        senderEmail: { type: 'string',  example: 'john@example.com' },
                        subject:     { type: 'string',  example: 'Job Opportunity' },
                        message:     { type: 'string',  example: 'I love your portfolio!' },
                        isRead:      { type: 'boolean', example: false },
                        createdAt:   { type: 'string',  format: 'date-time' },
                    },
                },
                ContactMessageInput: {
                    type: 'object',
                    required: ['senderName', 'senderEmail', 'message'],
                    properties: {
                        senderName:  { type: 'string', example: 'John Doe' },
                        senderEmail: { type: 'string', example: 'john@example.com' },
                        subject:     { type: 'string', example: 'Job Opportunity' },
                        message:     { type: 'string', example: 'I love your portfolio!' },
                    },
                },

                // ─── Generic responses ─────────────────────────────────
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: true },
                        data:    { type: 'object' },
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        message: { type: 'string',  example: 'Resource not found.' },
                    },
                },
            },
        },
    },
    // Scan all route files for @swagger JSDoc comments
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
