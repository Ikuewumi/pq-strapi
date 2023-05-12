'use strict';

/**
 * author controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::author.author', ({ strapi }) => ({
    // wrap a core action, leaving core logic in place
    async findOne(ctx) {

  
      // calling the default core action with super
      const { data, meta } = await super.findOne(ctx);
      
      return { data, meta };
  
    },
  }));
