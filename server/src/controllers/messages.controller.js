const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../exeptions/api.error');
const { messageService } = require('../services/messageService');
const { roomServices } = require('../services/room.services');
const { usersServices } = require('../services/users.services');

const getMessagesByRoom = async (req, res) => {
  const { roomId } = req.body;

  const messages = await messageService.getMessagesByRoom(roomId);

  res.status(200).json(messages);
};

const createMessage = async (req, res) => {
  const { text, roomId, userId } = req.body;

  const room = await roomServices.getRoomById(roomId);

  if (!room) {
    throw ApiError.notFound("The room doesn't exist");
  }

  const user = await usersServices.getUsersById(userId);

  if (!user) {
    throw ApiError.notFound("The user doesn't exist");
  }

  const message = await messageService.createMessage(
    text,
    user.name,
    userId,
    roomId,
  );

  res.status(201).json(message);
};

module.exports = {
  messagesControllers: {
    getMessagesByRoom: asyncHandler(getMessagesByRoom),
    createMessage: asyncHandler(createMessage),
  },
};
