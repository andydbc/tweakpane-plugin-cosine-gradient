import { 
    createPlugin, 
    createValue, 
    LabeledValueBladeController, 
    ValueMap, 
    type BaseBladeParams, 
    type BladePlugin, 
    type LabelPropsObject 
} from "@tweakpane/core";
import { CosineGradient } from "./model";
import { CosineGradientController } from "./controller";
import { CosineGradientBladeApi } from "./api/CosineGradient.blade-api";

export interface CosineGradientBladeParams extends BaseBladeParams {
    view: 'cosineGradient';
    label?: string;
    defaultValue?: CosineGradient;
}

export const CosineGradientBladePlugin: BladePlugin<CosineGradientBladeParams> = createPlugin({
    id: 'cosineGradient',
    type: 'blade',
    accept(params) {
      if (params.view !== 'cosineGradient') return null;
      return {
        initialValue: params.value,
        params: params,
      };
    },
    controller(args) {
      const rawValue = args.params.defaultValue ? args.params.defaultValue : CosineGradient.Default();
      const value = createValue(rawValue);
      const valueR = createValue(rawValue.R);
      const valueG = createValue(rawValue.G);
      const valueB = createValue(rawValue.B);
  
      const valueController = new CosineGradientController(document, {
        value,
        valueR,
        valueG,
        valueB,
        viewProps: args.viewProps
      });
  
      return new LabeledValueBladeController(args.document, {
        blade: args.blade,
        props: ValueMap.fromObject({ label: args.params.label } as LabelPropsObject),
        value,
        valueController,
      });
    },
    api: (args) => {
      if (!(args.controller instanceof LabeledValueBladeController)) {
        return null;
      }
      if (!(args.controller.valueController instanceof CosineGradientController)) {
        return null;
      }
  
      return new CosineGradientBladeApi(args.controller);
    },
  });