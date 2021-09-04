import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { I18n } from "i18n";

// Routers
import apiRoutes from './router';
import mongoose from "mongoose";

// Middleware
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { localeMiddleware } from "./middleware/locale.middleware";

dotenv.config()

if (!process.env.PORT &&
  !process.env.DATABASE_HOST &&
  !process.env.DATABASE_PORT &&
  !process.env.DATABASE
) {
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)
const app = express()


// I18N
const i18n = new I18n()
i18n.configure({
  locales:['en', 'vi'],
  directory: __dirname + '/static/locales',
  queryParameter: 'locale',
});


// Use Package
app.use(express.static(__dirname + '/static'))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(i18n.init);

app.use(localeMiddleware)

// Use Routes
apiRoutes(app)


// Use Middleware
app.use(errorHandler)
app.use(notFoundHandler)


// Mongoose connect
mongoose.connect(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (err: any) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('connected to database');
})


// Server listen
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
