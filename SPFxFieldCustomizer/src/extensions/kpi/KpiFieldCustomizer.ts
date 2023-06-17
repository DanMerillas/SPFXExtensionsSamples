import { Log } from '@microsoft/sp-core-library';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'KpiFieldCustomizerStrings';
//import styles from './KpiFieldCustomizer.module.scss';

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IKpiFieldCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'KpiFieldCustomizer';

export default class KpiFieldCustomizer
  extends BaseFieldCustomizer<IKpiFieldCustomizerProperties> {

  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated KpiFieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "KpiFieldCustomizer" and "${strings.Title}"`);
    return Promise.resolve();
  }

  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    // Use this method to perform your custom cell rendering.
    //const text: string = `${this.properties.sampleText}: ${event.fieldValue}`;

    //console.log(event)

    const value:number = parseInt(event.fieldValue.replace('.',''))

    let color: string = 'red'

    if (value >= 100 && value < 1000)
      color = 'yellow'

    if (value >= 1000)
      color = 'green'

    event.domElement.innerHTML = `<div style="width: 20px; height: 20px; border-radius: 50%; background-color: ${color};"></div>`;

    //event.domElement.classList.add(styles.kpi);
  }

  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    super.onDisposeCell(event);
  }
}
