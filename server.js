    const Pusher = require('pusher');
    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');

    const app = express();

    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    
    var pusher = new Pusher({
        appId: 'Your-app-Id',
        key: 'Your-app-key',
        secret: 'Your-app-secret',
        cluster: 'eu',
        encrypted: true
      });

    app.set('PORT', process.env.PORT || 6000);

    app.post('/message', (req, res) => {
      const message = req.body;
      pusher.trigger('chat', 'message', message);
      res.send(message)
    });

    app.listen(app.get('PORT'), () => 
      console.log('Listening at ' + app.get('PORT')))
