import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getScore/:id', async(req, res) => {
  const {id}=req.params;
  let result=await fetch(` https://m.cricbuzz.com/api/mcenter/scorecard/${id}`)
  result=await result.json()
  let totalData = result?.scoreCard
  // console.log(result)
  res.json({
    totalData:totalData,
    status:result?.status,
  })
});

app.get('/miniScore/:id', async(req, res) => {
  const {id}=req.params;
  let result=await fetch(` https://www.cricbuzz.com/api/cricket-match/commentary/${id}`)
  result=await result.json()
  let totalData = result;
  // console.log(result)
  res.json(totalData)
});
app.get('/matchDetails/:id', async(req, res) => {
  const {id}=req.params;
  let result=await fetch(` https://m.cricbuzz.com/api/mcenter/scorecard/${id}`)
  result=await result.json()
  let totalData = result.matchHeader;
  res.json(totalData)
});

app.listen(8888, () => {
  console.log('Server listening on port 8888!');
});