require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const Item = require('./models/Item')

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB 연결 성공'))
  .catch((err) => console.error('❌ MongoDB 연결 실패:', err));

app.get('/items', async (req, res) => {
  const items = await Item.find(); 
  res.json(items);
});

app.get('/debug', async (req, res) => {
  try {
    const items = await Item.find();
    if (items.length === 0) {
      return res.send('⚠️ 데이터 없음1');
    }
    res.json(items);
  } catch (err) {
    res.status(500).send('❌ 에러 발생: ' + err.message);
  }

});


app.listen(port,() => {
  console.log(`🚀 서버 실행 중: http://localhost:${port}`);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
