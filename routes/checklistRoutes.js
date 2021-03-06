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

      res.send(checklist[0]);
    });

  app.post("/api/checklist", auth.authenticate(), async (req, res) => {
    console.log("post /api/checklist:", req.user, req.body);
    if (!req.body.title || !req.body.items){
      res.sendStatus(401);
      return;
    }

    if(req.body._id) {
      const {title, items, _id} = req.body;
      console.log("post /api/checklist: update: ", title, items, _id);
      const updateRes = await CheckList.updateOne(
        {
          '_id': _id
        },{
          $set:{title: title, items: items}
        }).exec();

      const checklist =  await CheckList.findOne({'_id': _id}).exec();
      res.send(checklist);
    }
    else {
      const {title, items} = req.body;

      const checklist = await new CheckList({
        'title': title,
        'items': items,
        'createDate': Date.now(),
        '_user': req.user.id
      }).save();
      res.send(checklist);
    }
  });

  app.delete("/api/checklist", auth.authenticate(), async (req, res) => {
    console.log("delete /api/checklist:", req.user, req.body);

    const {_id} = req.body;
    if (!req.body._id){
      res.sendStatus(401);
      return;
    }

    console.log("delete /api/checklist: id: ", _id);
    await CheckList.deleteOne({'_id': _id})
      .exec()
      .then( r => res.send({}))
      .catch( e => res.sendStatus(500) );
  });

};
