export function isBottomOfElement(element?: HTMLElement | null) {
  if (element) {
    return (
      element.scrollTop + element.offsetHeight + 300 >= element.scrollHeight
    );
  }
  return false;
}

export function loadFromStorage() {
  try {
    const serializedState = localStorage.state;
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export function saveState(state: {}) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.state = serializedState;
  } catch (err) {}
}
