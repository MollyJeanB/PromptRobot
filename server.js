const express = require('express')
const app = express()
const axios = require('axios')

app.use(express.static('.'))


app.get("/words", (req, res) => {
  const url = "https://wordsapiv1.p.mashape.com/words/"
  const partOfSpeech = req.query.partOfSpeech
  axios({
    method: "get",
    url: url,
    headers: {
      "X-Mashape-Key": "weimaIdwA2mshYKc2oV4L2MIVOdJp1KUgPljsnhFB9NN6T5JKc"
    },
    params: {
      random: true,
      partOfSpeech: partOfSpeech,
      lettersMax: 7,
      definition: true,
      letterPattern: '^((?! ).)*$',
    }
  }).then(apiRes => {
    res.send(JSON.stringify(apiRes.data))
  })
})

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))
