const mongoose = require('mongoose');
const CheckList = mongoose.model('checklists');
const _ = require('lodash');

module.exports = (app, auth) => {
  app.get("/api/checklists", auth.authenticate(),
    async (req, res) => {
      console.log("get /api/checklists:", req.user);

      const checklists = await CheckList.find({
        '_user': req.user.id
      }).exec();

      const ret = _.keyBy(checklists, '_id');
      console.log("get /api/checklists, ret=", ret);
      res.send(ret);
    });

  app.get("/api/checklist/:id", auth.authenticate(),
    async (req, res) => {
      console.log("get /api/checklist:", req.user, req.params.id);

      const checklist = await CheckList.find({
        '_user': req.user.id,
        '_id': req.params.id
      }).exec();

      const ret = _.keyBy(checklist, '_id');
      console.log("get /api/checklist, ret=", ret);

      res.send(ret);
    });

  app.post("/api/checklist", auth.authenticate(), async (req, res) => {
    console.log("post /api/checklist:", req.user, req.body);
    if (!req.body.title || !req.body.items){
      res.sendStatus(401);
      return;
    }

    const {title, items} = req.body;

    const checklist = await new CheckList({
      'title': title,
      'items': items,
      'createDate': Date.now(),
      '_user': req.user.id
    }).save();

    res.send(_.keyBy(checklist, '_id'));

  });

};
