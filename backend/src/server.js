require('dotenv').config({
  path: '.env'
}); // Config loaded

const app = require('./app');
const { handleUnhandledRejection, handleUncaughtException } = require('./middleware/errorMiddleware');

// Handle uncaught exceptions (must be at the top)
handleUncaughtException();

// Handle unhandled promise rejections
handleUnhandledRejection();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 DialAI running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
