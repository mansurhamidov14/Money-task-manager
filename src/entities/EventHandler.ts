export abstract class EventHandler<E extends string | number, H extends Function> {
  protected eventHandlers: Partial<Record<E, H[]>> = {};

  on(event: E, handler: H) {
    const existingHandlers = this.eventHandlers[event]
    if (existingHandlers) {
      existingHandlers.push(handler);
      return;
    }

    this.eventHandlers[event] = [handler];
  }

  off(event: E, handler: H) {
    this.eventHandlers[event] = this.eventHandlers[event]?.filter(prevHandler => prevHandler !== handler);
  }

  protected dispatchEvent(event: E, ...args: any[]) {
    this.eventHandlers[event]?.forEach(handler => handler(...args));
  }
}
