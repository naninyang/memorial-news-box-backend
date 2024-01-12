'use strict';

/**
 * youtube-memorial service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::youtube-memorial.youtube-memorial');
