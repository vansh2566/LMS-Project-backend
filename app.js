import { configDotenv } from 'dotenv';
configDotenv();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js'; 
import courseRoutes from './routes/course.routes.js'; 
import paymentRoutes from './routes/payment.routes.js';
import miscellaneousRoutes from './routes/miscellaneous.routes.js';
import express from 'express';
import connectToDb from './config/db.config.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true }));


app.use('/api/v1/user', userRoutes); 
app.use('/api/v1/courses', courseRoutes); 
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/', miscellaneousRoutes);
 

app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: "LMS Learning Platform: Page Not Found",
        error: {
            statusCode: 404,
            customMessage: "Looks like you've wandered into uncharted territory! 📚",
            helpText: [
                "Don't worry, even the best students take wrong turns sometimes!",
                "Here's what you can try:",
                "• Check if the URL is correct",
                "• Return to the homepage",
                "• Browse our course catalog",
                "• Contact our support team if you need help"
            ].join("\\n"),
            isTemporary: false
        }
    });
    res.status(404).send('OOPS!! 404 page not found');
})

app.use(errorMiddleware);

// db init
connectToDb();

export default app;