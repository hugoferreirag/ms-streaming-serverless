"use strict";

module.exports = class {
  constructor(_id = null, name, description, locked) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.locked = locked;
  }
};
