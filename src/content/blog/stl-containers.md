---
title: "Container Types and Selection Criteria in C++"
description: "My Notes about Container Types and Selection Criteria in C++ Programming Language"
publishedAt: 2026-08-25
tags: ["engineering", "software", "c++"]
---

# Understanding C++ STL Containers

 A container is simply an object whose main responsibility is to store and organize a collection of other objects.

What makes containers especially important is that they are not designed in isolation. In the STL, containers, iterators, and algorithms are intended to work together.

A useful way to think about this relationship is:

**Containers store and organize data, iterators provide a way to move through that data, and algorithms operate on the data through iterators.**

Consider a vector:

```
std::vector<int> numbers = {10, 20, 30, 40};
```

The vector owns these elements. If we want to traverse them, we use iterators:

```
for (auto it = numbers.begin(); it != numbers.end(); ++it) {
    std::cout << *it << '\n';
}
```

`begin()` refers to the first element, while `end()` refers to the position one past the last element.

This gives us a range:

`[begin(), end())`

Algorithms are usually written to work on such iterator ranges instead of being tied to a specific container.

For example:

```
std::find(numbers.begin(), numbers.end(), 30);
```

`std::find` does not really care that the elements come from a vector. It works with the iterators it receives.

This matters because containers can have very different internal structures. A vector stores its elements contiguously, a list is made of linked nodes, and an ordered associative container such as `std::map` is typically implemented using a balanced tree. Iterators provide a common way to traverse these different structures.

That is one of the central ideas of the STL: algorithms do not need to be rewritten for every container type.

## Common features of STL containers

Although STL containers have different implementations and different performance characteristics, they still follow a common style of interface.

They are all templates, so the type of object they store is normally given as a template parameter:

```
std::vector<int> numbers;
std::list<std::string> names;
std::set<double> values;
```

Containers also expose common type information such as `value_type`, `size_type`, `iterator`, and `const_iterator`.

For example:

```
std::vector<int>::value_type
```

is simply `int`.

Another important characteristic is ownership. Containers generally own the elements stored inside them and manage their lifetimes.

For example:

```
std::vector<std::string> names;

std::string name = "Alice";
names.push_back(name);
```

Here the vector stores its own `std::string` element. If the original `name` variable is later changed, the element already stored inside the vector does not change.

Modern C++ also allows elements to be moved into containers:

```
names.push_back(std::move(name));
```

Containers behave like ordinary C++ objects. They can be constructed, copied, moved, assigned, swapped, compared, and destroyed.

They also commonly provide functions such as:

```
container.begin();
container.end();

container.size();
container.empty();

container.clear();
```

Many containers also provide operations such as `insert()` and `erase()`.

Not every container supports exactly the same functions. The common interface is more of a shared design convention than a strict identical API.

For example, `std::vector` supports random access:

```
numbers[3];
```

while `std::list` does not.

Similarly, `std::forward_list` does not provide `size()`, and `std::array` has a fixed size that cannot change at runtime.

This is why it is more accurate to say that STL containers have a **common core interface and common conventions**, while individual containers also provide operations that make sense for their own data structure.

Because containers provide `begin()` and `end()`, they can also usually be used with range-based `for` loops:

```
for (const auto& value : container) {
    std::cout << value << '\n';
}
```

This same syntax can work with a vector, list, set, map, and many other containers.

## Sequence and associative containers

![STL container categories](/images/blog/StlContainers.png)


The most useful high-level distinction between containers is how they organize their elements.

A **sequence container** organizes elements according to their position in a sequence.

An **associative container** organizes elements around keys and provides efficient lookup based on those keys.

### Sequence containers

The main sequence containers are:

- `std::array`
- `std::vector`
- `std::deque`
- `std::list`
- `std::forward_list`

They all represent an ordered sequence of elements, but they use different internal data structures.

#### `std::array`

`std::array` is a fixed-size contiguous array.

```
std::array<int, 4> numbers = {10, 20, 30, 40};
```

Its size is known at compile time and cannot change while the program is running.

It is useful when the number of elements is fixed but you still want the standard container interface, including iterators.

#### `std::vector`

`std::vector` is a dynamically sized contiguous array.

```
std::vector<int> numbers = {10, 20, 30};
numbers.push_back(40);
```

Its elements are stored next to each other in memory. This gives it efficient iteration and fast random access.

```
numbers[2];
```

A vector may allocate a larger memory block when it needs more capacity and then move or copy its elements into the new block.

For most general-purpose dynamic sequences, `std::vector` is the first container worth considering.

#### `std::deque`

`std::deque` is also a dynamic sequence, but it is designed to support efficient insertion and removal at both the front and the back.

```
std::deque<int> numbers;

numbers.push_front(10);
numbers.push_back(20);
```

