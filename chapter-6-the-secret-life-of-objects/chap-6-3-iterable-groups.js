/*
    Iterable groups

    Make the Group class from the previous exercise iterable.
    Refer to the section about the iterator interface earlier
    in the chapter if you aren’t clear on the exact form of the interface anymore.

    If you used an array to represent the group’s members,
    don’t just return the iterator created by calling the Symbol.iterator method 
    on the array. That would work, but it defeats the purpose of this exercise.

    It is okay if your iterator behaves strangely when the group is modified 
    during iteration.
*/

const Group = require("./chap-6-2-groups")


class GroupIterator {
    constructor(group) {
        this.group = group;
        this.cursor = 0;
    }
    next() {
        if (this.cursor == this.group.length) {
            return { done: true }
        }

        return { value: this.group.get(this.cursor++), done: false };
    }
}

Group.prototype[Symbol.iterator] = function () {
    return new GroupIterator(this);
}

if (require.main === module) {
    for (let value of Group.from(["a", "b", "c"])) {
        console.log(value);
    }
    // → a
    // → b
    // → c
}