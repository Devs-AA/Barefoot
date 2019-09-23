import dotEnv from 'dotenv';
import express from 'express';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import swaggerDocument from '../swagger.json';

// Configure dotEnv
dotEnv.config();

const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

// swagger config middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.enable('trust proxy');

// Normal express config defaults
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

if (!isProduction) {
  app.use(errorHandler());
}

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
const server = app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default server;
