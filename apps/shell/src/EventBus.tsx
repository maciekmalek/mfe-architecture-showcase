import React, { createContext, useContext, useCallback } from 'react';
import type { MFEEvent, EventType } from '@mfe/shared-types';

type EventListener<T = unknown> = (event: MFEEvent<T>) => void;

interface EventBus {
  emit: <T = unknown>(type: EventType, payload: T, source: string) => void;
  on: <T = unknown>(type: EventType, listener: EventListener<T>) => () => void;
}

const EventBusContext = createContext<EventBus | undefined>(undefined);

export const EventBusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listeners, setListeners] = React.useState<
    Map<EventType, Set<EventListener>>
  >(new Map());

  const emit = useCallback<EventBus['emit']>((type, payload, source) => {
    const event: MFEEvent = {
      type,
      payload,
      timestamp: Date.now(),
      source,
    };

    const typeListeners = listeners.get(type);
    if (typeListeners) {
      typeListeners.forEach((listener) => listener(event));
    }
  }, [listeners]);

  const on = useCallback<EventBus['on']>((type, listener) => {
    setListeners((prev) => {
      const newListeners = new Map(prev);
      if (!newListeners.has(type)) {
        newListeners.set(type, new Set());
      }
      newListeners.get(type)!.add(listener);
      return newListeners;
    });

    return () => {
      setListeners((prev) => {
        const newListeners = new Map(prev);
        newListeners.get(type)?.delete(listener);
        return newListeners;
      });
    };
  }, []);

  return (
    <EventBusContext.Provider value={{ emit, on }}>
      {children}
    </EventBusContext.Provider>
  );
};

export const useEventBus = (): EventBus => {
  const context = useContext(EventBusContext);
  if (!context) {
    throw new Error('useEventBus must be used within EventBusProvider');
  }
  return context;
};
