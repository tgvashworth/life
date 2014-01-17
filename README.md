# life

Unix-y life logger. Writes to a leveldb at `$XDG_DATA_HOME/life`. Inspired by [sh-todo](https://github.com/asb/sh-todo).

I want to use this to keep metrics on myself, which is why some of the db stuff might seem OTT. And yeah, this is probably broken for you.

If you want to install it:

- clone
- `cd life`
- `npm link`

### Usage

Write some words.

```
$ life Went to the gym. Good session.
16/01/14 @ 10:14pm : Went to the gym. Good session. #1
```

There is some special syntax too.

- tag: `+tagname`
- data: `@key value`

```
life Just been to the gym. +gym @bench 60,70,80 @bench_reps 20,15,10 @run 3.2k
16/01/14 @ 10:14pm : Just been to the gym. +gym #2
                     @bench 60,70,80, @bench_reps 20,15,10, @run 3.2k
```

To get your log back out (for the 24 hours – will make that configurable soon) just use `life`:

```
$ life
16/01/14 @ 10:14pm : Went to the gym. Good session. #1
16/01/14 @ 10:14pm : Just been to the gym. +gym #2
                     @bench 60,70,80, @bench_reps 20,15,10, @run 3.2k
```

### License

MIT
