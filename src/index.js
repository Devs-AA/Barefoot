import dotEnv from 'dotenv';
import cors from 'cors';
import express from 'express';
import path from 'path';
import http from 'http';
import socket from 'socket.io';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
// eslint-disable-next-line import/no-cycle
import routes from './routes';
import swaggerDocument from './config/swaggerDocs';
import cloudinaryConfig from './config/cloudinary';
// Configure dotEnv
dotEnv.config();

const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

const server = http.createServer(app);
export const io = socket(server);


// Static files setup
app.use(express.static(path.join(__dirname, '../public')));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});

// swagger config middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.enable('trust proxy');
app.use(cors());

// Normal express config defaults
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// passport configuration and initialization
app.use(passport.initialize()); // Used to initialize passport


if (!isProduction) {
  app.use(errorHandler());
}
app.use(cloudinaryConfig);
app.use(routes);

// / catch 404 and forward to error handler
app.use('*', (req, res) => {
  res.status(404).json({ status: 404, message: 'That route is not a known route' });
});


// / error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message || 'Something went wrong',
    });
  });
}
// production error handler
// no stacktraces leaked to user
// eslint-disable-next-line no-unused-vars

// finally, let's start our server...
server.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default server;
