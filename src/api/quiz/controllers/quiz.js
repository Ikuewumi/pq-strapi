'use strict';

/**
 * quiz controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::quiz.quiz', ({ strapi }) => ({
    // wrap a core action, leaving core logic in place
    async findOne(ctx) {
      // some custom logic here
      ctx.query = { ...ctx.query }

      const { data, meta } = await super.findOne(ctx);
      const entry = await strapi.entityService.findOne('api::quiz.quiz', data.id, {
        populate: { author: true, questions: true },
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
      customData.attributes["author"] = entry["author"]
      customData.attributes["questions"] = entry["questions"]
      
    //   console.log(data, meta)

      return { 
        data: {
          ...customData
        },
        meta
      };
  
    },
  }));
