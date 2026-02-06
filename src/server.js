const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`DialAI running on port ${process.env.PORT}`);
});
