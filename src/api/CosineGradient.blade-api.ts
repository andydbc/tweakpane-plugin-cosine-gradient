import {
    BladeApi,
    LabeledValueBladeController,
    TpChangeEvent,
  } from '@tweakpane/core';
  import { CosineGradient } from '../model';
  import { CosineGradientController } from '../controller';
  
  export type CosineGradientBladeApiEvents = {
    change: {
      event: TpChangeEvent<CosineGradient>;
    };
  }
  
  export class CosineGradientBladeApi extends BladeApi<LabeledValueBladeController<CosineGradient, CosineGradientController>> {
    constructor(controller: LabeledValueBladeController<CosineGradient, CosineGradientController>) {
      super(controller);
      this.setupEvents();
    }
  
    protected _handlers: {
      [K in keyof CosineGradientBladeApiEvents]: Array<(ev: CosineGradientBladeApiEvents['change']['event']) => void>
    } = {
      change: [],
    };
  
    public get value(): CosineGradient {
      return this.controller.valueController.value.rawValue;
    }
  
    public set value(value: CosineGradient) {
      this.controller.valueController.value.setRawValue(value.clone(), { forceEmit: true, last: false });
    }
  
    public on<EventName extends keyof CosineGradientBladeApiEvents>(
      eventName: EventName,
      handler: (ev: CosineGradientBladeApiEvents[EventName]['event']) => void,
    ): this {
      if (this._handlers[eventName].indexOf(handler) !== -1) return this;
  
      this._handlers[eventName].push(handler);
  
      return this;
    }
  
    public off<EventName extends keyof CosineGradientBladeApiEvents>(
      eventName: EventName,
      handler: (ev: CosineGradientBladeApiEvents[EventName]['event']) => void,
    ): this {
      const index = this._handlers[eventName].indexOf(handler);
  
      if (index === -1) return this;
  
      this._handlers[eventName].splice(index, 1);
  
      return this;
    }
  
    protected setupEvents(): void {
      this.controller.valueController.value.emitter.on('change', (ev) => {
        const event = new TpChangeEvent(this, ev.rawValue.clone(), ev.options.last);
        this._handlers.change.forEach((handler) => handler(event));
      });
    }
  }  