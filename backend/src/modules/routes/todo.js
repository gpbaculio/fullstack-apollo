import express from 'express'
import { Todo } from '../models'

const router = express.Router()

router.post('/', async (req, res) => {
  const { text, userId } = req.body;
  const newTodo = await new Todo({ text, userId });
  newTodo
    .save()
    .then(async ({ _id }) => {
      const todo = await Todo.findOne({ _id })
      res.json({ todo })
    })
    .catch(error => res.status(400).json({ error }))
})

router.post('/toggleComplete', async (req, res) => {
  const { input: { _ids, complete }, user: { id: userId } } = req.body;
  await Todo.updateMany(
    { _id: { $in: _ids }, userId },
    { $set: { complete, updatedAt: Date.now() } },
    async (error) => {
      if (error) {
        res.status(400).json({ error })
      }
      await Todo.find(
        { _id: { $in: _ids }, userId },
        '_id',
        (err, result) => {
          if (err) {
            res.status(400).json({ error: err })
          }
          res.json({ _ids: result })
        }
      )
    }
  );
})

router.post('/deleteTodo', async (req, res) => {
  const { input: { _id }, user: { id: userId } } = req.body;
  await Todo.findOneAndRemove({ _id, userId }, (error) => {
    if (error) {
      res.status(400).json({ error })
    } else {
      res.status(200).json({ _id })
    }
  });
})

router.post('/clearCompleted', async (req, res) => {
  const { input: { _ids }, user: { id: userId } } = req.body;
  await Todo.find(
    { userId, _id: { $in: _ids } },
    '_id',
    async (error, result) => {
      if (error) {
        res.status(400).json({ error })
      }
      await Todo.deleteMany(
        { userId, _id: { $in: _ids } },
        (deleteError) => {
          if (deleteError) {
            res.status(400).json({ error: deleteError })
          } else {
            res.json({ _ids: result.map(({ _id }) => _id) })
          }
        });
    })
})

router.post('/updateText', async (req, res) => {
  const { input: { _id, text }, userId } = req.body;
  await Todo.findOneAndUpdate(
    { _id, userId },
    { $set: { text } },
    { new: true },
    (error, result) => {
      if (error) {
        res.json({ error })
      } else {
        res.json({ todo: result })
      }
    }
  );
})

router.get("/fetchTodos", async (req, res) => {
  const { id, offset, limit, complete, search } = req.query
  const query = { userId: id };
  if (search !== 'undefined') {
    query.text = { '$regex': `${search}`, '$options': 'i' }
  }
  if (complete !== 'undefined') {
    query.complete = complete
  }
  Todo.paginate(
    query,
    {
      offset: parseFloat(offset),
      limit: parseFloat(limit),
      sort: { createdAt: -1 } // Sort by Date Added DESC
    },
    (error, { docs, total }) =>
      error ? res.status(400).json({ error }) :
        res.status(200).json({ count: total, todos: docs })
  );
});

export default router