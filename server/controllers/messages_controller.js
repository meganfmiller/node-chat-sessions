let messages = [];
let id = 0;

module.exports = {
  create: ( req, res ) => {
    const { text, time } = req.body;
    const message = { id, text, time };
    messages.push(message);
    //ALSO add to session to keep a history
    req.session.user.messages.push(message)
    id++;
    res.status(200).send( messages );
  },

  history: (req,res) => {
    res.send(req.session.user.messages)
  },

  read: ( req, res ) => {
    res.status(200).send( messages );
  },

  //  /api/messages?id=XXXXX instead of /api/messages/:id
  update: ( req, res ) => {
    const { text } = req.body;
    const updateID = req.query.id;
    const messageIndex = messages.findIndex( message => message.id == updateID );
    let message = messages[ messageIndex ];

    messages[ messageIndex ] = {
      id: message.id,
      text: text || message.text,
      time: message.time
    };

    res.status(200).send( messages );
  },

  delete: ( req, res ) => {
    const deleteID = req.query.id;
    messageIndex = messages.findIndex( message => message.id == deleteID );
    messages.splice(messageIndex, 1);
    res.status(200).send( messages );
  }
};