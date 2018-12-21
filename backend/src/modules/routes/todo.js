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
    { $set: { complete } },
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
  await Todo.findOneAndRemove({ _id, userId }, (error, todo) => {
    if (error) {
      res.status(400).json({ error })
    } else {
      res.status(200).json({ _id: todo._id })
    }
  });
})

router.post('/delete_completed', async (req, res) => {
  const { ids, userId } = req.body;
  await Todo.deleteMany({ userId, _id: { $in: ids } }, error => {
    if (error) {
      res.status(400).json({ error })
    } else {
      res.json('OK')
    }
  });
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
  const { id, offset, limit } = req.query
  const query = { userId: id };
  // if (search) {
  //   query.text = { '$regex': `${search}`, '$options': 'i' }
  // }
  // if (complete) {
  //   query.complete = complete
  // }
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