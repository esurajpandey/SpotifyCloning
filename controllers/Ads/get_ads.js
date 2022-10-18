const db = require("../../models/db");

exports.get_ads = async (req, resp, next) => {
  try {
    const userId = req.userId;
    const subscription = await db.Subscription.findOne({
      where: userId,
    });

    if (subscription.planId != 1) {
      resp.send({
        status: false,
        message: "Premium User",
      });
    } else {
      const ad = await db.ads.findOne({ order: "random()" });
      const adUp = await db.ads.findOne({ where: { adsId: ad.adsId } });

      adUp.received = ads.received + 1;
      await adUp.save();
      resp.send({ status: true, data: ad });
    }
  } catch (err) {
    resp.send({ status: false, message: err.message });
  }
};