Unlike a vector, a deque is usually implemented using multiple memory blocks rather than one single contiguous block.

It is a good choice when both ends of the sequence are used frequently.

#### `std::list`

`std::list` is a doubly linked list.

Each element is stored inside a node that contains links to the previous and next nodes.

Because of this, list elements are not stored contiguously in memory.

A list does not support random access:

```
list[5]; // invalid
```

Instead, it is traversed using iterators.

Its main advantage is that inserting or removing elements at an already known iterator position does not require shifting the surrounding elements.

Still, `std::list` should not automatically be chosen just because insertion and deletion sound faster. In practice, vectors often perform very well because contiguous memory gives better cache locality and faster traversal.

#### `std::forward_list`

`std::forward_list` is a singly linked list.

Its nodes only point forward, so traversal is forward-only.

It is a more lightweight and specialized container than `std::list`, and one noticeable difference is that it does not provide `size()`.

It is useful when a singly linked structure is specifically required.

![Sequential containers](/images/blog/StlSequentialContainers.png)

### Associative containers

Associative containers are different because their main purpose is not positional access. Their main purpose is **lookup by key**. They are also known as dictionaries or hash tables.

Suppose we want to store ages by name:

```
std::map<std::string, int> ages;

ages["Emre"] = 26;
ages["Bob"] = 31;
ages["John"] = 42;
```

Here, `"Bob"` is the key and `31` is the value associated with that key.

The main associative containers are:

- `std::set`
- `std::multiset`
- `std::map`
- `std::multimap`
- `std::unordered_set`
- `std::unordered_multiset`
- `std::unordered_map`
- `std::unordered_multimap`

A `set` stores keys by themselves.

```
std::set<std::string> usernames;
```

It is useful when the main question is:

**Does this value exist?**

For example:

```
if (usernames.contains("Emre")) {
    // Emre exists
}
```

A regular `std::set` stores unique keys, so duplicate values are not inserted as separate elements.

A `map` stores a relationship between a key and another value.

```
std::map<int, User> users;
```

This is useful when the main question is:

**Given this key, what object or value belongs to it?**

Typical examples are:

- user ID → user
- word → frequency
- filename → file information

The `multi` versions allow multiple elements with equivalent keys.

For example, `std::multimap` may be useful when several values are associated with the same key.

### Ordered and unordered associative containers

There are also two different implementation strategies among associative containers.

`std::set`, `std::map`, `std::multiset`, and `std::multimap` are **ordered associative containers**.

They are typically implemented using balanced binary search trees, often red-black trees.

This allows them to keep their keys sorted and provide operations such as search, insertion, and removal in roughly `O(log n)` time.

For example:

```
std::set<int> numbers;

numbers.insert(30);
numbers.insert(10);
numbers.insert(20);
```

Iterating through the set produces:

```
10
20
30
```

The insertion order does not determine the iteration order. The keys are kept ordered.

The `unordered_` containers use a different idea: a **hash table**.

`std::unordered_set`, `std::unordered_map`, `std::unordered_multiset`, and `std::unordered_multimap` are **unordered associative containers**.

A hash function is applied to a key to determine where it should be stored internally.

These containers do not keep their keys sorted, but they usually provide average constant-time lookup:

`O(1)` on average.

By comparison, ordered `map` and `set` generally provide `O(log n)` lookup.

So the choice often comes down to what you need from the data.

If you need the keys to remain ordered, `std::map` or `std::set` are natural choices.

If ordering does not matter and fast average key lookup is the main goal, `std::unordered_map` or `std::unordered_set` may be more appropriate.

## Choosing a container

The easiest way to choose a container is not to start from the container names. Start from the way you think about the data.

If you think of the data as a sequence where position matters, consider a sequence container.

If the number of elements is fixed, `std::array` is suitable.

If you need a general dynamic sequence, `std::vector` should usually be the first option.

If you frequently add or remove elements at both ends, consider `std::deque`.

If you specifically need linked-list behavior, consider `std::list` or `std::forward_list`.

If you think of your data in terms of keys, then an associative container is usually more natural.

Use a `set` when you need a collection of unique searchable values.

Use a `map` when you need a key associated with another value.

If sorted key order matters, use the ordered forms such as `std::set` and `std::map`.

If sorted order does not matter and average constant-time lookup is useful, consider `std::unordered_set` or `std::unordered_map`.

The important point is that there is no universally best STL container. Each one represents a different compromise between memory layout, access patterns, insertion and removal behavior, ordering, and lookup performance.

Once that is understood, the design of the STL becomes much more natural: containers decide how data is stored, iterators provide a common way to traverse it, and algorithms operate on iterator ranges without needing to know the exact container implementation.

![STL container flowchart](/images/blog/StlContainersFlowchart.png)
