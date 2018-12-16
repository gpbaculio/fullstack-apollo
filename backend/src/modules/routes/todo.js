import express from 'express'
import { Todo } from '../models'

const router = express.Router()

router.post('/', async (req, res) => {
  const { text, userId } = req.body;
  const newTodo = await new Todo({ text, userId });
  newTodo
    .save()
    .then(async ({ _id: id }) => {
      const todoWithUserRecord = await Todo.findOne({ _id: id }).populate('userId', '_id')
      res.json({ todo: todoWithUserRecord })
    })
    .catch(error => res.status(400).json({ error }))
})

router.post('/toggle_complete', async (req, res) => {
  const { ids, userId, complete } = req.body;
  try {
    await Todo.updateMany(
      { _id: { $in: ids }, userId },
      { $set: { complete } },
      async () => {
        const todos = await Todo.find(
          { _id: { $in: ids }, userId }
        ).populate('userId', '_id');
        res.json({ todos })
      }
    );
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.post('/delete', async (req, res) => {
  const { id, userId } = req.body;
  await Todo.findOneAndRemove({ _id: id, userId }, error => {
    if (error) {
      res.status(400).json({ error })
    } else {
      res.json('OK')
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

router.post('/update_text', async (req, res) => {
  const { id, userId, text } = req.body;
  await Todo.findOneAndUpdate(
    { _id: id, userId },
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
  console.log('fetchtodos req query = ', req.query)
  const squery = { userId: id };
  // if (search) {
  //   query.text = { '$regex': `${search}`, '$options': 'i' }
  // }
  // if (complete) {
  //   query.complete = complete
  // }
  Todo.paginate(
    squery,
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