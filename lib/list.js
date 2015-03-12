module.exports = List

function List () {
  this._generateId = List.createSequentialIdGenerator()
  this._canBeArray = false
}

List.prototype.add = function addItem (element, id) {
  if (element instanceof Array && !this._canBeArray) {
    var ids = []
    for (var i = 0; i < element.length; i++) {
      ids.push(this.add(element[i]))
    }
    return ids
  }

  if (id && !this.isPossibleId(id)) {
    throw new Error('ID already in use: ' + id)
  }
  if (element.hasOwnProperty('id') && element.id !== null && !this.isPossibleId(element.id)) {
    throw new Error('ID already in use: ' + element.id)
  }

  id = id || element.id || this._generateId(element)

  this[id] = element
  element.id = id
  element._list = this
}

/**
 * Call a function to each element.
 * @param  {Function} f
 */
List.prototype.forEach = function forEach (f) {
  var self = this
  this.ids.forEach(function (id) {
    f(self[id], id)
  })
}

List.prototype.slice = function slice () {
  var self = this
  return Array.prototype.slice.apply(this.ids, arguments).map(function (id) {
    return self[id]
  })
}

List.prototype.map = function map (f) {
  var self = this
  return this.ids.map(function (id) {
    return f(self[id], id)
  })
}

/**
 * Return an array of all elements. Note that there is no predictable order.
 * @return {Array} Array of elements
 */
List.prototype.toArray = function toArray () {
  var elementsArray = []
  this.forEach(function (element) {
    elementsArray.push(element)
  })
  return elementsArray
}

/**
 * Function to check if a ID is allowed and not already in use.
 * @param  {Any}  id
 * @return {Boolean}
 */
List.prototype.isPossibleId = function isPossibleId (id) {
  if (id[0] === '_')
    return false // must not start with '_'

  return !this.hasOwnProperty(id)
}

/**
 * Removes all items of this list.
 * @return {Array} list of deleted IDs
 */
List.prototype.clear = function clear () {
  var self = this
  var ids = []
  this.ids.forEach(function (id) {
    if (delete self[id])
      ids.push(id)
  })
  return ids
}

/**
 * Search for an element which satisfies the given
 *   function.
 * @param  {Function} predicate
 * @return {String} ID of the found element.
 */
List.prototype.find = function findElement (predicate) {
  var ids = this.ids
  for (var i = 0; i < ids.length; i++) {
    if (predicate(this[ids[i]]))
      return ids[i]
  }
  return false
}

/**
 * Search for all elements which satisfies the given
 *   function.
 * @param  {Function} predicate
 * @return {Array} of elements of Type this._type
 */
List.prototype.findAll = function findAllElements (predicate) {
  return this.toArray().filter(predicate)
}

Object.defineProperty(List.prototype, 'ids', {
  get: function () {
    return Object.keys(this).filter(function (key) {
      return key[0] !== '_'
    })
  }
})

Object.defineProperty(List.prototype, 'length', {
  get: function () {
    return this.ids.length
  }
})

Object.defineProperty(List.prototype, 'idGenerator', {
  set: function (idGenerator) {
    if (typeof idGenerator !== 'function')
      throw new Error('ID-Generator must be a function.')

    this._generateId = idGenerator
  }
})

/**
 * Create a generator function which returns IDs with the given length.
 * @param  {Integer} length
 * @return {Function}        generator function
 */
List.createRandomIdGenerator = function createRandomIdGenerator (length) {
  return function () {
    return generateRandomId(length)
  }
}

/**
 * Generate an alphanumeric ID with the given length.
 * @param  {Integer} length
 * @return {String}        ID
 */
function generateRandomId (length) {
  var str = ''
  length = length || 6
  while (str.length < length) {
    str += (((1 + Math.random()) * 0x10000) | 0).toString(16)
  }
  return str.substring(str.length - length, str.length)
}
List.generateRandomId = generateRandomId

/**
 * Create a generator function which returns a sequential numeric ID.
 * @return {Function} generator function
 */
List.createSequentialIdGenerator = function createSequentialIdGenerator () {
  return function () {
    return List.generateSequentialId.call(this)
  }
}

/**
 * Generate a sequential ID depending on the current `this._lastId`.
 * @return {Integer} ID
 */
List.generateSequentialId = function generateSequentialId () {
  var prevId = this._lastId || 0
  var nextId = prevId + 1
  this._lastId = nextId
  return nextId
}
