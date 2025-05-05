const { Page } = require('../models');
const { User } = require('../models');

const createOrUpdatePage = async (req, res) => {
  const { title, links } = req.body;
  const userID = req.user.id;

  try {
    const page = await Page.findOne({ where: { userId: userID } });

    if (page) {
        await Page.update({ title, links }, { where: { userId: userID } });
        const updatedPage = await Page.findOne({ where: { userId: userID } });
        return res.status(200).json(updatedPage);
    }

    const result = await Page.create({
      userId: userID,
      title,
      links,
    });

    res.status(201).json({
      id: result.id,
      title: result.title,
      links: result.links,
      userId: result.userId
    });

    res.status(201).json(result);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

const getPagebyUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'Page not found' });
    }

    const page = await Page.findOne({ where: { userId: user.id } });

    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.status(200).json({
      title: page.title,
      links: page.links
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

const getPagebyUserId = async (req, res) => {
    const userID = req.user.id;
  
    try {
      const page = await Page.findOne({ where: { userId: userID } });
  
      if (!page) {
        return res.status(404).json({ error: 'Page not found' });
      }

      const user = await User.findOne({ where: { id: userID } });
  
      res.status(200).json({
        title: page.title,
        links: page.links,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });

    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error' });
    }
  };

module.exports = { createOrUpdatePage, getPagebyUserId, getPagebyUsername };