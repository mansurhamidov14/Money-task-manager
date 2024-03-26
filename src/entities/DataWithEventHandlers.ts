export abstract class DataWithEventHandlers<E extends string, H extends Function> {
  protected eventHandlers: Record<E, H[]>;

  constructor(events: E[]) {
    this.eventHandlers = events.reduce((result, event) => {
      result[event] = [];
      return result;
    }, {} as Record<E, H[]>)
  }

  on(event: E, handler: H) {
    this.eventHandlers[event].push(handler);
  }

  off(event: E, handler: H) {
    this.eventHandlers[event] = this.eventHandlers[event].filter(prevHandler => prevHandler !== handler);
  }

  protected dispatchEvent(event: E, ...args: any[]) {
    this.eventHandlers[event].forEach(handler => handler(...args));
  }
}
