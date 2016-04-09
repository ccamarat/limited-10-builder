import {debounce} from "./debounce";

const debouncedWatcher = debounce(() => {
  window.parent.postMessage({
    message: 'resize',
    height: document.body.scrollHeight + 'px'
  }, '*');
}, 500);

// Notify parent if this panel resizes
export default function watchWindowSize(store) {
  if (window.parent !== window) {
    // Go ahead and fire off a signal now
    debouncedWatcher();

    // Add listeners for other potential resize causes
    store.ready = debouncedWatcher;
    window.addEventListener('resize', debouncedWatcher);
  }
};
