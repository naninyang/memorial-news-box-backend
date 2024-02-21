'use strict';

/**
 * develog service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::develog.develog');
