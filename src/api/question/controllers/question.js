'use strict';

/**
 * question controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::question.question', ({ strapi }) => ({
    // wrap a core action, leaving core logic in place
    async findOne(ctx) {
      // some custom logic here
      ctx.query = { ...ctx.query }

      const { data, meta } = await super.findOne(ctx);
      const entry = await strapi.entityService.findOne('api::question.question', data.id, {
        populate: { questions: true },
      });

      if (entry?.questions?.length > 0) {
          entry.questions = entry.questions.map(question => {
            const q = {
                ...question,
                options: question.options.split('\n')
            }

            return q
          });

      }

      const customData = { ...data }
      customData.attributes["questions"] = entry["questions"]
      
      console.log({customData})

      return { 
        data: {...customData},
        meta 
      };
  
    },
  }));
