# Why 'useEffect' Do Two Times

* It just in dev
The config is 'reactStrictMode' in file next.config.ts made the useEffect do 2 times.

* * doc link:
* * * https://react.dev/blog/2022/03/29/react-v18
* * * https://juejin.cn/post/7137654077743169573

```md
New Strict Mode Behaviors
In the future, we’d like to add a feature that allows React to add and remove sections of the UI while preserving state. For example, when a user tabs away from a screen and back, React should be able to immediately show the previous screen. To do this, React would unmount and remount trees using the same component state as before.

This feature will give React apps better performance out-of-the-box, but requires components to be resilient to effects being mounted and destroyed multiple times. Most effects will work without any changes, but some effects assume they are only mounted or destroyed once.

To help surface these issues, React 18 introduces a new development-only check to Strict Mode. This new check will automatically unmount and remount every component, whenever a component mounts for the first time, restoring the previous state on the second mount.

Before this change, React would mount the component and create the effects:

* React mounts the component.
  * Layout effects are created.
  * Effects are created.
With Strict Mode in React 18, React will simulate unmounting and remounting the component in development mode:

* React mounts the component.
  * Layout effects are created.
  * Effects are created.
* React simulates unmounting the component.
  * Layout effects are destroyed.
  * Effects are destroyed.
* React simulates mounting the component with the previous state.
  * Layout effects are created.
  * Effects are created.
See docs for ensuring reusable state here.
```

##  So how to do it while coding?
* We must test both cases when 'reactStrictMode' is true and false while coding.
