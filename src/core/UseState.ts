import { Component } from "./Component";

type StateGetter<T> = () => T;

type StateSetter<T> = (newValue: T) => void;

type StateHook<T> = [StateGetter<T>, StateSetter<T>] & {
  value: T;
  get: StateGetter<T>;
  set: StateSetter<T>;
};

export function useState<T>(
  initialValue: T,
  component: Component
): StateHook<T> {
  const owner = component;

  let outerValue = initialValue;

  const getter: StateGetter<T> = () => {
    return outerValue;
  };

  const setter: StateSetter<T> = (newValue: T) => {
    // console.log("STATE SET:", newValue);

    outerValue = newValue;

    console.log("RERENDER OWNER:", owner.constructor.name);

    owner.rerender();
  };

  const hook = [getter, setter] as StateHook<T>;

  hook.get = getter;
  hook.set = setter;

  Object.defineProperty(hook, "value", {
    get: getter,
    enumerable: true,
    configurable: true,
  });

  return hook;
}