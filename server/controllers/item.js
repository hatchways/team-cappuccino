const Item = require("../models/item");
const List = require("../models/list");
const User = require("../models/user");
const { itemScrapping, priceScrapping } = require("../utils/scrapper/scrapping");
const CronJob = require("cron").CronJob;
const { sendPriceDrop } = require('../services/sendgrid-email');

// get item id
exports.itemById = (req, res, next, id) => {
  Item.findById(id)
    .populate("list", "_id name")
    .exec((err, item) => {
      if (err || !item) return res.status(400).json({ error: err });

      req.item = item;
      next();
    });
};

// adding item
exports.addItem = async (req, res) => {
  const { url } = req.body;

  try {
    // start scrapping
    await itemScrapping.initialize();
    let details = await itemScrapping.getProductDetails(url);
    // convert string to price
    const itemPrice = parseFloat(details.price.replace("$", ""));

    const item = new Item({ url: url });
    List.findById(req.params.listId)
      .populate("items")
      .populate("user")
      .exec(async function(err, foundList) {
        if (err)
          return res.status(400).json({
            error: "Invalid data!"
          });

        foundList.items.push(item); // add to items
        // update item and user
        item.list = foundList;
        item.user = foundList.user;
        item.name = details.title;
        item.image = details.image;
        item.prices.push({ price: itemPrice });

        // save item
        await item.save();
        await foundList.save();
        const { _id, name, prices, image, url } = item;
        await itemScrapping.end(); // quit browser

        res.status(200).json({ _id, name, url, prices, image });
      });
  } catch (e) {
    await itemScrapping.end(); // quit browser
    res.status(400).send({ error: e.message });
  }
};

// getAllItems
exports.getAllItems = async (req, res) => {
  Item.find({ list: req.params.listId }).exec((err, items) => {
    if (err) return res.status(400).json({ error: err });

    return res.status(200).json(items);
  });
};

// get single item
exports.getSingleItem = async (req, res) => {
  return res.json(req.item);
};

// Delete Item
exports.deleteItem = async (req, res) => {
  const _id = req.params.id;

  try {
    await Item.findOne({ _id, user: req.user._id })
      .populate("list")
      .populate("user")
      .exec(async (err, result) => {
        if (err) return res.status(400).json({ error: err });

        if (!result) res.status(400).send({ error: "Item is not found!" });

        // upate List and User
        List.findByIdAndUpdate(result.list, { $unset: { items: _id } });
        ``;
        User.findByIdAndUpdate(result.user, { $unset: { items: _id } });

        // remove item
        result.remove();
        res.status(200).send({ message: "Item is removed!" });
      });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

// delete all items
exports.deleteAllItems = (req, res) => {
  try {
    Item.remove({ list: req.params.listId });
    res.status(200).json({ message: "All items are deleted" });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

// setting cron-job to for scrapping automation
exports.testingPrice = (req, res) => {
  Item.find({}).exec((err, items) => {
    if (err) res.status(400).json({ error: err });

    items.forEach(item => {
      console.log(item.prices);
    });

    res.status(200).json({ message: "Look at console log" });
  });
};

// setting up cron job to schedule scarpping every 23 hours
new CronJob(
  "* * 23 * * *",
  async function() {
    // 1. Find all item to track
    Item.find({}).populate("user", "name email").exec(async (err, items) => {
      if (err) console.log(err); // print error

      // loop to find item prices
      await Promise.all(items.map(async (item) => {
        // 2. Scrap the price with each item's url
        await priceScrapping.initialize();
        let scrappedInfo = await priceScrapping.getProductPrice(item.url);
        // convert string to price
        const newItemPrice = await parseFloat(scrappedInfo.price.replace("$", ""));
        // add new price into our current prices
        item.prices.push({ price: newItemPrice });
        await item.save(); // save item


        // compare our new price with our previous price
        const pricesLength = item.prices.length;
        const newPrice = item.prices[pricesLength - 1].price;
        const oldPrice = item.prices[pricesLength - 2].price;
        console.log(newPrice, oldPrice);

        // see if new price is less than old price
        if(newPrice < oldPrice) {
          // send out email to notify user about price change;
          sendPriceDrop(item.user.email, item.user.name, item.name);
          await priceScrapping.end(); // after 3 seconds browser close
        } else {
          await priceScrapping.end();
        }
      }));
    });
  },
  null,
  true,
  "America/Los_Angeles"
);
