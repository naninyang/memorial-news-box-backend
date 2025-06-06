import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAiSemoviewAiSemoview extends Schema.CollectionType {
  collectionName: 'ai_semoviews';
  info: {
    singularName: 'ai-semoview';
    pluralName: 'ai-semoviews';
    displayName: 'AI Semoview';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subject: Attribute.String;
    description: Attribute.Text;
    chloe: Attribute.Blocks;
    gpt: Attribute.Blocks;
    fieldName: Attribute.String;
    fieldValue: Attribute.String;
    isPublish: Attribute.Boolean & Attribute.DefaultTo<false>;
    question: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ai-semoview.ai-semoview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ai-semoview.ai-semoview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAmusementJejeupAmusementJejeup
  extends Schema.CollectionType {
  collectionName: 'amusement_jejeups';
  info: {
    singularName: 'amusement-jejeup';
    pluralName: 'amusement-jejeups';
    displayName: 'Amusement Jejeup';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    release: Attribute.String & Attribute.Required;
    category: Attribute.Enumeration<
      [
        'drama',
        'film',
        'game',
        'anime',
        'anime_film',
        'ott_drama',
        'ott_drama_enter',
        'ott_film',
        'ott_anime',
        'ott_anime_film',
        'ott_documentary',
        'ott_documentary_film',
        'game_fan'
      ]
    > &
      Attribute.Required;
    anime: Attribute.Enumeration<['tva', 'ova', 'film']>;
    ott: Attribute.Enumeration<
      [
        'amazonOriginal',
        'appleOriginal',
        'appleFilm',
        'disneyOriginal',
        'disneyStar',
        'netflixSeries',
        'netflixPresents',
        'netflixOriginal',
        'netflixFilm',
        'netflixAnime',
        'netflixAnimeFilm',
        'netflixDocumentary',
        'tvingOriginal',
        'tvingOnly',
        'watchaOriginal',
        'watchaExclusive',
        'wavveOriginal',
        'wavveOnly',
        'waveOnly',
        'waveFirstrun',
        'paramount'
      ]
    >;
    rating: Attribute.Enumeration<['all', 'a7', 'b12', 'c15', 'd19']> &
      Attribute.Required;
    publisher: Attribute.String & Attribute.Required;
    creator: Attribute.String & Attribute.Required;
    cast: Attribute.Text;
    genre: Attribute.String & Attribute.Required;
    country: Attribute.String & Attribute.Required;
    posterDefault: Attribute.Text & Attribute.Required;
    posterOther: Attribute.Text;
    original: Attribute.Enumeration<
      [
        'animation',
        'cartoon',
        'drama',
        'film',
        'novel',
        'lightNovel',
        'webtoon',
        'game',
        'fairytale',
        'memoirs',
        'music'
      ]
    >;
    lang: Attribute.Enumeration<
      [
        'chineseBeonche',
        'chineseGanche',
        'english',
        'japanese',
        'thai',
        'europe'
      ]
    >;
    titleOther: Attribute.String;
    originalAuthor: Attribute.String;
    originTitle: Attribute.String;
    etc: Attribute.String;
    titleKorean: Attribute.String;
    synopsys: Attribute.Text;
    ratingCustom: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    ottAddr: Attribute.String;
    ogImg: Attribute.String;
    broadcast: Attribute.Enumeration<
      ['KBS1', 'KBS2', 'MBC', 'SBS', 'tvN', 'OCN', 'JTBC', 'ENA', 'ABC']
    >;
    isMobile: Attribute.Boolean & Attribute.DefaultTo<false>;
    animeBroadcast1: Attribute.Enumeration<
      ['tokyomx', 'tvtokyo', 'fujitv', 'mbs', 'tbs', 'atx', 'nippontv', 'wowow']
    >;
    animeBroadcast2: Attribute.Enumeration<
      ['aniplus', 'daewon', 'anibox', 'tooniverse', 'animax']
    >;
    relations: Attribute.String;
    order: Attribute.String;
    tags: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          'mobile',
          'game',
          'drama',
          'anime',
          'film',
          'healing',
          'yuri',
          'queer',
          'isekai',
          'timeslip',
          'anomalies',
          'apocalypse',
          'picaresca',
          'horror',
          'strategy',
          'backroom',
          'simulation',
          'relife'
        ]
      >;
    related: Attribute.JSON;
    supportLang: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['subtitle', 'unofficial', 'dubbing', 'cc', 'description']
      >;
    comment: Attribute.Text;
    runningTime: Attribute.Integer;
    dubbing: Attribute.Text;
    characters: Attribute.Text;
    dubbingLang: Attribute.Enumeration<['japanese', 'english']>;
    studio: Attribute.String;
    distributor: Attribute.String;
    director: Attribute.String;
    bfree: Attribute.JSON;
    series: Attribute.Integer;
    season: Attribute.String;
    franchise: Attribute.String;
    relName: Attribute.String;
    logoSize: Attribute.Enumeration<['default', 'half', 'double']> &
      Attribute.DefaultTo<'default'>;
    wavveSeries: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['bbc', 'hbomax', 'hulu', 'nbc', 'peacock', 'sky', 'syfy']
      >;
    isPublish: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::amusement-jejeup.amusement-jejeup',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::amusement-jejeup.amusement-jejeup',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBannerMoeviewBannerMoeview extends Schema.CollectionType {
  collectionName: 'banner_moeviews';
  info: {
    singularName: 'banner-moeview';
    pluralName: 'banner-moeviews';
    displayName: 'Banner Moeview';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    link: Attribute.String;
    description: Attribute.String;
    author: Attribute.String;
    title: Attribute.String;
    color: Attribute.String;
    order: Attribute.Integer;
    isLight: Attribute.Boolean & Attribute.DefaultTo<true>;
    type: Attribute.Enumeration<
      ['film', 'anime', 'ott', 'barrier_free', 'semoview']
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::banner-moeview.banner-moeview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::banner-moeview.banner-moeview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBannerNol2TrBannerNol2Tr extends Schema.CollectionType {
  collectionName: 'banner_nol2trs';
  info: {
    singularName: 'banner-nol2tr';
    pluralName: 'banner-nol2trs';
    displayName: 'Banner Nol2tr';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    idx: Attribute.String;
    description: Attribute.String;
    interview: Attribute.JSON;
    subject: Attribute.String;
    type: Attribute.Enumeration<['interview', 'newsic', 'playlist']>;
    order: Attribute.Integer;
    isLTR: Attribute.Boolean & Attribute.DefaultTo<true>;
    color: Attribute.String;
    isLight: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::banner-nol2tr.banner-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::banner-nol2tr.banner-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBannerSemoviewBannerSemoview extends Schema.CollectionType {
  collectionName: 'banner_semoviews';
  info: {
    singularName: 'banner-semoview';
    pluralName: 'banner-semoviews';
    displayName: 'Banner Semoview';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    link: Attribute.String;
    description: Attribute.String;
    author: Attribute.String;
    title: Attribute.String;
    color: Attribute.String;
    order: Attribute.Integer & Attribute.Unique;
    isLight: Attribute.Boolean & Attribute.DefaultTo<true>;
    type: Attribute.Enumeration<
      [
        'drama',
        'film',
        'anime',
        'ott',
        'game',
        'game_fan',
        'barrier_free',
        'wavve',
        'recommends'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::banner-semoview.banner-semoview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::banner-semoview.banner-semoview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactNol2TrContactNol2Tr extends Schema.CollectionType {
  collectionName: 'contact_nol2trs';
  info: {
    singularName: 'contact-nol2tr';
    pluralName: 'contact-nol2trs';
    displayName: 'Contact nol2tr';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subject: Attribute.String;
    guestName: Attribute.String;
    guestEmail: Attribute.Email;
    content: Attribute.Text;
    site: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-nol2tr.contact-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact-nol2tr.contact-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevelogDevelog extends Schema.CollectionType {
  collectionName: 'develogs';
  info: {
    singularName: 'develog';
    pluralName: 'develogs';
    displayName: 'develog';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subject: Attribute.String & Attribute.Required;
    summary: Attribute.String & Attribute.Required;
    opengraph: Attribute.String & Attribute.Required;
    series: Attribute.Enumeration<
      [
        'comparativeFrameworks',
        'devilStyledSheets',
        'retrospect',
        'streetCodeFighters',
        'unPrettymacOS',
        'useless'
      ]
    >;
    content: Attribute.RichText & Attribute.Required;
    created: Attribute.DateTime & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::develog.develog',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::develog.develog',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEbenumNol2TrEbenumNol2Tr extends Schema.CollectionType {
  collectionName: 'ebenum_nol2trs';
  info: {
    singularName: 'ebenum-nol2tr';
    pluralName: 'ebenum-nol2trs';
    displayName: 'Ebenum nol2tr';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subject: Attribute.String;
    addr: Attribute.String;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ebenum-nol2tr.ebenum-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ebenum-nol2tr.ebenum-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEditorialMemorialEditorialMemorial
  extends Schema.CollectionType {
  collectionName: 'editorial_memorials';
  info: {
    singularName: 'editorial-memorial';
    pluralName: 'editorial-memorials';
    displayName: 'Editorial Memorial';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    org: Attribute.Enumeration<
      ['hani', 'khan', 'ohmynews', 'vegannews', 'vop']
    >;
    thumbnail: Attribute.String;
    created: Attribute.Date;
    articleNumber: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::editorial-memorial.editorial-memorial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::editorial-memorial.editorial-memorial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInterviewNol2TrInterviewNol2Tr
  extends Schema.CollectionType {
  collectionName: 'interview_nol2trs';
  info: {
    singularName: 'interview-nol2tr';
    pluralName: 'interview-nol2trs';
    displayName: 'Interview nol2tr';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subject: Attribute.String & Attribute.Required;
    vid: Attribute.String;
    oid: Attribute.String;
    aid: Attribute.String;
    thumbnail: Attribute.String;
    summary: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    interviewer: Attribute.String & Attribute.Required;
    interviewee: Attribute.String & Attribute.Required;
    naver: Attribute.Boolean;
    music: Attribute.String & Attribute.Required;
    created: Attribute.Date & Attribute.Required;
    platform: Attribute.Enumeration<
      ['youtube', 'naverNews', 'naverEntertainment']
    > &
      Attribute.Required;
    opengraph: Attribute.String;
    vi: Attribute.Enumeration<
      [
        'maxresdefault',
        'sddefault',
        'hqdefault',
        'mqdefault',
        'default',
        'missing'
      ]
    >;
    content: Attribute.Blocks & Attribute.Required;
    fin: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::interview-nol2tr.interview-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::interview-nol2tr.interview-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiJejeupJejeupJejeupJejeup extends Schema.CollectionType {
  collectionName: 'jejeup_jejeups';
  info: {
    singularName: 'jejeup-jejeup';
    pluralName: 'jejeup-jejeups';
    displayName: 'Jejeup Jejeup';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subject: Attribute.String & Attribute.Required;
    video: Attribute.String & Attribute.Required & Attribute.Unique;
    ownerAvatar: Attribute.String;
    title: Attribute.String & Attribute.Required;
    worst: Attribute.Boolean & Attribute.DefaultTo<false>;
    relations: Attribute.String;
    amusements: Attribute.String & Attribute.Required;
    isAmusements: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    embeddingOff: Attribute.Boolean & Attribute.DefaultTo<false>;
    review: Attribute.Blocks;
    isPublish: Attribute.Boolean & Attribute.DefaultTo<false>;
    isZip: Attribute.Boolean & Attribute.DefaultTo<false>;
    isLive: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::jejeup-jejeup.jejeup-jejeup',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::jejeup-jejeup.jejeup-jejeup',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLiteratureSemoviewLiteratureSemoview
  extends Schema.CollectionType {
  collectionName: 'literature_semoviews';
  info: {
    singularName: 'literature-semoview';
    pluralName: 'literature-semoviews';
    displayName: 'Literature-semoview';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subject: Attribute.String;
    description: Attribute.String;
    type: Attribute.Enumeration<['relations', 'franchise']>;
    isGame: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::literature-semoview.literature-semoview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::literature-semoview.literature-semoview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMoeviewVideoMoeviewVideo extends Schema.CollectionType {
  collectionName: 'moeview_videos';
  info: {
    singularName: 'moeview-video';
    pluralName: 'moeview-videos';
    displayName: 'Moeview Video';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    isPublish: Attribute.Boolean & Attribute.DefaultTo<false>;
    subject: Attribute.String;
    title: Attribute.String;
    amusements: Attribute.String;
    video: Attribute.String;
    relations: Attribute.String;
    isAmusements: Attribute.Boolean & Attribute.DefaultTo<false>;
    embeddingOff: Attribute.Boolean & Attribute.DefaultTo<false>;
    review: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::moeview-video.moeview-video',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::moeview-video.moeview-video',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMusicsNol2TrMusicsNol2Tr extends Schema.CollectionType {
  collectionName: 'musics_nol2trs';
  info: {
    singularName: 'musics-nol2tr';
    pluralName: 'musics-nol2trs';
    displayName: 'Musics nol2tr';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    music: Attribute.String & Attribute.Required;
    videoid: Attribute.String & Attribute.Required;
    artist: Attribute.String;
    album: Attribute.String & Attribute.Required;
    composer: Attribute.String & Attribute.Required;
    lyricist: Attribute.String;
    lyrics: Attribute.Text;
    start: Attribute.Integer;
    vvi: Attribute.Enumeration<
      [
        'maxresdefault',
        'sddefault',
        'hqdefault',
        'hq720',
        'mqdefault',
        'default',
        'missing'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'maxresdefault'>;
    instrument: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    cover: Attribute.String;
    syncedLyrics: Attribute.JSON;
    lrcCompleted: Attribute.Boolean;
    isMV: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    isCC: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::musics-nol2tr.musics-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::musics-nol2tr.musics-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNaverMemorialNaverMemorial extends Schema.CollectionType {
  collectionName: 'naver_memorials';
  info: {
    singularName: 'naver-memorial';
    pluralName: 'naver-memorials';
    displayName: 'NAVER Memorial';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    thumbnail: Attribute.String;
    oid: Attribute.String;
    aid: Attribute.String;
    entertainment: Attribute.Boolean & Attribute.DefaultTo<false>;
    created: Attribute.Date;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::naver-memorial.naver-memorial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::naver-memorial.naver-memorial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNewsicNol2TrNewsicNol2Tr extends Schema.CollectionType {
  collectionName: 'newsic_nol2trs';
  info: {
    singularName: 'newsic-nol2tr';
    pluralName: 'newsic-nol2trs';
    displayName: 'Newsic nol2tr';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subject: Attribute.String & Attribute.Required;
    vid: Attribute.String;
    oid: Attribute.String;
    aid: Attribute.String;
    thumbnail: Attribute.String;
    summary: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    music: Attribute.String & Attribute.Required;
    created: Attribute.Date & Attribute.Required;
    platform: Attribute.Enumeration<
      ['youtube', 'naverNews', 'naverEntertainment']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'youtube'>;
    opengraph: Attribute.String;
    vi: Attribute.Enumeration<
      [
        'maxresdefault',
        'sddefault',
        'hqdefault',
        'mqdefault',
        'default',
        'missing'
      ]
    >;
    fin: Attribute.Text;
    content: Attribute.Blocks & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::newsic-nol2tr.newsic-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::newsic-nol2tr.newsic-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNoticeNol2TrNoticeNol2Tr extends Schema.CollectionType {
  collectionName: 'notice_nol2trs';
  info: {
    singularName: 'notice-nol2tr';
    pluralName: 'notice-nol2trs';
    displayName: 'Notice nol2tr';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subject: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    created: Attribute.Date & Attribute.Required;
    platform: Attribute.Enumeration<
      ['shorts', 'memorial', 'nol2tr', 'jejeup']
    > &
      Attribute.Required;
    content: Attribute.Blocks & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::notice-nol2tr.notice-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::notice-nol2tr.notice-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPlaylistNol2TrPlaylistNol2Tr extends Schema.CollectionType {
  collectionName: 'playlist_nol2trs';
  info: {
    singularName: 'playlist-nol2tr';
    pluralName: 'playlist-nol2trs';
    displayName: 'Playlist nol2tr';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subject: Attribute.String;
    opengraph: Attribute.String;
    summary: Attribute.String;
    article: Attribute.String;
    music: Attribute.String;
    created: Attribute.Date;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::playlist-nol2tr.playlist-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::playlist-nol2tr.playlist-nol2tr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUnpublishJejeupUnpublishJejeup
  extends Schema.CollectionType {
  collectionName: 'unpublish_jejeups';
  info: {
    singularName: 'unpublish-jejeup';
    pluralName: 'unpublish-jejeups';
    displayName: 'unpublish jejeup';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    videoId: Attribute.String;
    amusementId: Attribute.String;
    site: Attribute.String;
    comment: Attribute.String;
    reviewId: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::unpublish-jejeup.unpublish-jejeup',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::unpublish-jejeup.unpublish-jejeup',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiYoutubeMemorialYoutubeMemorial
  extends Schema.CollectionType {
  collectionName: 'youtube_memorials';
  info: {
    singularName: 'youtube-memorial';
    pluralName: 'youtube-memorials';
    displayName: 'Youtube Memorial';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    comment: Attribute.Text & Attribute.Required;
    videoId: Attribute.String & Attribute.Required & Attribute.Unique;
    created: Attribute.Date & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::youtube-memorial.youtube-memorial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::youtube-memorial.youtube-memorial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::ai-semoview.ai-semoview': ApiAiSemoviewAiSemoview;
      'api::amusement-jejeup.amusement-jejeup': ApiAmusementJejeupAmusementJejeup;
      'api::banner-moeview.banner-moeview': ApiBannerMoeviewBannerMoeview;
      'api::banner-nol2tr.banner-nol2tr': ApiBannerNol2TrBannerNol2Tr;
      'api::banner-semoview.banner-semoview': ApiBannerSemoviewBannerSemoview;
      'api::contact-nol2tr.contact-nol2tr': ApiContactNol2TrContactNol2Tr;
      'api::develog.develog': ApiDevelogDevelog;
      'api::ebenum-nol2tr.ebenum-nol2tr': ApiEbenumNol2TrEbenumNol2Tr;
      'api::editorial-memorial.editorial-memorial': ApiEditorialMemorialEditorialMemorial;
      'api::interview-nol2tr.interview-nol2tr': ApiInterviewNol2TrInterviewNol2Tr;
      'api::jejeup-jejeup.jejeup-jejeup': ApiJejeupJejeupJejeupJejeup;
      'api::literature-semoview.literature-semoview': ApiLiteratureSemoviewLiteratureSemoview;
      'api::moeview-video.moeview-video': ApiMoeviewVideoMoeviewVideo;
      'api::musics-nol2tr.musics-nol2tr': ApiMusicsNol2TrMusicsNol2Tr;
      'api::naver-memorial.naver-memorial': ApiNaverMemorialNaverMemorial;
      'api::newsic-nol2tr.newsic-nol2tr': ApiNewsicNol2TrNewsicNol2Tr;
      'api::notice-nol2tr.notice-nol2tr': ApiNoticeNol2TrNoticeNol2Tr;
      'api::playlist-nol2tr.playlist-nol2tr': ApiPlaylistNol2TrPlaylistNol2Tr;
      'api::unpublish-jejeup.unpublish-jejeup': ApiUnpublishJejeupUnpublishJejeup;
      'api::youtube-memorial.youtube-memorial': ApiYoutubeMemorialYoutubeMemorial;
    }
  }
}
