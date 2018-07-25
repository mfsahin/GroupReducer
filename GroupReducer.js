Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
}

function GroupReducer(add_fn, group_fn, init_fn) {
    this.container = new Map();
    this.add_fn = add_fn;
    this.init_fn = init_fn;
    this.group_fn = group_fn;
}

GroupReducer.method('add', function (v) {
    let k = this.group_fn(v);
    let p = this.container.has(k) ? this.container.get(k) : this.init_fn(v);
    this.container.set(k, this.add_fn(p, v));
});

GroupReducer.method('push', function(v) {
    this.add(v);
})

GroupReducer.method('values', function() {
    return this.container.values();
});

GroupReducer.method('valuesAsArray', function() {
    let vals = [];
    for (let v of this.container.values()) {
        vals.push(v);
    }
    return vals;
});

GroupReducer.method('groups', function() {
    let g = {}
    for (k of this.container.keys()) {
        g[k] = this.container.get(k);
    }
    return g;
})

module.exports = GroupReducer;
