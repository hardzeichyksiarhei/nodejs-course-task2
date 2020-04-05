const { PORT } = require('./common/config');

const app = require('./app');

async function start() {
  try {
    app.listen(PORT, () =>
      console.log(`App is running on http://localhost:${PORT}`)
    );
  } catch (e) {
    console.error(e);
  }
}

start();
