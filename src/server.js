const { PORT } = require('./common/config');
const app = require('./app');

const { connectDb, models } = require('./db');

const eraseDatabaseOnSync = false;

connectDb().then(async () => {
  try {
    if (eraseDatabaseOnSync) {
      await Promise.all([
        models.User.deleteMany({}),
        models.Task.deleteMany({})
      ]);
    }

    app.listen(PORT, () =>
      console.log(`App is running on http://localhost:${PORT}`)
    );
  } catch (e) {
    console.error(e);
  }
});
