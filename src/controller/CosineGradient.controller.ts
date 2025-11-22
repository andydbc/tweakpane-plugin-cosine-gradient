
import {
    PointNdTextController,
    type Controller,
    type Value,
    type ViewProps,
    PointNdConstraint,
    parseNumber
} from '@tweakpane/core';
import { CosineGradient } from '../model';
import { CosineGradientView } from '../view';
import { Point4dAssembly, type Point4d } from '@tweakpane/core/dist/input-binding/point-4d/model/point-4d';
import { createDimensionConstraint } from './createDimensionConstraint';
import { createAxis } from './createAxis';

export type GradientControllerOptions = {
    value: Value<CosineGradient>;
    valueR: Value<Point4d>;
    valueG: Value<Point4d>;
    valueB: Value<Point4d>;
    viewProps: ViewProps;
}

export class CosineGradientController implements Controller<CosineGradientView> {

    public readonly value: Value<CosineGradient>;
    public readonly valueR: Value<Point4d>;
    public readonly valueG: Value<Point4d>;
    public readonly valueB: Value<Point4d>;
    public readonly viewProps: ViewProps;
    public readonly view: CosineGradientView;

    private textR: PointNdTextController<Point4d>;
    private textG: PointNdTextController<Point4d>; 
    private textB: PointNdTextController<Point4d>; 

    constraint( ) {
        return new PointNdConstraint( {
            assembly: Point4dAssembly,
            components: [
                createDimensionConstraint( undefined ),
                createDimensionConstraint( undefined ),
                createDimensionConstraint( undefined ),
                createDimensionConstraint( undefined ),
            ]
        });
    }

    constructor(document: Document, options: GradientControllerOptions) {
        this.value = options.value;
        this.valueR = options.valueR;
        this.valueG = options.valueG;
        this.valueB = options.valueB;
        this.viewProps = options.viewProps;
        this.view = new CosineGradientView(document);

        const constraint = this.constraint();

        this.textR = new PointNdTextController( document, {
            assembly: Point4dAssembly,
            axes: [
                createAxis( constraint.components[ 0 ] ),
                createAxis( constraint.components[ 1 ] ),
                createAxis( constraint.components[ 2 ] ),
                createAxis( constraint.components[ 3 ] ),
            ],
            parser: parseNumber,
            value: this.valueR,
            viewProps: this.viewProps
        });

        this.textG = new PointNdTextController( document, {
            assembly: Point4dAssembly,
            axes: [
                createAxis( constraint.components[ 0 ] ),
                createAxis( constraint.components[ 1 ] ),
                createAxis( constraint.components[ 2 ] ),
                createAxis( constraint.components[ 3 ] ),
            ],
            parser: parseNumber,
            value: this.valueG,
            viewProps: this.viewProps
        });

        this.textB = new PointNdTextController( document, {
            assembly: Point4dAssembly,
            axes: [
                createAxis( constraint.components[ 0 ] ),
                createAxis( constraint.components[ 1 ] ),
                createAxis( constraint.components[ 2 ] ),
                createAxis( constraint.components[ 3 ] ),
            ],
            parser: parseNumber,
            value: this.valueB,
            viewProps: this.viewProps
        });

        this.view.element.appendChild(
            this.textR.view.element
        );

        this.view.element.appendChild(
            this.textG.view.element
        );

        this.view.element.appendChild(
            this.textB.view.element
        );

        this.value.emitter.on('change', () => {
            this.valueR.rawValue = this.value.rawValue.R;
            this.valueG.rawValue = this.value.rawValue.G;
            this.valueB.rawValue = this.value.rawValue.B;
        });

        this.valueR.emitter.on('change', () => {
            this.value.rawValue.R = this.valueR.rawValue;
            this.view.updateGradient(this.value.rawValue);
            this.value.emitter.emit('change', {
                options: { forceEmit: false, last: true },
                previousRawValue: this.value.rawValue,
                rawValue: this.value.rawValue,
                sender: this.value,
            });
        });

        this.valueG.emitter.on('change', () => {
            this.value.rawValue.G = this.valueG.rawValue;
            this.view.updateGradient(this.value.rawValue);
            this.value.emitter.emit('change', {
                options: { forceEmit: false, last: true },
                previousRawValue: this.value.rawValue,
                rawValue: this.value.rawValue,
                sender: this.value,
            });
        });

        this.valueB.emitter.on('change', () => {
            this.value.rawValue.B = this.valueB.rawValue;
            this.view.updateGradient(this.value.rawValue);
            this.value.emitter.emit('change', {
                options: { forceEmit: false, last: true },
                previousRawValue: this.value.rawValue,
                rawValue: this.value.rawValue,
                sender: this.value,
            });
        });

        this.view.updateGradient(this.value.rawValue);
    }
}