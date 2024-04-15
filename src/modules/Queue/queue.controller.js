import {
  createQueue,
  deleteQueue,
  getPositionInQueue,
  freePositionInQueue,
  countRemainingInQueue,
} from "./queue.service.js";
class QueueController {
  //user enters the queue
  async createQueue(req, res) {
    try {
      const queue = await createQueue(req.body.shop, req.user.userId);
      res.status(201).json(queue);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //recruiter deletes queue
  async deleteQueue(req, res) {
    try {
      const deletedQueue = await deleteQueue(
        req.params.queueId,
        req.user.userId
      );
      res.status(203).json(deletedQueue);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // get user queueu remaining in shop
  async positionInQueue(req, res) {
    try {
      const position = await getPositionInQueue(
        req.params.shopId,
        req.user.userId
      );
      res.status(200).json(position);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // free first positioned user from queue
  async freePositionInQueue(req, res) {
    try {
      const position = await freePositionInQueue(
        req.params.shopId,
        req.user.userId
      );
      res.status(200).json(position);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // count QueueUsers remaining for shop
  async countRemainingInQueue(req, res) {
    try {
      const count = await countRemainingInQueue(req.params.shopId);
      res.status(200).json(count);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new QueueController();
