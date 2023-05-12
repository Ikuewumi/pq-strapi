'use strict';

/**
 * featured controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::featured.featured', ({ strapi }) => ({
    // wrap a core action, leaving core logic in place
    async find(ctx) {
      // some custom logic here
        ctx.query = { ...ctx.query }

        const { data, meta } = await super.find(ctx);
        const entry = await strapi.entityService.findOne('api::featured.featured', data.id, {
            populate: { quizzes: true },
        });

        const customData = { ...data }
        customData.attributes["quizzes"] = entry["quizzes"]
            

        return { data: {...customData}, meta };
  
    },
  }));
