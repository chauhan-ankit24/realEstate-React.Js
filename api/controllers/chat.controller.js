import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  if (!tokenUserId) {
    return res.status(401).json({ message: "User not authenticated!" });
  }

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }

    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  if (!tokenUserId) {
    return res.status(401).json({ message: "User not authenticated!" });
  }

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;

  if (!tokenUserId) {
    return res.status(401).json({ message: "User not authenticated!" });
  }

  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, req.body.receiverId],
      },
    });
    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  if (!tokenUserId) {
    return res.status(401).json({ message: "User not authenticated!" });
  }

  try {
    // First get the current chat to check seenBy array
    const existingChat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!existingChat || !existingChat.userIDs.includes(tokenUserId)) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    // Only update if user hasn't already seen it
    let seenByUpdate = existingChat.seenBy;
    if (!seenByUpdate.includes(tokenUserId)) {
      seenByUpdate = [...seenByUpdate, tokenUserId];
    }

    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: seenByUpdate,
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};

export const getChatsBetweenUsers = async (req, res) => {
  const { senderId, receiverId } = req.params;
  const tokenUserId = req.userId;

  if (!tokenUserId) {
    return res.status(401).json({ message: "User not authenticated!" });
  }

  // Ensure the authenticated user is either the sender or receiver
  if (tokenUserId !== senderId && tokenUserId !== receiverId) {
    return res.status(403).json({ message: "Not authorized to view this chat!" });
  }

  console.log(senderId, receiverId);
  try {
    let chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasEvery: [senderId, receiverId],  // Ensure both sender and receiver are in the chat
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    // If no chat exists between users, create one
    if (chats.length === 0) {
      const newChat = await prisma.chat.create({
        data: {
          userIDs: [senderId, receiverId],
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
      chats = [newChat];
    }

    res.status(200).json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve chats!" });
  }
};
