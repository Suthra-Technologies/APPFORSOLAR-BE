import { Router } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

const router = Router();

// AWS S3 Configuration derived from env pipeline
const s3 = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'your_aws_access_key_id',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'your_aws_secret_key'
    }
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME || 'solar-app-assets',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            // Uniquely identify each timestamp file 
            cb(null, `uploads/${Date.now().toString()}_${file.originalname}`);
        }
    })
});

// @swagger integration to provide documentation immediately
/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload assets like Logos directly securely to AWS S3 Buckets automatically 
 *     tags: [Assets]
 *     responses:
 *       200:
 *         description: Successfully uploaded payload rendering public S3 Asset URL mapping globally
 */
router.post('/', upload.single('asset'), (req: any, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file explicitly attached' });

        const file = req.file as any;
        res.status(200).json({ success: true, url: file.location });
    } catch (error) {
        console.error('AWS S3 Pipeline Error:', error);
        res.status(500).json({ success: false, error: 'Failed executing S3 artifact upload block' });
    }
});

export default router;
