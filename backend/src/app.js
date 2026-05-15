import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes
import route from './routes/payments.route.js';
import errorMiddleware from './middleware/error.middleware.js';
import authroute from './routes/auth.route.js';
import subRoute from './routes/subscription.route.js';

const app = express();

//json, cors and cookie middleware 
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api/v1/payments', route);
app.use('/api/v1/auth', authroute);
app.use("/api/v1/subscription",subRoute)
// home page to confirm api is up and running
app.get('/', (req, res) => {
  res.send('API Running...');
});

app.use(errorMiddleware);


//global error handler  
app.use((err, req, res, next) => {

  console.log(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

export default app;