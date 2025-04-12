export default function throttle(callback: () => void, delay: number) {
  let throttled = false;

  return () => {
    if (!throttled) {
      callback();
      throttled = true;
      setTimeout(() => {
        throttled = false;
      }, delay);
    }
  };
}
